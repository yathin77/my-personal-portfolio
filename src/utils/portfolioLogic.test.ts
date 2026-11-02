import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  filterTimeline,
  buildBreadcrumbs,
  getPageSeoMeta,
  validateContactForm,
  synthesizeVibeBlueprintFallback,
  generateResumeText,
  type ProjectItem,
  type TimelineItem,
} from './portfolioLogic';

const sampleProjects: ProjectItem[] = [
  {
    id: 'vibe-portfolio-website',
    index: '01',
    title: 'Personal Vibe Coding Portfolio Website',
    subtitle: 'Created my own multi-page portfolio website',
    category: 'Portfolio & Architecture',
    year: '2026',
    featured: true,
    readTime: '4 min case study',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/yathin77',
    artworkType: 'portfolio-monograph',
    summary: 'Multi-page portfolio built with Google AI Studio and JSON data files.',
    challenge: 'Keep content decoupled.',
    solution: 'Used JSON data layer.',
    vibePromptUsed: 'Build a portfolio.',
    stack: ['Semantic HTML5', 'JavaScript', 'Google AI Studio Hosting'],
    highlights: ['JSON data files'],
  },
  {
    id: 'multi-model-prompt-workflow',
    index: '02',
    title: 'Vibe Prompt Synthesis Blueprint',
    subtitle: 'Claude, ChatGPT, and Gemini workflow',
    category: 'AI Workflow',
    year: '2026',
    featured: false,
    readTime: '3 min case study',
    liveUrl: 'https://github.com/yathin77',
    repoUrl: 'https://github.com/yathin77',
    artworkType: 'prompt-synthesis',
    summary: 'Prompt engineering pipeline across Claude, ChatGPT, and Gemini.',
    challenge: 'Clarity in hackathons.',
    solution: '3-stage prompt workflow.',
    vibePromptUsed: 'Act as architect.',
    stack: ['Claude', 'ChatGPT', 'Gemini 4 Argon'],
    highlights: ['Fast prototyping'],
  },
];

const sampleTimeline: TimelineItem[] = [
  {
    id: 'tn-origins',
    index: '01',
    period: 'Roots',
    location: 'Tamil Nadu, India',
    title: 'Born in Tamil Nadu',
    category: 'Origin',
    description: 'Curious about web development.',
    milestoneTag: 'Foundation',
  },
  {
    id: 'vibe-shift',
    index: '02',
    period: '2026',
    location: 'Google AI Studio',
    title: 'Vibe Coding Flow',
    category: 'Vibe Coding',
    description: 'Building at the speed of thought.',
    milestoneTag: 'Flow State',
  },
];

test('filterProjects filters accurately by category and search query', () => {
  const all = filterProjects(sampleProjects, 'all', '');
  assert.equal(all.length, 2);

  const byCategory = filterProjects(sampleProjects, 'AI Workflow', '');
  assert.equal(byCategory.length, 1);
  assert.equal(byCategory[0].id, 'multi-model-prompt-workflow');

  const byQuery = filterProjects(sampleProjects, 'all', 'claude');
  assert.equal(byQuery.length, 1);
  assert.equal(byQuery[0].id, 'multi-model-prompt-workflow');
});

test('filterTimeline returns all on "all" and filters by specific category', () => {
  assert.equal(filterTimeline(sampleTimeline, 'all').length, 2);
  const originOnly = filterTimeline(sampleTimeline, 'Origin');
  assert.equal(originOnly.length, 1);
  assert.equal(originOnly[0].location, 'Tamil Nadu, India');
});

test('buildBreadcrumbs constructs 3-level trail for project-detail and post-detail', () => {
  const projectTrail = buildBreadcrumbs(
    'project-detail',
    'Personal Vibe Coding Portfolio Website'
  );
  assert.equal(projectTrail.length, 3);
  assert.equal(projectTrail[0].label, 'Home');
  assert.equal(projectTrail[1].label, 'Projects');
  assert.equal(projectTrail[2].label, 'Personal Vibe Coding Portfolio Website');
  assert.equal(projectTrail[2].isCurrent, true);

  const blogTrail = buildBreadcrumbs('post-detail', 'What Vibe Coding Means');
  assert.equal(blogTrail.length, 3);
  assert.equal(blogTrail[1].label, 'Journal');
  assert.equal(blogTrail[2].label, 'What Vibe Coding Means');
});

test('getPageSeoMeta returns unique non-empty title and description for every page', () => {
  const pages = [
    'home',
    'about',
    'projects',
    'toolkit',
    'journal',
    'contact',
  ] as const;
  const titles = new Set<string>();

  for (const p of pages) {
    const meta = getPageSeoMeta(p);
    assert.ok(meta.title.length > 20);
    assert.ok(meta.description.length > 50);
    titles.add(meta.title);
  }
  assert.equal(titles.size, pages.length);
});

test('validateContactForm rejects invalid inputs and accepts valid submissions', () => {
  const invalidResult = validateContactForm({
    name: 'Y',
    email: 'not-an-email',
    vibeTopic: '',
    message: 'Too short',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.vibeTopic);
  assert.ok(invalidResult.errors.message);

  const validResult = validateContactForm({
    name: 'Yathin Ajay',
    email: 'yathin7477@gmail.com',
    vibeTopic: 'Hackathon Collaboration',
    message: 'Let us build an AI-powered prototype together this weekend!',
  });
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('synthesizeVibeBlueprintFallback and generateResumeText produce rich output', () => {
  const blueprint = synthesizeVibeBlueprintFallback(
    'Tamil Nadu Student Hackathon Portal',
    'Google AI Studio'
  );
  assert.ok(blueprint.projectTitle.includes('Tamil Nadu'));
  assert.ok(blueprint.masterBuildPrompt.includes('JSON data files'));

  const resume = generateResumeText({
    name: 'Yathin Ajay Kumar khotwani A',
    tagline: 'Inquisitive Vibe Coder',
    origin: 'Tamil Nadu, India',
    email: 'yathin7477@gmail.com',
    github: 'https://github.com/yathin77',
    linkedin: 'https://www.linkedin.com/in/yathin-ajay-634b87418/',
    instagram: 'https://www.instagram.com/yathin776611/',
    shortBio: 'I build at the speed of thought.',
    ambition: 'Become the best web developer.',
    coreSkills: ['Semantic HTML5', 'JavaScript'],
    projects: sampleProjects,
    timeline: sampleTimeline,
  });
  assert.ok(resume.includes('YATHIN AJAY KUMAR KHOTWANI A'));
  assert.ok(resume.includes('yathin7477@gmail.com'));
  assert.ok(resume.includes('Tamil Nadu, India'));
});

test('skills.json contains all 5 requested skills (Python, Vibe Coding, C, HTML, Prompt Engineering)', async () => {
  const skillsModule = await import('../data/skills.json', {
    with: { type: 'json' },
  });
  const skills = skillsModule.default;
  assert.equal(skills.length, 5);
  const names = skills.map((s: { name: string }) => s.name.toLowerCase());
  assert.ok(names.includes('python'));
  assert.ok(names.includes('vibe coding'));
  assert.ok(names.includes('c'));
  assert.ok(names.includes('html'));
  assert.ok(names.includes('prompt engineering'));
});

