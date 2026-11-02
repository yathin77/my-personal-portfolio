/**
 * @file Breadcrumbs.tsx
 * @description Semantic, accessible breadcrumb navigation bar displayed on
 * project detail and blog post detail views.
 */

import React from 'react';
import type { BreadcrumbSegment, PageId } from '../utils/portfolioLogic';

interface BreadcrumbsProps {
  segments: BreadcrumbSegment[];
  onNavigate: (page: PageId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  segments,
  onNavigate,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 border-b border-[#27272A] pb-4 text-xs text-[#A1A1AA]"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {segments.map((seg, idx) => (
          <li key={`${seg.page}-${idx}`} className="flex items-center gap-2">
            {idx > 0 && (
              <span aria-hidden="true" className="text-[#52525B]">
                /
              </span>
            )}
            {seg.isCurrent ? (
              <span
                aria-current="page"
                className="font-medium text-[#F2B705] truncate max-w-[260px] sm:max-w-[420px]"
              >
                {seg.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(seg.page)}
                className="hover:text-[#F4F4F6] transition-editorial underline-offset-4 hover:underline cursor-pointer whitespace-nowrap"
              >
                {seg.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
