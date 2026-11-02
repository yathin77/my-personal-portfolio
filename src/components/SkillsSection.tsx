/**
 * @file SkillsSection.tsx
 * @description Core Skills section displaying Yathin's 5 key technical skills:
 * Python, Vibe Coding, C, HTML, and Prompt Engineering (loaded from src/data/skills.json).
 * Includes an interactive Live Code & Prompt Inspector so visitors can explore how each skill is applied.
 */

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import skillsData from '../data/skills.json';
import type { SkillItem } from '../utils/portfolioLogic';

export const SkillsSection: React.FC = () => {
  const skills = skillsData as SkillItem[];
  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    skills[0]?.id || 'vibe-coding'
  );
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const activeSkill =
    skills.find((s) => s.id === selectedSkillId) || skills[0];

  const handleCopySnippet = async () => {
    if (!activeSkill) return;
    try {
      await navigator.clipboard.writeText(activeSkill.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      setCopiedSnippet(false);
    }
  };

  return (
    <section aria-labelledby="core-skills-heading" className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <p className="text-xs font-mono-tabular text-[#F2B705]">
            CORE CAPABILITIES · PYTHON · VIBE CODING · C · HTML · PROMPT ENGINEERING
          </p>
          <h2
            id="core-skills-heading"
            className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
          >
            Technical Foundations & AI-Native Skills
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#A1A1AA]">
            Combining foundational computer science and semantic web code with
            high-velocity AI prompt engineering. Select any skill below to
            inspect how I practice it in code.
          </p>
        </div>

        <span className="text-xs font-mono-tabular text-[#A1A1AA] whitespace-nowrap shrink-0">
          DATA FILE · src/data/skills.json
        </span>
      </div>

      {/* 5-Skill Architectural Cards Row */}
      <div
        role="group"
        aria-label="Core technical skills"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {skills.map((skill) => {
          const isSelected = skill.id === activeSkill.id;
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelectedSkillId(skill.id)}
              aria-pressed={isSelected}
              className={`text-left rounded-2xl border p-6 flex flex-col justify-between transition-editorial cursor-pointer ${
                isSelected
                  ? 'border-[#F2B705] bg-[#101014]'
                  : 'border-[#27272A] bg-[#0B0B0E] hover:border-[#52525B]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-[#F2B705] font-semibold">
                    {skill.index}.
                  </span>
                  <span className="text-[#A1A1AA] truncate ml-2">
                    {skill.category}
                  </span>
                </div>

                <h3 className="mt-3 font-calligraphic text-2xl italic font-semibold text-[#F4F4F6]">
                  {skill.name}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-[#A1A1AA]">
                  {skill.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#27272A]/80 pt-3 flex items-center justify-between text-xs font-mono-tabular">
                <span
                  className={
                    isSelected ? 'text-[#F2B705]' : 'text-[#71717A]'
                  }
                >
                  {isSelected ? 'ACTIVE LENS' : 'INSPECT SKILL →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Live Skill & Code/Prompt Inspector */}
      {activeSkill && (
        <div
          aria-live="polite"
          className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-8 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center"
        >
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
              <span className="text-[#F2B705]">{activeSkill.index}.</span>
              <span>{activeSkill.category}</span>
            </div>

            <h3 className="font-calligraphic text-3xl italic font-semibold text-[#F4F4F6]">
              {activeSkill.name}
            </h3>

            <p className="text-xs font-mono-tabular text-[#F2B705]">
              {activeSkill.focus}
            </p>

            <p className="pt-2 text-sm leading-relaxed text-[#A1A1AA]">
              {activeSkill.howIPractice}
            </p>
          </div>

          <div className="lg:col-span-7 rounded-xl border border-[#27272A] bg-[#050505] p-5">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <span className="text-xs font-mono-tabular text-[#F2B705]">
                {activeSkill.snippetLabel} · {activeSkill.name.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] px-3 py-1 text-xs text-[#F4F4F6] hover:border-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#F2B705]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Example</span>
                  </>
                )}
              </button>
            </div>

            <pre className="mt-4 overflow-x-auto text-xs leading-relaxed text-[#E4E4E7] font-mono-tabular">
              <code>{activeSkill.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
