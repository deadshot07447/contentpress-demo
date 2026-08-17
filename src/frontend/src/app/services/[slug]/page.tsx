import { apolloClient } from "@/lib/apollo-client";
import { GET_SERVICE_BY_SLUG, GET_ALL_SERVICES } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./service.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await apolloClient.query({
      query: GET_SERVICE_BY_SLUG,
      variables: { slug },
    });
    const service = (data as any)?.service;
    if (!service) return { title: "Service Not Found" };
    return {
      title: service.title,
      description: service.serviceDetails?.shortDescription || "",
    };
  } catch {
    return { title: "Service" };
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await apolloClient.query({ query: GET_ALL_SERVICES });
    return ((data as any)?.services?.nodes ?? []).map((s: any) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  let service = null;

  try {
    const { data } = await apolloClient.query({
      query: GET_SERVICE_BY_SLUG,
      variables: { slug },
    });
    service = (data as any)?.service;
  } catch {
    // pass
  }

  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className="container">
          <Link href="/services" className={styles.backLink}>← All Services</Link>
          <div className={styles.icon}>
            {service.serviceDetails?.icon || "⚙️"}
          </div>
          <span className={`badge badge-purple ${styles.pricingBadge}`}>
            {service.serviceDetails?.pricingTier || "Contact for Pricing"}
          </span>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroSub}>{service.serviceDetails?.shortDescription}</p>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
            Get a Quote for This Service →
          </Link>
        </div>
      </section>

      {/* Content */}
      {service.content && (
        <section className="section--sm">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section--sm">
        <div className="container">
          <div className={styles.ctaBox}>
            <h3>Ready to Get Started with {service.title}?</h3>
            <p>
              Talk to our team and get a free, no-obligation quote tailored to your
              specific needs.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">Request a Quote →</Link>
              <Link href="/services" className="btn btn-secondary">All Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
