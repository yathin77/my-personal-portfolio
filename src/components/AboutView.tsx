/**
 * @file AboutView.tsx
 * @description About page detailing Yathin's roots in Tamil Nadu, what Vibe Coding
 * means to him, his ambition to become the best web developer, an interactive
 * filterable Journey Timeline (loaded from timeline.json), and a downloadable resume.
 */

import React, { useState } from 'react';
import { Download, Eye, X, Check, Copy } from 'lucide-react';
import { EditorialArtwork } from './EditorialArtwork';
import {
  filterTimeline,
  generateResumeText,
  type TimelineItem,
  type ProjectItem,
} from '../utils/portfolioLogic';
import profileData from '../data/profile.json';

interface AboutViewProps {
  timeline: TimelineItem[];
  projects: ProjectItem[];
}

const TIMELINE_CATEGORIES = [
  'All',
  'Origin',
  'Learning',
  'Vibe Coding',
  'Deployment',
  'Milestone',
];

export const AboutView: React.FC<AboutViewProps> = ({ timeline, projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCreedIdx, setActiveCreedIdx] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const CREED_LENSES = [
    {
      id: 'mastery',
      label: '01 · Web Mastery',
      quote:
        'I want to become the best web developer—combining deep architectural understanding with the velocity of AI-native workflows.',
      insight:
        'Every time Claude, ChatGPT, or Gemini generates a module, I inspect the semantic HTML5, trace the JavaScript state transitions, and write clear comments so every project sharpens my core engineering mastery.',
      signature: 'RULE #1 · ZERO BLACK-BOX CODE',
    },
    {
      id: 'hackathon',
      label: '02 · Hackathon Velocity',
      quote:
        'Creative momentum is perishable. My goal in every hackathon is to turn a raw 2 AM idea into a deployed reality before the spark fades.',
      insight:
        'By researching and structuring JSON schemas first, then building and hosting directly in Google AI Studio, I bypass repetitive setup and spend 90% of my time on user experience and motion.',
      signature: 'RULE #2 · SHIP WHILE IN FLOW STATE',
    },
    {
      id: 'roots',
      label: '03 · Tamil Nadu to Global Web',
      quote:
        'Born in Tamil Nadu with relentless curiosity—proving that an inquisitive builder with the right AI toolkit can craft studio-grade web experiences.',
      insight:
        'Inspired by avant-garde design studios like PostGeneric, I pair bold calligraphic typography with clean, accessible code that performs smoothly on every screen.',
      signature: 'RULE #3 · CRAFT WITH HUMAN SOUL',
    },
  ];

  const activeCreed = CREED_LENSES[activeCreedIdx];

  const visibleTimeline = filterTimeline(timeline, selectedCategory);

  const fullResumeText = generateResumeText({
    name: profileData.name,
    tagline: profileData.tagline,
    origin: profileData.origin,
    email: profileData.contact.email,
    github: profileData.contact.github,
    linkedin: profileData.contact.linkedin,
    instagram: profileData.contact.instagram,
    shortBio: profileData.shortBio,
    ambition: profileData.ambition,
    coreSkills: profileData.resume.coreSkills,
    projects,
    timeline,
  });

  // Trigger browser download of Yathin's Resume
  const handleDownloadResume = () => {
    const blob = new Blob([fullResumeText], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Yathin_Ajay_Kumar_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadStatus(
      'Resume downloaded (Yathin_Ajay_Kumar_Resume.txt).'
    );
  };

  const handleCopyResume = async () => {
    try {
      await navigator.clipboard.writeText(fullResumeText);
      setResumeCopied(true);
      setTimeout(() => setResumeCopied(false), 2000);
    } catch {
      setResumeCopied(false);
    }
  };

  return (
    <div className="space-y-20 pt-6">
      {/* 1. Editorial Narrative Split: Born in Tamil Nadu & Ambition */}
      <section aria-labelledby="about-heading">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono-tabular text-[#F2B705]">
                ABOUT ME · BORN IN TAMIL NADU, INDIA
              </p>
              <h1
                id="about-heading"
                style={{ textWrap: 'balance' }}
                className="mt-3 font-calligraphic text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-[#F4F4F6]"
              >
                Born in Tamil Nadu. Engineering the Web at the Speed of Thought.
              </h1>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#A1A1AA]">
                {profileData.aboutStory.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-7 space-y-5">
                <p className="text-sm sm:text-base font-semibold tracking-wide text-[#F2B705]">
                  The Vibe Architect’s Creed — Explore My 3 Core Obsessions
                </p>

                {/* Interactive 3-Lens Switcher */}
                <div
                  role="group"
                  aria-label="Explore Yathin's three core obsessions"
                  className="flex flex-wrap items-center gap-2 border-b border-[#27272A] pb-4"
                >
                  {CREED_LENSES.map((lens, idx) => {
                    const isSelected = activeCreedIdx === idx;
                    return (
                      <button
                        key={lens.id}
                        type="button"
                        onClick={() => setActiveCreedIdx(idx)}
                        className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-editorial cursor-pointer whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-[#F2B705] text-[#050505] font-semibold'
                            : 'bg-[#121216] text-[#A1A1AA] hover:text-[#F4F4F6] border border-[#27272A]'
                        }`}
                      >
                        {lens.label}
                      </button>
                    );
                  })}
                </div>

                <p className="font-calligraphic text-2xl sm:text-[1.7rem] leading-snug italic text-[#F4F4F6]">
                  “{activeCreed.quote}”
                </p>

                <p className="text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">
                  {activeCreed.insight}
                </p>

                <div className="flex items-center justify-between border-t border-[#27272A]/80 pt-3 text-xs font-mono-tabular text-[#71717A]">
                  <span className="text-[#F2B705]">{activeCreed.signature}</span>
                  <span>LENS 0{activeCreedIdx + 1} / 03</span>
                </div>
              </div>
            </div>

            {/* Downloadable Resume Controls */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#27272A] pt-6">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F2B705] px-5 py-3 text-xs font-semibold text-[#050505] hover:bg-[#f7c625] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#0B0B0E] px-5 py-3 text-xs font-semibold text-[#F4F4F6] hover:border-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
              >
                <Eye className="h-4 w-4" />
                <span>Inspect Interactive Resume</span>
              </button>

              {downloadStatus && (
                <span
                  role="status"
                  className="text-xs text-[#F2B705] font-mono-tabular"
                >
                  {downloadStatus}
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <EditorialArtwork
              variant="tamilnadu-portrait"
              className="w-full lg:h-full"
            />
          </div>
        </div>
      </section>

      {/* 2. What Vibe Coding Means To Me */}
      <section
        aria-labelledby="vibe-meaning-heading"
        className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-8 sm:p-10"
      >
        <p className="text-xs font-mono-tabular text-[#A1A1AA]">
          01. PHILOSOPHY & FLOW STATE
        </p>
        <h2
          id="vibe-meaning-heading"
          className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
        >
          What Vibe Coding Means to Me
        </h2>
        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
          To me, vibe coding is the harmony between human creative intuition and
          AI velocity. Instead of getting stuck in boilerplate configuration, I
          use Claude, ChatGPT, and Gemini to clarify my research and craft
          structured prompts—and then build and host directly in Google AI
          Studio. Because I am actively learning and committed to becoming the
          best web developer, I study the semantic HTML and commented JavaScript
          behind every feature I ship.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-[#27272A] pt-8">
          {profileData.resume.coreSkills.map((skill, idx) => (
            <div key={idx} className="text-sm text-[#F4F4F6]">
              <span className="font-mono-tabular text-xs text-[#F2B705] mr-2">
                0{idx + 1}.
              </span>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Filterable Development Journey Timeline (from timeline.json) */}
      <section aria-labelledby="journey-timeline-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#27272A] pb-6">
          <div>
            <p className="text-xs font-mono-tabular text-[#A1A1AA]">
              02. CHRONOLOGY · DATA FILE: src/data/timeline.json
            </p>
            <h2
              id="journey-timeline-heading"
              className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
            >
              My Web Development Journey
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter timeline milestones by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#0B0B0E] p-1.5 border border-[#27272A]"
          >
            {TIMELINE_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-editorial cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#F2B705] text-[#050505]'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F6]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 divide-y divide-[#27272A] border-b border-[#27272A]">
          {visibleTimeline.map((item) => (
            <article
              key={item.id}
              className="py-8 grid grid-cols-1 gap-4 md:grid-cols-12 items-start"
            >
              <div className="md:col-span-3 text-xs font-mono-tabular text-[#A1A1AA]">
                <span className="text-[#F2B705] font-semibold">
                  {item.index}.
                </span>{' '}
                <span>{item.period}</span>
                <p className="mt-1 text-[#71717A]">{item.location}</p>
              </div>

              <div className="md:col-span-7">
                <h3 className="font-calligraphic text-2xl italic font-semibold text-[#F4F4F6]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                  {item.description}
                </p>
              </div>

              <div className="md:col-span-2 md:text-right text-xs font-mono-tabular text-[#A1A1AA]">
                <span>
                  {item.category} · {item.milestoneTag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Resume Lightbox Modal */}
      {showResumeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
              <div>
                <h2
                  id="resume-modal-title"
                  className="font-calligraphic text-2xl italic text-[#F4F4F6]"
                >
                  Curriculum Vitae — {profileData.name}
                </h2>
                <p className="text-xs text-[#A1A1AA]">
                  Tamil Nadu, India · {profileData.contact.email}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close resume viewer"
                onClick={() => setShowResumeModal(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272A] text-[#F4F4F6] hover:border-[#F2B705] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <pre className="mt-6 overflow-x-auto rounded-xl bg-[#050505] p-5 text-xs leading-relaxed text-[#E4E4E7] font-mono-tabular whitespace-pre-wrap">
              {fullResumeText}
            </pre>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[#27272A] pt-4">
              <button
                type="button"
                onClick={handleCopyResume}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] px-4 py-2 text-xs font-medium text-[#F4F4F6] hover:border-[#F2B705] cursor-pointer"
              >
                {resumeCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#F2B705]" />
                    <span>Copied Resume Text</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-[#050505] hover:bg-[#f7c625] cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .TXT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
