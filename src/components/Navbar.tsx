/**
 * @file Navbar.tsx
 * @description Shared top navigation bar following the strict 3-zone Top Bar Contract:
 * Zone 1: Single-line brand wordmark
 * Zone 2: 5 concise single-line navigation links with highlighted current page
 * Zone 3: 1 primary CTA button + responsive mobile hamburger toggle
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageId } from '../utils/portfolioLogic';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'journal', label: 'Journal' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when pressing Escape key for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Normalize detail pages so their parent nav item remains highlighted
  const activeNavId: PageId =
    currentPage === 'project-detail'
      ? 'projects'
      : currentPage === 'post-detail'
      ? 'journal'
      : currentPage;

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#27272A] bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelectPage('home');
          }}
          className="font-calligraphic text-2xl font-semibold tracking-tight text-[#F4F4F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705]"
        >
          Yathin Ajay Kumar
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((item) => {
            const isCurrent = activeNavId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPage(item.id);
                }}
                className={`whitespace-nowrap shrink-0 py-1 transition-editorial border-b-2 ${
                  isCurrent
                    ? 'border-[#F2B705] text-[#F4F4F6]'
                    : 'border-transparent text-[#A1A1AA] hover:text-[#F4F4F6] hover:border-[#3F3F46]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action on desktop + hamburger button on mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelectPage('contact')}
            aria-current={activeNavId === 'contact' ? 'page' : undefined}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-editorial whitespace-nowrap shrink-0 cursor-pointer ${
              activeNavId === 'contact'
                ? 'bg-[#F4F4F6] text-[#050505]'
                : 'bg-[#F2B705] text-[#050505] hover:bg-[#f7c625]'
            }`}
          >
            Contact Me
          </button>

          <button
            type="button"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#27272A] text-[#F4F4F6] hover:border-[#F2B705] transition-editorial"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#27272A] bg-[#0B0B0E] px-6 py-5"
        >
          <ul className="flex flex-col space-y-3">
            {[...NAV_LINKS, { id: 'contact' as PageId, label: 'Contact' }].map(
              (item) => {
                const isCurrent = activeNavId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isCurrent ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectPage(item.id);
                      }}
                      className={`block rounded-lg px-4 py-2.5 text-base font-medium transition-editorial ${
                        isCurrent
                          ? 'bg-[#18181B] text-[#F2B705]'
                          : 'text-[#A1A1AA] hover:bg-[#121216] hover:text-[#F4F4F6]'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};
