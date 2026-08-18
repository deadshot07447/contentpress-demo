"use client";

import React from "react";

/**
 * PageClient Component
 * 
 * Maps raw Gutenberg content or blocks from Headless WordPress to React components.
 * By default, uses Tailwind Typography (@tailwindcss/typography) 'prose' class
 * to automatically style WordPress raw HTML.
 */
interface PageClientProps {
  content?: string;
  blocks?: any[];
}

export default function PageClient({ content, blocks }: PageClientProps) {
  // If the API provided specific Component Blocks (ACF or Gutenberg Blocks array)
  // you would map over them here. 
  // Example: if (blocks) return blocks.map(block => <ComponentResolver block={block} />);

  // Fallback: If no blocks array is provided, render the raw HTML payload
  // and let Tailwind Typography handle the styling safely.
  if (!content) return null;

  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
      <article
        className="prose prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
