/**
 * @file ContactView.tsx
 * @description Contact page featuring Yathin's real email (yathin7477@gmail.com),
 * GitHub (https://github.com/yathin77), LinkedIn (https://www.linkedin.com/in/yathin-ajay-634b87418/),
 * Instagram (https://www.instagram.com/yathin776611/), and a validated Contact Form.
 */

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import {
  validateContactForm,
  type ContactFormInput,
} from '../utils/portfolioLogic';
import profileData from '../data/profile.json';

interface SubmittedInquiry extends ContactFormInput {
  id: string;
  submittedAt: string;
}

export const ContactView: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    vibeTopic: 'Hackathon Collaboration',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>([]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const newEntry: SubmittedInquiry = {
      ...formState,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setInquiries((prev) => [newEntry, ...prev]);
    setFormState({
      name: '',
      email: '',
      vibeTopic: 'Hackathon Collaboration',
      message: '',
    });
  };

  return (
    <div className="space-y-16 pt-6">
      <header className="border-b border-[#27272A] pb-8">
        <p className="text-xs font-mono-tabular text-[#F2B705]">
          DIRECT CHANNELS · TAMIL NADU, INDIA
        </p>
        <h1
          style={{ textWrap: 'balance' }}
          className="mt-3 font-calligraphic text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-[#F4F4F6]"
        >
          Let’s Build Something Before the Momentum Fades
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[#A1A1AA]">
          Whether you want to team up for a hackathon, discuss vibe coding
          workflows, or talk web engineering opportunities—reach out directly.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Direct Links (Email, GitHub, LinkedIn, Instagram) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6">
            <span className="text-xs font-mono-tabular text-[#A1A1AA]">
              01. PRIMARY EMAIL
            </span>
            <p className="mt-2 font-calligraphic text-2xl italic text-[#F4F4F6] break-all">
              {profileData.contact.email}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-[#050505] hover:bg-[#f7c625] transition-editorial"
              >
                <span>Open Mail Client</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] px-3.5 py-2 text-xs text-[#F4F4F6] hover:border-[#F2B705] transition-editorial cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#F2B705]" />
                    <span>Copied Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-mono-tabular text-[#A1A1AA]">
              02. SOCIAL & DEVELOPER PROFILES
            </h2>

            <div className="divide-y divide-[#27272A] rounded-2xl border border-[#27272A] bg-[#0B0B0E] px-6">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-sm text-[#F4F4F6] hover:text-[#F2B705] transition-editorial"
              >
                <div>
                  <p className="font-semibold">GitHub</p>
                  <p className="text-xs text-[#A1A1AA] font-mono-tabular">
                    github.com/yathin77
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-sm text-[#F4F4F6] hover:text-[#F2B705] transition-editorial"
              >
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-xs text-[#A1A1AA] font-mono-tabular">
                    linkedin.com/in/yathin-ajay-634b87418
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>

              <a
                href={profileData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-sm text-[#F4F4F6] hover:text-[#F2B705] transition-editorial"
              >
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p className="text-xs text-[#A1A1AA] font-mono-tabular">
                    instagram.com/yathin776611
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Validated Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 sm:p-8 space-y-6"
          >
            <h2 className="font-calligraphic text-3xl italic text-[#F4F4F6]">
              Send a Direct Message
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-[#F4F4F6]"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Arjun Raman"
                  className="mt-2 w-full rounded-xl border border-[#27272A] bg-[#050505] px-4 py-3 text-sm text-[#F4F4F6] placeholder-[#71717A] focus:border-[#F2B705] focus:outline-none"
                />
                {errors.name && (
                  <p role="alert" className="mt-1.5 text-xs text-rose-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-[#F4F4F6]"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-[#27272A] bg-[#050505] px-4 py-3 text-sm text-[#F4F4F6] placeholder-[#71717A] focus:border-[#F2B705] focus:outline-none"
                />
                {errors.email && (
                  <p role="alert" className="mt-1.5 text-xs text-rose-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="block text-xs font-medium text-[#F4F4F6]"
              >
                Collaboration Vibe / Topic
              </label>
              <select
                id="contact-topic"
                value={formState.vibeTopic}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    vibeTopic: e.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-[#27272A] bg-[#050505] px-4 py-3 text-sm text-[#F4F4F6] focus:border-[#F2B705] focus:outline-none"
              >
                <option value="Hackathon Collaboration">
                  Hackathon Collaboration
                </option>
                <option value="Web Development Project">
                  Web Development Project
                </option>
                <option value="Vibe Coding & AI Workflow">
                  Vibe Coding & AI Workflow
                </option>
                <option value="General Hello">General Hello</option>
              </select>
              {errors.vibeTopic && (
                <p role="alert" className="mt-1.5 text-xs text-rose-400">
                  {errors.vibeTopic}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-[#F4F4F6]"
              >
                Your Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Tell me about your idea, hackathon timeline, or web project..."
                className="mt-2 w-full rounded-xl border border-[#27272A] bg-[#050505] p-4 text-sm text-[#F4F4F6] placeholder-[#71717A] focus:border-[#F2B705] focus:outline-none"
              />
              {errors.message && (
                <p role="alert" className="mt-1.5 text-xs text-rose-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F2B705] px-6 py-3.5 text-xs font-semibold text-[#050505] hover:bg-[#f7c625] transition-editorial cursor-pointer whitespace-nowrap"
            >
              <Send className="h-4 w-4" />
              <span>Send Message to Yathin</span>
            </button>
          </form>

          {/* Dispatched Message Log */}
          {inquiries.length > 0 && (
            <section
              aria-live="polite"
              className="mt-8 rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6 space-y-4"
            >
              <h3 className="text-xs font-mono-tabular text-[#F2B705]">
                MESSAGE DISPATCHED · SESSION LOG ({inquiries.length})
              </h3>
              <div className="divide-y divide-[#27272A]">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="py-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#F4F4F6] font-medium">
                      <span>
                        {inq.name} ({inq.email})
                      </span>
                      <span className="font-mono-tabular text-[#A1A1AA]">
                        {inq.vibeTopic} · {inq.submittedAt}
                      </span>
                    </div>
                    <p className="text-[#A1A1AA]">{inq.message}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
