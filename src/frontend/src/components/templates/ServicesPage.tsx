import { apolloClient } from "@/lib/apollo-client";
import { GET_ALL_SERVICES } from "@/lib/queries";
import Link from "next/link";
import styles from "./services.module.css";

async function getServices() {
  try {
    const { data } = await apolloClient.query({ query: GET_ALL_SERVICES });
    return (data as any)?.services?.nodes ?? [];
  } catch {
    return [];
  }
}

export default async function ServicesPage({ data }: { data?: any }) {
  const cmsServices = await getServices();
  const acf = data?.acfFields || {};
  const headline = acf.headline || "Services Designed for <span class=\"gradient-text\">Real Results</span>";
  const subhead = acf.subhead || "From idea to launch — and everything in between. We offer a comprehensive suite of digital services built to help your business scale.";

  const services = cmsServices.map((s: any) => ({
    id: s.id,
    slug: s.slug,
    icon: s.serviceDetails?.icon || "⚙️",
    title: s.title,
    shortDescription: s.serviceDetails?.shortDescription || "",
    pricingTier: s.serviceDetails?.pricingTier || null,
    features: [],
  }));

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className="container">
          <span className="badge badge-blue">What We Offer</span>
          <h1 className={styles.heroHeading} dangerouslySetInnerHTML={{ __html: headline }} />
          <p className={styles.heroSub}>
            {subhead}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {services.map((service: any) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.iconWrap}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.shortDescription}</p>
                {service.features.length > 0 && (
                  <ul className={styles.featureList}>
                    {service.features.map((f: string) => (
                      <li key={f} className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className={styles.serviceFooter}>
                  {service.pricingTier && (
                    <span className="badge badge-purple">{service.pricingTier}</span>
                  )}
                  {service.slug !== "#" && (
                    <Link href={`/services/${service.slug}`} className={styles.learnMore}>
                      Learn more →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--sm">
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Not Sure Which Service You Need?</h2>
            <p>Schedule a free 30-minute discovery call and we&apos;ll help you figure it out.</p>
            <Link href="/contact" className="btn btn-primary">
              Book a Free Consultation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
