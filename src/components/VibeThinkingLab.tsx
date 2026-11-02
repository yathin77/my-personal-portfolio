/**
 * @file VibeThinkingLab.tsx
 * @description Interactive "Vibe Prompt Architect" integrated into the Toolkit page.
 * Demonstrates how Yathin uses AI tools (powered by Gemini 4 Argon with ThinkingLevel.HIGH
 * on the backend) to research and synthesize a structured build prompt before coding.
 */

import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import {
  synthesizeVibeBlueprintFallback,
  type VibeBlueprintResult,
} from '../utils/portfolioLogic';

const PRESET_IDEAS = [
  {
    label: 'Hackathon Team Matcher',
    idea: 'A 24-hour hackathon team formation app for students in Tamil Nadu with skill matching and pitch boards',
    focus: 'Google AI Studio Full-Stack Prototype',
  },
  {
    label: 'Markdown Study Companion',
    idea: 'An interactive HTML & JavaScript learning notebook that turns code snippets into visual DOM diagrams',
    focus: 'Semantic HTML5 & Modular JavaScript',
  },
  {
    label: 'Editorial Creator Showcase',
    idea: 'A dark-mode showreel and case study archive with PostGeneric-inspired kinetic typography and JSON data',
    focus: 'Editorial Design & Motion',
  },
];

export const VibeThinkingLab: React.FC = () => {
  const [rawIdea, setRawIdea] = useState(PRESET_IDEAS[0].idea);
  const [focusArea, setFocusArea] = useState(PRESET_IDEAS[0].focus);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [blueprint, setBlueprint] = useState<VibeBlueprintResult>(() =>
    synthesizeVibeBlueprintFallback(PRESET_IDEAS[0].idea, PRESET_IDEAS[0].focus)
  );

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawIdea || rawIdea.trim().length < 4) {
      setErrorMsg('Please describe your project idea (at least 4 characters).');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch('/api/vibe-think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawIdea, focusArea }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not synthesize prompt blueprint.');
      } else if (data.blueprint) {
        setBlueprint(data.blueprint);
      }
    } catch {
      // Fallback to deterministic synthesis if offline
      setBlueprint(synthesizeVibeBlueprintFallback(rawIdea, focusArea));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(blueprint.masterBuildPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      setCopiedPrompt(false);
    }
  };

  return (
    <section
      aria-labelledby="vibe-architect-heading"
      className="mt-16 rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-10"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#27272A] pb-8">
        <div>
          <p className="text-xs font-mono-tabular text-[#F2B705]">
            INTERACTIVE WORKFLOW LAB · GEMINI 4 ARGON (HIGH THINKING)
          </p>
          <h2
            id="vibe-architect-heading"
            className="mt-2 font-calligraphic text-3xl sm:text-4xl italic text-[#F4F4F6]"
          >
            02. Vibe Prompt & Research Architect
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#A1A1AA]">
            Test how I use AI tools to turn a raw idea into a structured research
            plan, JSON data schema, and a ready-to-build Google AI Studio prompt.
          </p>
        </div>

        {/* Preset quick-load buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_IDEAS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setRawIdea(preset.idea);
                setFocusArea(preset.focus);
                setErrorMsg(null);
                setBlueprint(
                  synthesizeVibeBlueprintFallback(preset.idea, preset.focus)
                );
              }}
              className="rounded-lg border border-[#27272A] bg-[#121216] px-3 py-1.5 text-xs text-[#F4F4F6] hover:border-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
            >
              Load: {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form + Output Blueprint Split */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <form onSubmit={handleSynthesize} className="lg:col-span-5 space-y-5">
          <div>
            <label
              htmlFor="vibe-idea-input"
              className="block text-xs font-medium text-[#F4F4F6]"
            >
              Raw Project or Hackathon Idea
            </label>
            <textarea
              id="vibe-idea-input"
              rows={4}
              value={rawIdea}
              onChange={(e) => setRawIdea(e.target.value)}
              placeholder="Describe the web app you want to vibe code..."
              className="mt-2 w-full rounded-xl border border-[#27272A] bg-[#050505] p-3.5 text-sm text-[#F4F4F6] placeholder-[#71717A] focus:border-[#F2B705] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="vibe-focus-select"
              className="block text-xs font-medium text-[#F4F4F6]"
            >
              Target Stack & Hosting Focus
            </label>
            <select
              id="vibe-focus-select"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#27272A] bg-[#050505] px-3.5 py-2.5 text-sm text-[#F4F4F6] focus:border-[#F2B705] focus:outline-none"
            >
              <option value="Google AI Studio Full-Stack Prototype">
                Google AI Studio Full-Stack Prototype
              </option>
              <option value="Semantic HTML5 & Modular JavaScript">
                Semantic HTML5 & Modular JavaScript
              </option>
              <option value="Editorial Design & Motion">
                Editorial Design & Motion
              </option>
              <option value="24-Hour Hackathon MVP">
                24-Hour Hackathon MVP
              </option>
            </select>
          </div>

          {errorMsg && (
            <p role="alert" className="text-xs text-rose-400">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2B705] px-5 py-3 text-xs font-semibold text-[#050505] hover:bg-[#f7c625] disabled:opacity-60 transition-editorial cursor-pointer whitespace-nowrap"
          >
            <span>
              {loading
                ? 'Synthesizing with High Thinking...'
                : 'Synthesize Build Prompt'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Output Blueprint Panel */}
        <div
          aria-live="polite"
          className="lg:col-span-7 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-[#27272A] pt-6 lg:pt-0 lg:pl-8"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A1A1AA] font-mono-tabular">
              <span>{blueprint.reasoningMode}</span>
              <span>READY FOR GOOGLE AI STUDIO</span>
            </div>

            <h3 className="mt-2 text-xl font-semibold text-[#F4F4F6]">
              {blueprint.projectTitle}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
              <strong className="text-[#F4F4F6]">Research Strategy: </strong>
              {blueprint.researchAngle}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold text-[#F4F4F6]">
                  AI Tool Roles
                </h4>
                <ul className="mt-2 space-y-1.5 text-xs text-[#A1A1AA]">
                  {blueprint.recommendedTools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#F4F4F6]">
                  Decoupled Data Files
                </h4>
                <ul className="mt-2 space-y-1.5 text-xs text-[#A1A1AA] font-mono-tabular">
                  {blueprint.dataFilesNeeded.map((df, i) => (
                    <li key={i}>{df}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-[#27272A] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tabular text-[#F2B705]">
                GENERATED BUILD PROMPT
              </span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] px-3 py-1 text-xs text-[#F4F4F6] hover:border-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#F2B705]" />
                    <span>Copied Prompt</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 rounded-xl bg-[#050505] p-4 text-xs leading-relaxed text-[#E4E4E7] font-mono-tabular">
              {blueprint.masterBuildPrompt}
            </p>
            <p className="mt-3 text-xs text-[#A1A1AA]">
              <strong className="text-[#F4F4F6]">Learning Note: </strong>
              {blueprint.learningFocus}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
