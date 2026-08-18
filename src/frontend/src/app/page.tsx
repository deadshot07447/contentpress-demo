import { notFound } from "next/navigation";
import { apolloClient } from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/lib/queries";
import HomePage from "@/components/templates/HomePage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic"; // Or configure ISR

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: "/" },
    });

    const page = data?.page;
    if (!page) return {};

    return {
      title: page.seo?.title || "ContentPress Co.",
      description: page.seo?.metaDesc || "Enterprise-grade digital solutions.",
    };
  } catch {
    return {};
  }
}

export default async function IndexPage() {
  // Fetch the page data for the root URL
  let pageData;
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: "/" },
    });
    pageData = data?.page;
  } catch (error) {
    console.error(`Error fetching root page:`, error);
  }

  // If there's no page set for the root in WP, we still render the HomePage template 
  // as a fallback so the site doesn't break while configuring WordPress.
  if (!pageData) {
    return <HomePage />;
  }

  // Render the template
  return <HomePage data={pageData} />;
}
