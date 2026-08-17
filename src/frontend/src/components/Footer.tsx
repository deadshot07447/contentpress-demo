import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Web Development", href: "/services" },
    { label: "Cloud Solutions", href: "/services" },
    { label: "Digital Marketing", href: "/services" },
    { label: "Consulting", href: "/services" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow}></div>
      <div className="container">
        {/* Top */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <span className={styles.logoIcon}>CP</span>
              <span className={styles.logoText}>ContentPress Co.</span>
            </div>
            <p className={styles.tagline}>
              Building digital experiences that elevate your brand and drive
              measurable business growth.
            </p>
            <div className={styles.socials}>
              {["𝕏", "in", "f", "⌘"].map((icon, i) => (
                <a key={i} href="#" className={styles.socialBtn} aria-label="Social">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>{group}</h4>
              <ul className={styles.linkList}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} ContentPress Co. All rights reserved.
          </p>
          <p className={styles.poweredBy}>
            Powered by{" "}
            <span className="gradient-text" style={{ fontWeight: 600 }}>
              WordPress + Next.js + AWS
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
