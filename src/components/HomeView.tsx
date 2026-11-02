/**
 * @file HomeView.tsx
 * @description Home page featuring a split-screen hero with calligraphic display typography,
 * full-width KPI metrics row below the split, PostGeneric-inspired kinetic marquee divider,
 * featured Bento project showcase, and Vibe Coding philosophy overview.
 */

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { EditorialArtwork } from './EditorialArtwork';
import { SkillsSection } from './SkillsSection';
import type {
  PageId,
  ProjectItem,
  BlogPostItem,
} from '../utils/portfolioLogic';
import profileData from '../data/profile.json';

interface HomeViewProps {
  projects: ProjectItem[];
  posts: BlogPostItem[];
  onNavigate: (page: PageId) => void;
  onOpenProject: (projectId: string) => void;
  onOpenPost: (postId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  posts,
  onNavigate,
  onOpenProject,
  onOpenPost,
}) => {
  return (
    <div className="space-y-24">
      {/* 1. Split-Screen Hero + Full-Width Metrics Row Below */}
      <section aria-labelledby="hero-heading" className="pt-6 sm:pt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono-tabular text-[#A1A1AA]">
                {profileData.origin} · {profileData.tagline}
              </p>

              <h1
                id="hero-heading"
                style={{ textWrap: 'balance' }}
                className="mt-4 font-calligraphic text-5xl sm:text-6xl lg:text-[4rem] font-semibold italic leading-[1.06] tracking-tight text-[#F4F4F6]"
              >
                {profileData.name}
              </h1>

              <p className="mt-3 text-lg sm:text-xl font-medium text-[#F2B705]">
                Inquisitive Vibe Coder — Building at the Speed of Thought
              </p>

              <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-[#A1A1AA]">
                {profileData.shortBio}
              </p>
            </div>

            {/* Single Primary CTA + Quiet Secondary Link */}
            <div className="mt-10 flex flex-wrap items-center gap-5 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#F2B705] px-6 py-3.5 text-sm font-semibold text-[#050505] hover:bg-[#f7c625] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Selected Works</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#F4F4F6] hover:text-[#F2B705] transition-editorial underline underline-offset-8 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Read My Tamil Nadu Story & Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Matching-Height Kinetic Studio Visual */}
          <div className="lg:col-span-5 flex">
            <EditorialArtwork
              variant="hero-studio"
              className="w-full lg:h-full"
            />
          </div>
        </div>

        {/* Full-Width 4-Column KPI Row Below Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-y border-[#27272A] py-8 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border-b sm:border-b-0 sm:border-r last:border-none border-[#27272A] pb-4 sm:pb-0 sm:pr-6"
            >
              <span className="font-calligraphic text-4xl font-semibold italic text-[#F4F4F6] tabular-nums">
                {metric.value}
              </span>
              <span className="mt-1 text-sm font-semibold text-[#F2B705]">
                {metric.unit}
              </span>
              <span className="mt-1 text-xs text-[#A1A1AA]">
                {metric.context}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. PostGeneric-Inspired Animated Marquee Section Divider */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-y border-[#27272A] bg-[#09090C] py-3.5"
      >
        <div className="animate-marquee flex items-center gap-8 text-xs font-mono-tabular text-[#A1A1AA]">
          {Array.from({ length: 2 }).map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 shrink-0">
              <span>python · vibe coding · c · html · prompt engineering</span>
              <span className="text-[#F2B705]">·</span>
              <span>born in tamil nadu · building for the web</span>
              <span className="text-[#F2B705]">·</span>
              <span>claude · chatgpt · gemini · google ai studio</span>
              <span className="text-[#F2B705]">·</span>
              <span>turning raw ideas into deployed reality</span>
              <span className="text-[#F2B705]">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Skills Section (Placed right before Projects) */}
      <SkillsSection />

      {/* 4. Featured Projects Grid */}
      <section aria-labelledby="featured-projects-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
          <div>
            <p className="text-xs font-mono-tabular text-[#A1A1AA]">
              01. SELECTED WORKS & ARCHITECTURE
            </p>
            <h2
              id="featured-projects-heading"
              className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
            >
              Built at the Speed of Thought
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F2B705] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Balanced 3-Column Architectural Project Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {projects.map((project) => {
            return (
              <article
                key={project.id}
                className="group rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-7 flex flex-col justify-between h-full transition-editorial hover:border-[#52525B] lg:col-span-1"
              >
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA] font-mono-tabular">
                      <span className="text-[#F2B705]">{project.index}.</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.readTime}</span>
                    </div>

                    <h3 className="mt-3 font-calligraphic text-2xl sm:text-[1.75rem] leading-tight italic font-semibold text-[#F4F4F6] group-hover:text-[#F2B705] transition-editorial">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6">
                    <EditorialArtwork
                      variant={
                        project.artworkType as
                          | 'portfolio-monograph'
                          | 'prompt-synthesis'
                          | 'hackathon-grid'
                      }
                      title={project.subtitle}
                      subtitle="Case Study"
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-[#27272A] pt-4 flex items-center justify-between gap-4">
                  {/* Stack rendered as unboxed text with separators */}
                  <p className="text-xs text-[#71717A] truncate max-w-[200px]">
                    {project.stack.join(' · ')}
                  </p>

                  <button
                    type="button"
                    onClick={() => onOpenProject(project.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F4F6] group-hover:text-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Vibe Coding Philosophy (3 Editorial Pillars) */}
      <section aria-labelledby="vibe-philosophy-heading">
        <div className="border-b border-[#27272A] pb-6">
          <p className="text-xs font-mono-tabular text-[#A1A1AA]">
            02. THE VIBE CODING MANIFESTO
          </p>
          <h2
            id="vibe-philosophy-heading"
            className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
          >
            How Intuition, AI & Flow State Converge
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {profileData.vibePhilosophy.map((pillar) => (
            <div
              key={pillar.index}
              className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-7 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono-tabular text-xs text-[#F2B705]">
                  {pillar.index}. PRINCIPLE
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#F4F4F6]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 border-t border-[#27272A] pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('toolkit')}
                  className="text-xs font-medium text-[#A1A1AA] hover:text-[#F2B705] transition-editorial cursor-pointer"
                >
                  Inspect AI Toolkit →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Recent Journal Reflections */}
      <section aria-labelledby="home-journal-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
          <div>
            <p className="text-xs font-mono-tabular text-[#A1A1AA]">
              03. FIELD NOTES & ESSAYS
            </p>
            <h2
              id="home-journal-heading"
              className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
            >
              Dispatches from My Learning Journey
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('journal')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F2B705] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>All Journal Entries</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-8 divide-y divide-[#27272A] border-b border-[#27272A]">
          {posts.map((post) => (
            <article
              key={post.id}
              className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono-tabular">
                  <span className="text-[#F2B705]">{post.index}.</span>
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-calligraphic text-2xl italic font-semibold text-[#F4F4F6] group-hover:text-[#F2B705] transition-editorial">
                  {post.title}
                </h3>
                <p className="text-sm text-[#A1A1AA]">{post.excerpt}</p>
              </div>

              <button
                type="button"
                onClick={() => onOpenPost(post.id)}
                className="self-start md:self-center inline-flex items-center gap-2 rounded-lg border border-[#27272A] px-4 py-2 text-xs font-medium text-[#F4F4F6] group-hover:border-[#F2B705] group-hover:text-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Read Article</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
