/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * @file App.tsx
 * @description Root multi-page portfolio application for Yathin Ajay Kumar khotwani A.
 * Connects the shared Navbar, Footer, smooth page transitions, per-page SEO meta updater,
 * "Back to top" button, and JSON data files (projects, timeline, toolkit, posts).
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProjectsView } from './components/ProjectsView';
import { ToolkitView } from './components/ToolkitView';
import { JournalView } from './components/JournalView';
import { ContactView } from './components/ContactView';
import {
  getPageSeoMeta,
  type PageId,
  type ProjectItem,
  type TimelineItem,
  type ToolkitItem,
  type BlogPostItem,
} from './utils/portfolioLogic';

// Data files: adding projects, timeline milestones, tools, or blog posts
// only requires editing these JSON files—no component changes needed!
import profileData from './data/profile.json';
import projectsData from './data/projects.json';
import timelineData from './data/timeline.json';
import toolkitData from './data/toolkit.json';
import postsData from './data/posts.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects = projectsData as ProjectItem[];
  const timeline = timelineData as TimelineItem[];
  const toolkit = toolkitData as ToolkitItem[];
  const posts = postsData as BlogPostItem[];

  // Dynamically update document.title, meta description, and OpenGraph tags per page for SEO
  useEffect(() => {
    const activeProject = selectedProjectId
      ? projects.find((p) => p.id === selectedProjectId)
      : undefined;
    const activePost = selectedPostId
      ? posts.find((p) => p.id === selectedPostId)
      : undefined;

    const seoPage: PageId =
      currentPage === 'projects' && activeProject
        ? 'project-detail'
        : currentPage === 'journal' && activePost
        ? 'post-detail'
        : currentPage;

    const detailTitle = activeProject?.title || activePost?.title;
    const detailSummary = activeProject?.summary || activePost?.excerpt;

    const { title, description } = getPageSeoMeta(
      seoPage,
      detailTitle,
      detailSummary
    );

    document.title = title;

    const updateMetaTag = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
  }, [currentPage, selectedProjectId, selectedPostId, projects, posts]);

  // Listen to window scroll position to toggle the "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth page transition handler
  const handleNavigate = (targetPage: PageId) => {
    setIsTransitioning(true);
    if (targetPage !== 'projects') {
      setSelectedProjectId(null);
    }
    if (targetPage !== 'journal') {
      setSelectedPostId(null);
    }
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsTransitioning(false), 160);
  };

  // Open a specific project case study from anywhere in the portfolio
  const handleOpenProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open a specific blog post from anywhere in the portfolio
  const handleOpenPost = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const effectiveNavPage: PageId =
    currentPage === 'projects' && selectedProjectId
      ? 'project-detail'
      : currentPage === 'journal' && selectedPostId
      ? 'post-detail'
      : currentPage;

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#F4F4F6]">
      {/* Skip-to-content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#F2B705] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-[#050505]"
      >
        Skip to main content
      </a>

      {/* Shared Header with Navigation & Highlighted Current Page */}
      <Navbar currentPage={effectiveNavPage} onNavigate={handleNavigate} />

      {/* Main Content Container with Smooth Compositor Opacity/Transform Transition */}
      <main
        id="main-content"
        className={`flex-1 mx-auto w-full max-w-[1200px] px-6 pb-24 transition-editorial ${
          isTransitioning
            ? 'opacity-80 translate-y-0.5'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {currentPage === 'home' && (
          <HomeView
            projects={projects}
            posts={posts}
            onNavigate={handleNavigate}
            onOpenProject={handleOpenProject}
            onOpenPost={handleOpenPost}
          />
        )}

        {currentPage === 'about' && (
          <AboutView timeline={timeline} projects={projects} />
        )}

        {currentPage === 'projects' && (
          <ProjectsView
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={(id) => {
              setSelectedProjectId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'toolkit' && <ToolkitView toolkit={toolkit} />}

        {currentPage === 'journal' && (
          <JournalView
            posts={posts}
            selectedPostId={selectedPostId}
            onSelectPost={(id) => {
              setSelectedPostId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && <ContactView />}
      </main>

      {/* Shared Footer with Social Links & Copyright */}
      <Footer
        onNavigate={handleNavigate}
        email={profileData.contact.email}
        github={profileData.contact.github}
        linkedin={profileData.contact.linkedin}
        instagram={profileData.contact.instagram}
      />

      {/* Accessible "Back to Top" Button — visible after scrolling past 280px */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#0B0B0E]/95 px-4 py-2.5 text-xs font-semibold text-[#F4F4F6] shadow-lg hover:border-[#F2B705] hover:text-[#F2B705] transition-editorial cursor-pointer ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-3.5 w-3.5" />
        <span>Back to top</span>
      </button>
    </div>
  );
}
