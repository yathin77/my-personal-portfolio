/**
 * @file Footer.tsx
 * @description Shared portfolio footer containing real social links (GitHub, LinkedIn,
 * Instagram, Email), page quick-links, XML sitemap link, and copyright.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PageId } from '../utils/portfolioLogic';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  email,
  github,
  linkedin,
  instagram,
}) => {
  return (
    <footer className="border-t border-[#27272A] bg-[#050505] text-[#A1A1AA]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Column 1: Identity & Calligraphic Sign-off */}
          <div className="md:col-span-6">
            <p className="font-calligraphic text-3xl italic text-[#F4F4F6]">
              Yathin Ajay Kumar khotwani A
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#A1A1AA]">
              Inquisitive Vibe Coder born in Tamil Nadu. Leveraging Claude,
              ChatGPT, Gemini, and Google AI Studio to turn raw ideas into
              deployed web applications before the momentum fades.
            </p>
            <p className="mt-4 text-xs font-mono-tabular text-[#71717A]">
              EMAIL ·{' '}
              <a
                href={`mailto:${email}`}
                className="text-[#F4F4F6] hover:text-[#F2B705] transition-editorial underline underline-offset-4"
              >
                {email}
              </a>
            </p>
          </div>

          {/* Column 2: Site Directory */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold text-[#F4F4F6] tracking-wide">
              01. Directory
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(
                [
                  ['home', 'Home'],
                  ['about', 'About & Resume'],
                  ['projects', 'Projects'],
                  ['toolkit', 'AI Toolkit'],
                  ['journal', 'Journal'],
                  ['contact', 'Contact'],
                ] as [PageId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(id);
                    }}
                    className="hover:text-[#F4F4F6] transition-editorial"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Social Channels */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold text-[#F4F4F6] tracking-wide">
              02. Social & Code
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#F2B705] transition-editorial"
                >
                  <span>GitHub (@yathin77)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#F2B705] transition-editorial"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#F2B705] transition-editorial"
                >
                  <span>Instagram (@yathin776611)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#F2B705] transition-editorial"
                >
                  <span>Direct Email</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Sitemap Row */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#27272A] pt-8 text-xs text-[#71717A]">
          <p>
            © {new Date().getFullYear()} Yathin Ajay Kumar khotwani A. Built
            with Semantic HTML, JavaScript & Hosted in Google AI Studio.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F6] transition-editorial"
            >
              XML Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <span>Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
