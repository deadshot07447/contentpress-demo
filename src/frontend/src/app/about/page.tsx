import { apolloClient } from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/lib/queries";
import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ContentPress Co. — our mission, values, and the talented team behind the work.",
};

async function getAboutPage() {
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: "about" },
    });
    return (data as any)?.page ?? null;
  } catch {
    return null;
  }
}

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", emoji: "👩‍💼", bio: "10+ years driving digital strategy for Fortune 500 clients." },
  { name: "Marcus Johnson", role: "CTO", emoji: "👨‍💻", bio: "Former AWS solutions architect and open-source contributor." },
  { name: "Priya Patel", role: "Head of Design", emoji: "👩‍🎨", bio: "Award-winning UX designer with a passion for accessible interfaces." },
  { name: "David Kim", role: "Lead Engineer", emoji: "🧑‍🔬", bio: "Full-stack expert specialising in Next.js and cloud-native apps." },
  { name: "Lisa Torres", role: "Marketing Director", emoji: "📣", bio: "Growth hacker turned strategic marketer with a data-first approach." },
  { name: "James Wright", role: "Cloud Architect", emoji: "☁️", bio: "Certified AWS Professional with 8+ years of infrastructure experience." },
];

const values = [
  { icon: "🎯", title: "Results-Driven", desc: "Every decision we make is tied to your business outcomes." },
  { icon: "🤝", title: "Partnership First", desc: "We treat your business as our own." },
  { icon: "⚡", title: "Agile Delivery", desc: "Sprint-based delivery means you see progress every week." },
  { icon: "🔒", title: "Security & Quality", desc: "Best-in-class security practices baked into everything we ship." },
];

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className="container">
          <div className={styles.heroBadge}>
            <span className="badge badge-blue">Our Story</span>
          </div>
          <h1>
            We&apos;re Building the Future of{" "}
            <span className="gradient-text">Digital Business</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Founded in 2012, ContentPress Co. has grown from a two-person consultancy to
            a 40+ person digital powerhouse serving clients across 20+ countries.
          </p>
        </div>
      </section>

      {/* CMS Content (if available) */}
      {page?.content && (
        <section className="section--sm">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </section>
      )}

      {/* Mission */}
      <section className="section--sm">
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionText}>
              <span className="eyebrow">Our Mission</span>
              <h2>Empowering Businesses Through <span className="gradient-text">Technology</span></h2>
              <div className="divider" style={{ margin: "1.25rem 0" }}></div>
              <p>
                We believe every business deserves access to enterprise-grade digital
                solutions. Our mission is to close the gap between ambition and
                execution — giving companies of all sizes the tools, talent, and
                strategy to compete and win online.
              </p>
            </div>
            <div className={styles.missionStats}>
              {[
                { n: "2012", l: "Founded" },
                { n: "40+", l: "Team Members" },
                { n: "20+", l: "Countries Served" },
                { n: "$50M+", l: "Revenue Generated for Clients" },
              ].map((s) => (
                <div key={s.l} className={styles.missionStat}>
                  <span className={styles.missionNum}>{s.n}</span>
                  <span className={styles.missionLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Core Values</span>
            <h2>What We <span className="gradient-text">Stand For</span></h2>
            <div className="divider"></div>
          </div>
          <div className="grid-4">
            {values.map((v) => (
              <div key={v.title} className="card" style={{ textAlign: "center" }}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h4 style={{ marginBottom: "0.5rem" }}>{v.title}</h4>
                <p style={{ fontSize: "0.9rem" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">The Team</span>
            <h2>Meet the People Behind <span className="gradient-text">ContentPress Co.</span></h2>
            <div className="divider"></div>
          </div>
          <div className="grid-3">
            {team.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{member.emoji}</div>
                <div className={styles.teamInfo}>
                  <h4 className={styles.teamName}>{member.name}</h4>
                  <span className={styles.teamRole}>{member.role}</span>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
