import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "40+", label: "Team Members" },
];

const trustedBy = ["TechFlow", "NovaCorp", "Apex Labs", "BlueSky Inc.", "Meridian", "PulseIO"];

export default function HomePage({ data }: { data?: any }) {
  // If we have ACF data from WordPress, use it! Otherwise fallback to defaults.
  const acf = data?.acfFields || {};
  const heroHeading = acf.heroHeadline || "We Build Digital Experiences That Drive Growth";
  const heroSubtitle = acf.heroSubtitle || "ContentPress Co. is your full-service digital partner — delivering world-class web development, cloud infrastructure, and marketing strategies that produce real, measurable results.";
  
  // Note: Services and Posts would ideally be fetched dynamically via GraphQL,
  // but for the template mapping we'll pass them in or use empty arrays for now.
  const services = data?.services || [];
  const posts = data?.posts || [];

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
            <h1 className={styles.heroHeading} dangerouslySetInnerHTML={{ __html: heroHeading }} />
            <p className={styles.heroSubtitle}>
              {heroSubtitle}
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
    </>
  );
}
