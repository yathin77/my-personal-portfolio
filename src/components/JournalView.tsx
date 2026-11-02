/**
 * @file JournalView.tsx
 * @description Blog / Journal index and Article Detail view with Breadcrumbs,
 * reading time metadata, and key takeaways loaded from src/data/posts.json.
 */

import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import {
  buildBreadcrumbs,
  type BlogPostItem,
  type PageId,
} from '../utils/portfolioLogic';

interface JournalViewProps {
  posts: BlogPostItem[];
  selectedPostId: string | null;
  onSelectPost: (postId: string | null) => void;
  onNavigate: (page: PageId) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  posts,
  selectedPostId,
  onSelectPost,
  onNavigate,
}) => {
  const activePost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId) || null
    : null;

  // Render Blog Detail Page with Breadcrumbs
  if (activePost) {
    const breadcrumbs = buildBreadcrumbs('post-detail', activePost.title);

    return (
      <article className="pt-6 max-w-3xl mx-auto space-y-10">
        <Breadcrumbs
          segments={breadcrumbs}
          onNavigate={(page) => {
            if (page === 'journal') {
              onSelectPost(null);
            } else {
              onNavigate(page);
            }
          }}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectPost(null)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1AA] hover:text-[#F2B705] transition-editorial cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Journal Entries</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
            <span className="text-[#F2B705]">{activePost.index}.</span>
            <span>{activePost.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.date}</span>
            <span aria-hidden="true">·</span>
            <span>{activePost.readTime}</span>
          </div>
        </div>

        <header className="border-b border-[#27272A] pb-8">
          <h1
            style={{ textWrap: 'balance' }}
            className="font-calligraphic text-4xl sm:text-5xl italic font-semibold text-[#F4F4F6]"
          >
            {activePost.title}
          </h1>
          <p className="mt-4 text-base text-[#A1A1AA]">{activePost.excerpt}</p>
        </header>

        <div className="space-y-5 text-base leading-relaxed text-[#E4E4E7]">
          {activePost.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <section className="rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-6">
          <h2 className="text-xs font-mono-tabular text-[#F2B705]">
            KEY TAKEAWAYS
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-[#F4F4F6]">
            {activePost.keyTakeaways.map((takeaway, idx) => (
              <li key={idx}>
                <span className="font-mono-tabular text-xs text-[#F2B705] mr-2">
                  0{idx + 1}.
                </span>
                {takeaway}
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
  }

  // Render Journal Index Page
  return (
    <div className="space-y-12 pt-6">
      <header className="border-b border-[#27272A] pb-8">
        <p className="text-xs font-mono-tabular text-[#F2B705]">
          VIBE CODING JOURNAL · DATA FILE: src/data/posts.json
        </p>
        <h1
          style={{ textWrap: 'balance' }}
          className="mt-3 font-calligraphic text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-[#F4F4F6]"
        >
          Essays on AI Workflows, Design & Learning Web Code
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[#A1A1AA]">
          Documenting how I use Claude, ChatGPT, Gemini, and Google AI Studio to
          ship prototypes fast while learning semantic HTML and JavaScript.
        </p>
      </header>

      <div className="divide-y divide-[#27272A] border-b border-[#27272A]">
        {posts.map((post) => (
          <article
            key={post.id}
            className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
                <span className="text-[#F2B705]">{post.index}.</span>
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.date}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-calligraphic text-3xl italic font-semibold text-[#F4F4F6] group-hover:text-[#F2B705] transition-editorial">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-[#A1A1AA]">
                {post.excerpt}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPost(post.id)}
              className="self-start md:self-center inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#0B0B0E] px-5 py-3 text-xs font-semibold text-[#F4F4F6] group-hover:border-[#F2B705] group-hover:text-[#F2B705] transition-editorial cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Read Essay</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};
