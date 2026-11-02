/**
 * @file ProjectsView.tsx
 * @description Projects index and Project Detail view with Breadcrumbs, category filtering,
 * search input, prompt architecture inspection, and fullscreen artwork lightbox.
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Maximize2,
  X,
  Copy,
  Check,
} from 'lucide-react';
import { EditorialArtwork } from './EditorialArtwork';
import { Breadcrumbs } from './Breadcrumbs';
import {
  filterProjects,
  buildBreadcrumbs,
  type ProjectItem,
  type PageId,
} from '../utils/portfolioLogic';

interface ProjectsViewProps {
  projects: ProjectItem[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string | null) => void;
  onNavigate: (page: PageId) => void;
}

const CATEGORIES = [
  'All',
  'Portfolio & Architecture',
  'AI Workflow',
  'Rapid Prototyping',
];

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onNavigate,
}) => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(
    null
  );
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const activeProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) || null
    : null;

  // If a project is selected, render the Project Detail Case Study page with Breadcrumbs
  if (activeProject) {
    const breadcrumbs = buildBreadcrumbs('project-detail', activeProject.title);

    const handleCopyVibePrompt = async () => {
      try {
        await navigator.clipboard.writeText(activeProject.vibePromptUsed);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
      } catch {
        setCopiedPrompt(false);
      }
    };

    return (
      <article className="pt-6 space-y-12">
        <Breadcrumbs
          segments={breadcrumbs}
          onNavigate={(page) => {
            if (page === 'projects') {
              onSelectProject(null);
            } else {
              onNavigate(page);
            }
          }}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectProject(null)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1AA] hover:text-[#F2B705] transition-editorial cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Projects</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
            <span className="text-[#F2B705]">{activeProject.index}.</span>
            <span>{activeProject.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeProject.year}</span>
            <span aria-hidden="true">·</span>
            <span>{activeProject.readTime}</span>
          </div>
        </div>

        <div>
          <h1
            style={{ textWrap: 'balance' }}
            className="font-calligraphic text-4xl sm:text-5xl lg:text-6xl italic font-semibold text-[#F4F4F6]"
          >
            {activeProject.title}
          </h1>
          <p className="mt-3 text-lg text-[#A1A1AA]">
            {activeProject.subtitle}
          </p>
        </div>

        {/* High-Resolution Interactive Artwork Showcase + Lightbox Trigger */}
        <div className="relative">
          <EditorialArtwork
            variant={
              activeProject.artworkType as
                | 'portfolio-monograph'
                | 'prompt-synthesis'
                | 'hackathon-grid'
            }
            title={activeProject.title}
            subtitle={activeProject.stack.join(' · ')}
            className="min-h-[300px]"
          />
          <button
            type="button"
            onClick={() => setLightboxProject(activeProject)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#F2B705] transition-editorial cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Open Fullscreen Artwork Lightbox</span>
          </button>
        </div>

        {/* Case Study Grid: Challenge, Solution & Highlights */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 border-t border-[#27272A] pt-10">
          <div className="lg:col-span-8 space-y-8">
            <section>
              <h2 className="text-xs font-mono-tabular text-[#F2B705]">
                01. OVERVIEW
              </h2>
              <p className="mt-2 text-base leading-relaxed text-[#F4F4F6]">
                {activeProject.summary}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono-tabular text-[#F2B705]">
                02. THE CHALLENGE
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                {activeProject.challenge}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono-tabular text-[#F2B705]">
                03. VIBE CODING SOLUTION & ARCHITECTURE
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                {activeProject.solution}
              </p>
            </section>

            {/* The actual build prompt used */}
            <section className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono-tabular text-[#F2B705]">
                  04. VIBE CODING PROMPT BLUEPRINT
                </h2>
                <button
                  type="button"
                  onClick={handleCopyVibePrompt}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] px-3 py-1 text-xs text-[#F4F4F6] hover:border-[#F2B705] cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#F2B705]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 font-mono-tabular text-xs leading-relaxed text-[#E4E4E7]">
                “{activeProject.vibePromptUsed}”
              </p>
            </section>
          </div>

          {/* Right Sidebar: Technical Metadata & Links */}
          <aside className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-[#27272A] pt-6 lg:pt-0 lg:pl-8">
            <div>
              <h3 className="text-xs font-semibold text-[#F4F4F6]">
                Technical Stack
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">
                {activeProject.stack.join(' · ')}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[#F4F4F6]">
                Engineering Highlights
              </h3>
              <ul className="mt-2 space-y-2 text-xs text-[#A1A1AA]">
                {activeProject.highlights.map((item, i) => (
                  <li key={i}>
                    <span className="text-[#F2B705] font-mono-tabular mr-1.5">
                      0{i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 space-y-3">
              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2B705] px-5 py-3 text-xs font-semibold text-[#050505] hover:bg-[#f7c625] transition-editorial"
              >
                <span>Inspect GitHub (@yathin77)</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>

        {lightboxProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxProject.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          >
            <div className="w-full max-w-4xl rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
                <div>
                  <p className="font-calligraphic text-2xl italic text-[#F4F4F6]">
                    {lightboxProject.title}
                  </p>
                  <p className="text-xs text-[#A1A1AA]">
                    {lightboxProject.year} · Built & Hosted in Google AI Studio
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close artwork viewer"
                  onClick={() => setLightboxProject(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272A] text-[#F4F4F6] hover:border-[#F2B705] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6">
                <EditorialArtwork
                  variant={
                    lightboxProject.artworkType as
                      | 'portfolio-monograph'
                      | 'prompt-synthesis'
                      | 'hackathon-grid'
                  }
                  title={lightboxProject.subtitle}
                  subtitle={lightboxProject.category}
                  className="min-h-[360px]"
                />
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }

  // Projects Index View
  const filteredProjects = filterProjects(projects, category, searchQuery);

  return (
    <div className="space-y-14 pt-6">
      <section aria-labelledby="projects-page-heading">
        <p className="text-xs font-mono-tabular text-[#F2B705]">
          PROJECTS INDEX · DATA FILE: src/data/projects.json
        </p>
        <h1
          id="projects-page-heading"
          style={{ textWrap: 'balance' }}
          className="mt-3 font-calligraphic text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-[#F4F4F6]"
        >
          Created My Own Portfolio & Vibe-Coded Prototypes
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#A1A1AA]">
          Every project below is stored in{' '}
          <code className="text-xs text-[#F4F4F6] font-mono-tabular">
            src/data/projects.json
          </code>{' '}
          so adding new hackathons or web builds never requires editing page
          components. Click any project to inspect its full prompt architecture
          and case study.
        </p>

        {/* Filter Bar + Search Input */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-[#27272A] py-5">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-editorial cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#F2B705] text-[#050505]'
                      : 'bg-[#0B0B0E] text-[#A1A1AA] hover:text-[#F4F4F6] border border-[#27272A]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor="project-search-input" className="sr-only">
              Search projects by title or stack
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
            <input
              id="project-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or stack..."
              className="w-full rounded-xl border border-[#27272A] bg-[#0B0B0E] py-2 pl-10 pr-4 text-xs text-[#F4F4F6] placeholder-[#71717A] focus:border-[#F2B705] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Projects Bento Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-12 text-center">
          <p className="font-calligraphic text-2xl italic text-[#F4F4F6]">
            No projects match your current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-[#050505] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => {
            const isWide = idx === 0 && filteredProjects.length > 1;
            return (
              <article
                key={project.id}
                className={`group rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-8 flex flex-col justify-between transition-editorial hover:border-[#52525B] ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA] font-mono-tabular">
                    <span className="text-[#F2B705]">{project.index}.</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.readTime}</span>
                  </div>

                  <h2 className="mt-3 font-calligraphic text-2xl sm:text-3xl italic font-semibold text-[#F4F4F6] group-hover:text-[#F2B705] transition-editorial">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                    {project.summary}
                  </p>

                  <div className="mt-6">
                    <EditorialArtwork
                      variant={
                        project.artworkType as
                          | 'portfolio-monograph'
                          | 'prompt-synthesis'
                          | 'hackathon-grid'
                      }
                      title={project.subtitle}
                      subtitle="Inspect Case Study"
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-[#27272A] pt-4 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#71717A]">
                    {project.stack.join(' · ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#18181B] px-4 py-2 text-xs font-semibold text-[#F4F4F6] hover:bg-[#F2B705] hover:text-[#050505] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Open Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
