/**
 * @file portfolioLogic.ts
 * @description Pure, decoupled helper functions for Yathin's Vibe Coding Portfolio.
 * Keeping business logic (filtering, breadcrumb generation, SEO metadata, form validation,
 * and resume generation) in a separate file makes the code easier to understand and unit-test!
 */

export type PageId =
  | 'home'
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'toolkit'
  | 'journal'
  | 'post-detail'
  | 'contact';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  featured: boolean;
  readTime: string;
  liveUrl: string;
  repoUrl: string;
  artworkType: string;
  summary: string;
  challenge: string;
  solution: string;
  vibePromptUsed: string;
  stack: string[];
  highlights: string[];
}

export interface TimelineItem {
  id: string;
  index: string;
  period: string;
  location: string;
  title: string;
  category: string;
  description: string;
  milestoneTag: string;
}

export interface ToolkitItem {
  id: string;
  index: string;
  name: string;
  role: string;
  category: string;
  howIUseIt: string;
  workflowStage: string;
  samplePrompt: string;
}

export interface BlogPostItem {
  id: string;
  index: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface SkillItem {
  id: string;
  index: string;
  name: string;
  category: string;
  focus: string;
  description: string;
  howIPractice: string;
  snippetLabel: string;
  codeSnippet: string;
}

export interface BreadcrumbSegment {
  label: string;
  page: PageId;
  isCurrent: boolean;
}

export interface ContactFormInput {
  name: string;
  email: string;
  vibeTopic: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export interface VibeBlueprintResult {
  projectTitle: string;
  researchAngle: string;
  recommendedTools: string[];
  dataFilesNeeded: string[];
  masterBuildPrompt: string;
  learningFocus: string;
  reasoningMode: string;
}

/**
 * 1. Filter projects by category and search query.
 * Returns all matching projects without mutating the original array.
 */
export function filterProjects(
  projects: ProjectItem[],
  category: string,
  searchQuery: string
): ProjectItem[] {
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      normalizedCategory === 'all' ||
      normalizedCategory === '' ||
      project.category.toLowerCase() === normalizedCategory;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchableText = [
      project.title,
      project.subtitle,
      project.summary,
      project.category,
      ...project.stack,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * 2. Filter timeline milestones by category.
 */
export function filterTimeline(
  entries: TimelineItem[],
  category: string
): TimelineItem[] {
  const normalized = category.trim().toLowerCase();
  if (!normalized || normalized === 'all') {
    return entries;
  }
  return entries.filter((item) => item.category.toLowerCase() === normalized);
}

/**
 * 3. Build semantic breadcrumb segments for project detail and blog detail pages.
 */
export function buildBreadcrumbs(
  currentPage: PageId,
  detailTitle?: string
): BreadcrumbSegment[] {
  if (currentPage === 'project-detail') {
    return [
      { label: 'Home', page: 'home', isCurrent: false },
      { label: 'Projects', page: 'projects', isCurrent: false },
      {
        label: detailTitle || 'Project Case Study',
        page: 'project-detail',
        isCurrent: true,
      },
    ];
  }

  if (currentPage === 'post-detail') {
    return [
      { label: 'Home', page: 'home', isCurrent: false },
      { label: 'Journal', page: 'journal', isCurrent: false },
      {
        label: detailTitle || 'Article',
        page: 'post-detail',
        isCurrent: true,
      },
    ];
  }

  const pageLabels: Record<PageId, string> = {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    'project-detail': 'Project Case Study',
    toolkit: 'Toolkit',
    journal: 'Journal',
    'post-detail': 'Article',
    contact: 'Contact',
  };

  return [
    { label: 'Home', page: 'home', isCurrent: currentPage === 'home' },
    ...(currentPage !== 'home'
      ? [{ label: pageLabels[currentPage], page: currentPage, isCurrent: true }]
      : []),
  ];
}

/**
 * 4. Generate unique per-page SEO title and meta description.
 * Every route gets its own descriptive <title> and <meta name="description"> for SEO.
 */
export function getPageSeoMeta(
  page: PageId,
  detailTitle?: string,
  detailSummary?: string
): { title: string; description: string } {
  switch (page) {
    case 'home':
      return {
        title: 'Yathin Ajay Kumar — Inquisitive Vibe Coder Portfolio',
        description:
          'I build at the speed of thought. Explore the vibe coding journey, projects, and AI toolkit of Yathin Ajay Kumar khotwani A from Tamil Nadu.',
      };
    case 'about':
      return {
        title: 'About Yathin Ajay Kumar — Origin in Tamil Nadu & Vibe Coding Philosophy',
        description:
          'Born in Tamil Nadu, Yathin Ajay Kumar khotwani A combines AI tools, flow state, and clean semantic code on his path to becoming the best web developer.',
      };
    case 'projects':
      return {
        title: 'Projects & Case Studies — Yathin Ajay Kumar Vibe Coding Portfolio',
        description:
          'Explore web development projects built through vibe coding, including Yathin’s custom JSON-driven portfolio website and rapid hackathon prototypes.',
      };
    case 'project-detail':
      return {
        title: `${detailTitle || 'Project Case Study'} — Yathin Ajay Kumar Portfolio`,
        description:
          detailSummary ||
          'Deep dive into the prompt architecture, semantic HTML/JS stack, and design decisions behind this vibe-coded web project.',
      };
    case 'toolkit':
      return {
        title: 'AI Toolkit & Prompt Studio — Claude, ChatGPT, Gemini & Google AI Studio',
        description:
          'How Yathin orchestrates Claude, ChatGPT, Gemini, and Google AI Studio for deep research, prompt synthesis, and full-stack cloud hosting.',
      };
    case 'journal':
      return {
        title: 'Vibe Coding Journal — Essays on AI Workflows & Web Engineering',
        description:
          'Read Yathin’s notes on building at the speed of thought, shipping hackathon ideas before momentum fades, and learning modern JavaScript.',
      };
    case 'post-detail':
      return {
        title: `${detailTitle || 'Journal Entry'} — Yathin Ajay Kumar`,
        description:
          detailSummary ||
          'Reflections on vibe coding, prompt engineering, and modern frontend craftsmanship by Yathin Ajay Kumar.',
      };
    case 'contact':
      return {
        title: 'Contact Yathin Ajay Kumar — Collaborate on Web & Hackathon Projects',
        description:
          'Reach out to Yathin Ajay Kumar khotwani A via email (yathin7477@gmail.com), GitHub, LinkedIn, Instagram, or the direct inquiry form.',
      };
  }
}

/**
 * 5. Validate Contact Form inputs with clear, helpful user messages.
 * Never bypasses empty or invalid fields!
 */
export function validateContactForm(
  input: ContactFormInput
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address so I can reply.';
  }

  if (!input.vibeTopic || input.vibeTopic.trim().length === 0) {
    errors.vibeTopic = 'Please choose or enter a topic for your message.';
  }

  if (!input.message || input.message.trim().length < 12) {
    errors.message =
      'Please share a few more details (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * 6. Synthesize a deterministic Vibe Coding Prompt Blueprint.
 * Used both for instant offline/free-tier fallback and unit testing.
 */
export function synthesizeVibeBlueprintFallback(
  rawIdea: string,
  focusArea: string
): VibeBlueprintResult {
  const cleanedIdea = rawIdea.trim() || 'Interactive Web Application';
  const cleanedFocus = focusArea.trim() || 'Full-Stack Google AI Studio App';

  return {
    projectTitle: `Vibe Blueprint: ${cleanedIdea.slice(0, 56)}`,
    researchAngle: `Use ChatGPT and Gemini to map the 3 core user actions for "${cleanedIdea}", ensuring zero friction from landing to primary interaction.`,
    recommendedTools: [
      'Gemini 4 Argon (High Thinking) — System & Edge-Case Reasoning',
      'Claude — Semantic HTML5 & Modular JS Component Structuring',
      'ChatGPT — UX Microcopy & Structured JSON Seed Content',
      'Google AI Studio — Full-Stack Build Execution & Cloud Run Hosting',
    ],
    dataFilesNeeded: [
      'src/data/content.json (Primary domain records & copy)',
      'src/data/config.json (Navigation, SEO metadata & categories)',
    ],
    masterBuildPrompt: `Build a responsive, dark-mode web application for "${cleanedIdea}" (${cleanedFocus}). Keep all dynamic content in JSON data files under src/data/. Use semantic HTML (<header>, <main>, <nav>, <article>), accessible keyboard controls, bold calligraphic headings paired with clean geometric body text, and sub-200ms cubic-bezier transitions. Comment key JavaScript functions clearly.`,
    learningFocus:
      'Inspect how the JSON data layer decouples content from UI rendering, and how native HTML form validation prevents invalid state transitions.',
    reasoningMode: 'Gemini 4 Argon · High-Thinking Architecture Pattern',
  };
}

/**
 * 7. Generate a clean, downloadable plain-text / Markdown Resume for Yathin.
 */
export function generateResumeText(params: {
  name: string;
  tagline: string;
  origin: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  shortBio: string;
  ambition: string;
  coreSkills: string[];
  projects: ProjectItem[];
  timeline: TimelineItem[];
}): string {
  const lines: string[] = [
    `# ${params.name.toUpperCase()}`,
    `${params.tagline} | Born in ${params.origin}`,
    `Email: ${params.email}`,
    `GitHub: ${params.github}`,
    `LinkedIn: ${params.linkedin}`,
    `Instagram: ${params.instagram}`,
    '',
    '========================================================================',
    '01. PROFILE & VIBE CODING PHILOSOPHY',
    '========================================================================',
    params.shortBio,
    '',
    `Goal: ${params.ambition}`,
    '',
    '========================================================================',
    '02. CORE TECHNICAL & AI TOOLKIT SKILLS',
    '========================================================================',
    ...params.coreSkills.map((skill) => `* ${skill}`),
    '* AI Stack: Claude, ChatGPT, Gemini (High Thinking), Google AI Studio (Framework & Hosting)',
    '',
    '========================================================================',
    '03. FEATURED PROJECTS',
    '========================================================================',
    ...params.projects.flatMap((p) => [
      `[${p.index}] ${p.title} (${p.year}) — ${p.category}`,
      `    Summary: ${p.summary}`,
      `    Stack: ${p.stack.join(' · ')}`,
      `    Repository: ${p.repoUrl}`,
      '',
    ]),
    '========================================================================',
    '04. DEVELOPMENT JOURNEY & MILESTONES',
    '========================================================================',
    ...params.timeline.flatMap((t) => [
      `[${t.index}] ${t.title} (${t.period} · ${t.location})`,
      `    ${t.description}`,
      '',
    ]),
  ];

  return lines.join('\n');
}
