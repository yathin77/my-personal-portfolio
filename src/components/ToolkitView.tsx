/**
 * @file ToolkitView.tsx
 * @description Toolkit page explaining how Yathin uses Claude, ChatGPT, Gemini,
 * and Google AI Studio (both framework and cloud hosting) to research clearly,
 * write build prompts, and generate project content—plus the live VibeThinkingLab.
 */

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { VibeThinkingLab } from './VibeThinkingLab';
import type { ToolkitItem } from '../utils/portfolioLogic';

interface ToolkitViewProps {
  toolkit: ToolkitItem[];
}

const TOOL_CATEGORIES = [
  'All',
  'Build & Hosting',
  'AI Reasoning',
  'Research & Content',
  'Web Fundamentals',
];

export const ToolkitView: React.FC<ToolkitViewProps> = ({ toolkit }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleTools =
    selectedCategory === 'All'
      ? toolkit
      : toolkit.filter((t) => t.category === selectedCategory);

  const handleCopySamplePrompt = async (id: string, promptText: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-16 pt-6">
      {/* 1. Header & Workflow Overview */}
      <section aria-labelledby="toolkit-heading">
        <p className="text-xs font-mono-tabular text-[#F2B705]">
          AI TOOLKIT & HOSTING · CLAUDE · CHATGPT · GEMINI · GOOGLE AI STUDIO
        </p>
        <h1
          id="toolkit-heading"
          style={{ textWrap: 'balance' }}
          className="mt-3 font-calligraphic text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-[#F4F4F6]"
        >
          How I Research, Prompt & Ship in Google AI Studio
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#A1A1AA]">
          I use Claude, ChatGPT, Gemini, and Google AI Studio as a coordinated
          creative stack. Before writing code, I use AI tools to conduct clear
          research, structure JSON content, and craft precise build prompts—then
          use Google AI Studio as my framework and cloud hosting platform.
        </p>

        {/* Category Filter Buttons */}
        <div
          role="group"
          aria-label="Filter toolkit by role"
          className="mt-8 flex flex-wrap items-center gap-2 border-y border-[#27272A] py-4"
        >
          {TOOL_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
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
      </section>

      {/* 2. Toolkit Cards Grid */}
      <section aria-label="AI Tools and Frameworks">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {visibleTools.map((tool) => (
            <article
              key={tool.id}
              className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
                  <span>
                    <strong className="text-[#F2B705]">{tool.index}.</strong>{' '}
                    {tool.workflowStage}
                  </span>
                  <span>{tool.category}</span>
                </div>

                <h2 className="mt-3 font-calligraphic text-3xl italic font-semibold text-[#F4F4F6]">
                  {tool.name}
                </h2>
                <p className="mt-1 text-xs font-medium text-[#F2B705]">
                  {tool.role}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                  {tool.howIUseIt}
                </p>
              </div>

              <div className="mt-6 border-t border-[#27272A] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tabular text-[#71717A]">
                    EXAMPLE WORKFLOW PROMPT
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopySamplePrompt(tool.id, tool.samplePrompt)
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-[#F4F4F6] hover:text-[#F2B705] transition-editorial cursor-pointer"
                  >
                    {copiedId === tool.id ? (
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
                <p className="mt-2 rounded-xl bg-[#050505] p-3.5 text-xs text-[#E4E4E7] font-mono-tabular leading-relaxed">
                  “{tool.samplePrompt}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Interactive Vibe Thinking Lab (Gemini 4 Argon High Thinking) */}
      <VibeThinkingLab />
    </div>
  );
};
