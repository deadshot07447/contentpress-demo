import { apolloClient } from "@/lib/apollo-client";
import { GET_ALL_SERVICES, GET_ALL_POSTS } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./home.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ContentPress Co. — Digital Solutions for Modern Businesses",
  description:
    "We build digital experiences that elevate your brand and drive measurable growth. Web development, cloud, and marketing — all under one roof.",
};

async function getHomeData() {
  try {
    const [servicesResult, postsResult] = await Promise.all([
      apolloClient.query({ query: GET_ALL_SERVICES }),
      apolloClient.query({ query: GET_ALL_POSTS }),
    ]);
    const sd = servicesResult.data as any;
    const pd = postsResult.data as any;
    return {
      services: sd?.services?.nodes ?? [],
      posts: pd?.posts?.nodes?.slice(0, 3) ?? [],
    };
  } catch {
    return { services: [], posts: [] };
  }
}

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "40+", label: "Team Members" },
];

const trustedBy = ["TechFlow", "NovaCorp", "Apex Labs", "BlueSky Inc.", "Meridian", "PulseIO"];

export default async function HomePage() {
  const { services, posts } = await getHomeData();

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
          <div className={styles.heroGrid}></div>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={`badge badge-blue ${styles.heroBadge}`}>
              ✦ Trusted by 150+ Companies
            </span>
            <h1 className={styles.heroHeading}>
              We Build Digital{" "}
              <span className="gradient-text">Experiences</span>{" "}
              That Drive Growth
            </h1>
            <p className={styles.heroSubtitle}>
              ContentPress Co. is your full-service digital partner — delivering
              world-class web development, cloud infrastructure, and marketing
              strategies that produce real, measurable results.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/services" className="btn btn-primary">
                Explore Our Services →
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Talk to an Expert
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className={styles.heroVisual}>
            <div className={styles.heroCard} style={{ animationDelay: "0s" }}>
              <div className={styles.cardDot} style={{ background: "#10b981" }}></div>
              <span>New project deployed</span>
              <span className={styles.cardTime}>Just now</span>
            </div>
            <div className={styles.heroCard} style={{ animationDelay: "0.15s" }}>
              <div className={styles.cardDot} style={{ background: "#3b82f6" }}></div>
              <span>Performance score: 98/100</span>
              <span className={styles.cardTime}>2m ago</span>
            </div>
            <div className={styles.heroCard} style={{ animationDelay: "0.3s" }}>
              <div className={styles.cardDot} style={{ background: "#8b5cf6" }}></div>
              <span>Client onboarded ✓</span>
              <span className={styles.cardTime}>1h ago</span>
            </div>
            <div className={styles.heroBigStat}>
              <span className={styles.bigNumber}>150+</span>
              <span className={styles.bigLabel}>Projects Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className={styles.trustedSection}>
        <div className="container">
          <p className={styles.trustedLabel}>Trusted by leading companies</p>
          <div className={styles.trustedLogos}>
            {trustedBy.map((name) => (
              <span key={name} className={styles.trustedName}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section--sm">
        <div className="container">
          <div className="grid-4">
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">What We Do</span>
            <h2>Services Built for <span className="gradient-text">Scale</span></h2>
            <div className="divider"></div>
            <p>Everything your business needs to compete and win in the digital landscape.</p>
          </div>

          {services.length > 0 ? (
            <div className="grid-3">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceIcon}>
                    {service.serviceDetails?.icon || "⚙️"}
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>
                    {service.serviceDetails?.shortDescription ||
                      "Professional solutions tailored to your needs."}
                  </p>
                  {service.serviceDetails?.pricingTier && (
                    <span className={`badge badge-purple ${styles.pricingBadge}`}>
                      {service.serviceDetails.pricingTier}
                    </span>
                  )}
                  <span className={styles.serviceArrow}>→</span>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", background: "var(--neutral-800)", borderRadius: "var(--radius-lg)" }}>
              <p style={{ color: "var(--neutral-400)" }}>No services have been published yet.</p>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/services" className="btn btn-secondary">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.whyText}>
              <span className="eyebrow">Why ContentPress Co.</span>
              <h2>The Partner You've <span className="gradient-text">Been Looking For</span></h2>
              <div className="divider" style={{ margin: "1.25rem 0" }}></div>
              <p style={{ marginBottom: "2rem" }}>
                We combine technical depth with business acumen to deliver solutions
                that don't just look great — they perform.
              </p>
              {[
                ["End-to-End Expertise", "From strategy and design to deployment and analytics."],
                ["Transparent Communication", "Weekly progress reports and a dedicated account manager."],
                ["Agile & On-Time Delivery", "Sprint-based development that ships on schedule."],
              ].map(([title, desc]) => (
                <div key={title} className={styles.whyItem}>
                  <div className={styles.whyCheck}>✓</div>
                  <div>
                    <strong style={{ color: "var(--white)" }}>{title}</strong>
                    <p style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>{desc}</p>
                  </div>
                </div>
              ))}
              <Link href="/about" className="btn btn-primary" style={{ marginTop: "2rem" }}>
                Meet the Team →
              </Link>
            </div>
            <div className={styles.whyVisual}>
              <div className={styles.glowBox}>
                <div className={styles.glowInner}>
                  <span className={styles.glowBig}>98%</span>
                  <span className={styles.glowSub}>Client Retention Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Posts ── */}
      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Company News</span>
              <h2>Latest From <span className="gradient-text">Our Blog</span></h2>
              <div className="divider"></div>
            </div>
            <div className="grid-3">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postCard}>
                  {post.featuredImage?.node && (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      className={styles.postImage}
                    />
                  )}
                  <div className={styles.postBody}>
                    {post.categories?.nodes?.[0] && (
                      <span className="tag">{post.categories.nodes[0].name}</span>
                    )}
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <div
                      className={styles.postExcerpt}
                      dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                    />
                    <div className={styles.postMeta}>
                      <span>{post.author?.node?.name}</span>
                      <span>·</span>
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" className="btn btn-secondary">View All Posts →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className={`section--sm`}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaOrb}></div>
            <div className={styles.ctaContent}>
              <h2>Ready to Start Your Next Project?</h2>
              <p>Let's discuss how ContentPress Co. can help you achieve your digital goals.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className="btn btn-primary">Get a Free Quote →</Link>
                <Link href="/services" className="btn btn-secondary">See Our Work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
