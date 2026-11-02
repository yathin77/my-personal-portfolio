/**
 * @file EditorialArtwork.tsx
 * @description Bespoke kinetic SVG & CSS editorial artwork canvases inspired by PostGeneric.
 * Guarantees 100% crisp, zero-broken-image visual rendering at any resolution while
 * reacting smoothly to user hover using compositor-only transforms.
 */

import React from 'react';

interface EditorialArtworkProps {
  variant:
    | 'hero-studio'
    | 'tamilnadu-portrait'
    | 'portfolio-monograph'
    | 'prompt-synthesis'
    | 'hackathon-grid';
  title?: string;
  subtitle?: string;
  className?: string;
}

export const EditorialArtwork: React.FC<EditorialArtworkProps> = ({
  variant,
  title,
  subtitle,
  className = '',
}) => {
  if (variant === 'hero-studio') {
    return (
      <div
        role="img"
        aria-label="Kinetic editorial visualization of Yathin's Vibe Coding Studio"
        className={`relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-8 flex flex-col justify-between group ${className}`}
      >
        {/* Subtle radial tungsten glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#F2B705]/12 blur-3xl transition-transform duration-700 group-hover:scale-110"
        />

        {/* Top architectural grid header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#27272A]/80 pb-4 text-xs text-[#A1A1AA] font-mono-tabular">
          <span>STUDIO VIEWPORT · 13.0827° N, 80.2707° E</span>
          <span>FLOW STATE ARCHITECTURE</span>
        </div>

        {/* Center geometric SVG calligraphy sculpture */}
        <div className="relative z-10 my-8 flex items-center justify-center">
          <svg
            viewBox="0 0 480 280"
            className="w-full max-w-[440px] h-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Structural coordinate grid lines */}
            <line x1="0" y1="40" x2="480" y2="40" stroke="#27272A" strokeWidth="1" />
            <line x1="0" y1="140" x2="480" y2="140" stroke="#27272A" strokeWidth="1" />
            <line x1="0" y1="240" x2="480" y2="240" stroke="#27272A" strokeWidth="1" />
            <line x1="120" y1="0" x2="120" y2="280" stroke="#27272A" strokeWidth="1" />
            <line x1="240" y1="0" x2="240" y2="280" stroke="#27272A" strokeWidth="1" />
            <line x1="360" y1="0" x2="360" y2="280" stroke="#27272A" strokeWidth="1" />

            {/* Concentric orbital rings representing iterative AI reasoning */}
            <circle
              cx="240"
              cy="140"
              r="96"
              stroke="#3F3F46"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle cx="240" cy="140" r="64" stroke="#F2B705" strokeOpacity="0.45" strokeWidth="1.25" />

            {/* Expressive calligraphic bezier ribbon (PostGeneric-inspired curve) */}
            <path
              d="M40 210 C 130 30, 210 250, 290 80 C 345 -10, 400 200, 445 95"
              stroke="#F2B705"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M40 226 C 140 55, 220 265, 300 98 C 355 15, 405 215, 445 115"
              stroke="#F4F4F6"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Focal anchor nodes */}
            <circle cx="152" cy="128" r="4" fill="#F4F4F6" />
            <circle cx="240" cy="140" r="6" fill="#F2B705" />
            <circle cx="322" cy="96" r="4" fill="#F4F4F6" />

            {/* Framed architectural caption inside SVG */}
            <rect
              x="24"
              y="20"
              width="148"
              height="32"
              rx="4"
              fill="#050505"
              stroke="#27272A"
            />
            <text
              x="36"
              y="40"
              fill="#F4F4F6"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              IDEA → PROMPT → SHIP
            </text>
          </svg>
        </div>

        {/* Bottom editorial caption */}
        <div className="relative z-10 border-t border-[#27272A]/80 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[#A1A1AA] font-mono-tabular">
              01. CREATIVE VELOCITY
            </p>
            <p className="mt-1 font-calligraphic italic text-2xl text-[#F4F4F6]">
              “Turning raw ideas into deployed reality before the momentum fades.”
            </p>
          </div>
          <span className="text-xs text-[#F2B705] font-mono-tabular whitespace-nowrap shrink-0">
            TAMIL NADU → GLOBAL WEB
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'tamilnadu-portrait') {
    return (
      <div
        role="img"
        aria-label="Editorial monograph card representing Yathin's roots in Tamil Nadu and web engineering ambition"
        className={`relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-8 flex flex-col justify-between group ${className}`}
      >
        <div className="flex items-center justify-between text-xs text-[#A1A1AA] font-mono-tabular border-b border-[#27272A] pb-4">
          <span>MONOGRAPH PORTRAIT</span>
          <span>ORIGIN · TAMIL NADU</span>
        </div>

        <div className="my-8 flex flex-col items-center justify-center text-center">
          <svg
            viewBox="0 0 320 260"
            className="w-full max-w-[280px] h-auto transition-transform duration-500 group-hover:scale-[1.02]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Architectural arch inspired by South Indian Dravidian geometry & modern brutalism */}
            <rect
              x="40"
              y="20"
              width="240"
              height="220"
              rx="8"
              stroke="#27272A"
              strokeWidth="1.2"
            />
            <path
              d="M80 240 V115 C80 70 240 70 240 115 V240"
              stroke="#F2B705"
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <line x1="160" y1="20" x2="160" y2="240" stroke="#27272A" strokeWidth="1" />
            <line x1="40" y1="130" x2="280" y2="130" stroke="#27272A" strokeWidth="1" />
            <circle cx="160" cy="130" r="38" stroke="#F4F4F6" strokeOpacity="0.8" strokeWidth="1.5" />
            <text
              x="160"
              y="138"
              textAnchor="middle"
              fill="#F2B705"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontStyle="italic"
              fontSize="28"
              fontWeight="600"
            >
              Y·A·K
            </text>
          </svg>
          <p className="mt-4 font-calligraphic text-2xl italic text-[#F4F4F6]">
            Yathin Ajay Kumar khotwani A
          </p>
          <p className="mt-1 text-xs text-[#A1A1AA]">
            Born in Tamil Nadu · Aspiring World-Class Web Developer
          </p>
        </div>

        <div className="border-t border-[#27272A] pt-4 flex items-center justify-between text-xs text-[#A1A1AA] font-mono-tabular">
          <span>INTUITION + AI</span>
          <span className="text-[#F2B705]">FLOW STATE</span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={title || 'Project architectural preview'}
      className={`relative overflow-hidden rounded-xl border border-[#27272A] bg-[#09090C] p-6 min-h-[230px] flex flex-col justify-between group ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#F2B705]/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
      />
      <div className="flex items-center justify-between text-xs text-[#A1A1AA] font-mono-tabular border-b border-[#27272A]/80 pb-3">
        <span>
          {variant === 'portfolio-monograph'
            ? 'SYSTEM 01 · PORTFOLIO ENGINE'
            : variant === 'prompt-synthesis'
            ? 'SYSTEM 02 · PROMPT MATRIX'
            : 'SYSTEM 03 · RAPID UI KIT'}
        </span>
        <span className="text-[#F2B705]">2026</span>
      </div>

      <div className="my-5 flex flex-1 items-center justify-center">
        {variant === 'portfolio-monograph' && (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-40 transition-transform duration-500 group-hover:scale-[1.02]"
            fill="none"
          >
            <rect x="16" y="14" width="368" height="152" rx="8" fill="#050505" stroke="#27272A" />
            <line x1="16" y1="42" x2="384" y2="42" stroke="#27272A" />
            <circle cx="34" cy="28" r="3" fill="#F2B705" />
            <circle cx="46" cy="28" r="3" fill="#3F3F46" />
            <circle cx="58" cy="28" r="3" fill="#3F3F46" />
            <line x1="224" y1="42" x2="224" y2="166" stroke="#27272A" />
            <text
              x="36"
              y="92"
              fill="#F4F4F6"
              fontFamily="Cormorant Garamond, serif"
              fontStyle="italic"
              fontSize="26"
            >
              Vibe Coding
            </text>
            <text
              x="36"
              y="118"
              fill="#A1A1AA"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              JSON DATA → SEMANTIC DOM
            </text>
            <path
              d="M245 135 C 275 65, 315 145, 358 72"
              stroke="#F2B705"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="358" cy="72" r="4" fill="#F2B705" />
          </svg>
        )}

        {variant === 'prompt-synthesis' && (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-40 transition-transform duration-500 group-hover:scale-[1.02]"
            fill="none"
          >
            <rect x="20" y="26" width="100" height="128" rx="8" fill="#050505" stroke="#27272A" />
            <rect x="150" y="26" width="100" height="128" rx="8" fill="#050505" stroke="#F2B705" strokeOpacity="0.7" />
            <rect x="280" y="26" width="100" height="128" rx="8" fill="#050505" stroke="#27272A" />
            <line x1="120" y1="90" x2="150" y2="90" stroke="#F2B705" strokeWidth="1.5" />
            <line x1="250" y1="90" x2="280" y2="90" stroke="#F2B705" strokeWidth="1.5" />
            <text x="70" y="94" textAnchor="middle" fill="#A1A1AA" fontFamily="JetBrains Mono, monospace" fontSize="10">
              01 · RESEARCH
            </text>
            <text x="200" y="94" textAnchor="middle" fill="#F2B705" fontFamily="JetBrains Mono, monospace" fontSize="10">
              02 · PROMPT
            </text>
            <text x="330" y="94" textAnchor="middle" fill="#F4F4F6" fontFamily="JetBrains Mono, monospace" fontSize="10">
              03 · DEPLOY
            </text>
          </svg>
        )}

        {variant === 'hackathon-grid' && (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-40 transition-transform duration-500 group-hover:scale-[1.02]"
            fill="none"
          >
            {/* Top 2 modular architecture blocks */}
            <rect
              x="16"
              y="16"
              width="176"
              height="68"
              rx="8"
              fill="#050505"
              stroke="#27272A"
              strokeWidth="1.2"
            />
            <rect
              x="208"
              y="16"
              width="176"
              height="68"
              rx="8"
              fill="#050505"
              stroke="#27272A"
              strokeWidth="1.2"
            />

            {/* Subtle structural accent lines inside top blocks */}
            <line x1="64" y1="64" x2="144" y2="64" stroke="#F2B705" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
            <line x1="256" y1="64" x2="336" y2="64" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" />

            {/* Bottom full-width deployment showcase block */}
            <rect
              x="16"
              y="98"
              width="368"
              height="66"
              rx="8"
              fill="#050505"
              stroke="#F2B705"
              strokeOpacity="0.75"
              strokeWidth="1.25"
            />

            <text
              x="104"
              y="46"
              textAnchor="middle"
              fill="#F4F4F6"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10.5"
              fontWeight="500"
            >
              01 · SEMANTIC HTML5
            </text>
            <text
              x="296"
              y="46"
              textAnchor="middle"
              fill="#F4F4F6"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10.5"
              fontWeight="500"
            >
              02 · MODULAR JS
            </text>
            <text
              x="200"
              y="136"
              textAnchor="middle"
              fill="#F2B705"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontStyle="italic"
              fontWeight="600"
              fontSize="15"
            >
              Shipped in Google AI Studio before momentum fades
            </text>
          </svg>
        )}
      </div>

      <div className="border-t border-[#27272A]/80 pt-3 flex items-center justify-between text-xs text-[#A1A1AA]">
        <span className="truncate">{title || 'Editorial Architecture'}</span>
        <span className="font-mono-tabular text-[#F4F4F6] shrink-0 ml-2">
          {subtitle || 'Inspect →'}
        </span>
      </div>
    </div>
  );
};
