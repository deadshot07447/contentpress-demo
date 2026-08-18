import { notFound } from "next/navigation";
import { apolloClient } from "@/lib/apollo-client";
import { GET_ALL_PAGES, GET_PAGE_BY_SLUG } from "@/lib/queries";
import PageClient from "@/components/PageClient";
import type { Metadata } from "next";

// 1. Statically generate all WordPress pages at build time
export async function generateStaticParams() {
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_PAGES,
    });

    // Map URIs like '/about/team/' to ['about', 'team']
    return data.pages.nodes
      .filter((node: any) => node.uri !== '/') // Exclude homepage since app/page.tsx handles it
      .map((node: any) => ({
        slug: node.uri.replace(/^\/|\/$/g, '').split('/'),
      }));
  } catch (error) {
    console.error("Error fetching static params for pages:", error);
    return [];
  }
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const uri = `/${params.slug.join('/')}/`;
  
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: uri },
    });

    const page = data?.page;
    if (!page) return {};

    return {
      title: page.seo?.title || page.title,
      description: page.seo?.metaDesc || "",
    };
  } catch {
    return {};
  }
}

// 3. Catch-All Page Component
export default async function CatchAllPage({ params }: { params: { slug: string[] } }) {
  // Construct the URI exactly as WordPress expects it
  const uri = `/${params.slug.join('/')}/`;

  // Fetch the page data
  let pageData;
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: uri },
    });
    pageData = data?.page;
  } catch (error) {
    console.error(`Error fetching page ${uri}:`, error);
  }

  // 404 Handling: If WordPress has no page with this URI, throw 404
  if (!pageData) {
    notFound();
  }

  return (
    <main>
      <div className="bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pageData.title}
          </h1>
        </div>
      </div>
      
      {/* Pass raw HTML content to the generic PageClient for Tailwind Typography styling */}
      <PageClient content={pageData.content} blocks={pageData.editorBlocks} />
    </main>
  );
}
