import { notFound } from "next/navigation";
import { apolloClient } from "@/lib/apollo-client";
import { GET_ALL_PAGES, GET_PAGE_BY_SLUG } from "@/lib/queries";
import PageClient from "@/components/PageClient";
import HomePage from "@/components/templates/HomePage";
import ContactPage from "@/components/templates/ContactPage";
import ServicesPage from "@/components/templates/ServicesPage";
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
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const uri = `/${resolvedParams.slug.join('/')}/`;
  
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
export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  // Construct the URI exactly as WordPress expects it
  const uri = `/${resolvedParams.slug.join('/')}/`;

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

  // Component Router Logic based on WordPress Page Template
  const templateName = pageData?.template?.templateName;

  switch (templateName) {
    case "Homepage Template":
      return <HomePage data={pageData} />;
    case "Contact Template":
      return <ContactPage data={pageData} />;
    case "Services Template":
      return <ServicesPage data={pageData} />;
    default:
      // Fallback for Generic Pages (Privacy Policy, Careers, etc.)
      return (
        <main>
          <div className="bg-gray-50 py-12 dark:bg-gray-900">
            <div className="container">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {pageData.title}
              </h1>
            </div>
          </div>
          <PageClient content={pageData.content} blocks={pageData.editorBlocks} />
        </main>
      );
  }
}
