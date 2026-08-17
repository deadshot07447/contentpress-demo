import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - var(--nav-height) - 200px)",
        textAlign: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      <span style={{ fontSize: "5rem" }}>🔍</span>
      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          background: "linear-gradient(135deg, var(--brand-400), var(--accent-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Page Not Found
      </h1>
      <p style={{ color: "var(--neutral-500)", maxWidth: "400px" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">Go Home →</Link>
        <Link href="/contact" className="btn btn-secondary">Contact Us</Link>
      </div>
    </div>
  );
}
