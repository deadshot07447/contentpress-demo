import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ContentPress Co. — Digital Solutions for Modern Businesses",
    template: "%s | ContentPress Co.",
  },
  description:
    "ContentPress Co. delivers cutting-edge web development, cloud solutions, and digital marketing services that drive real business results.",
  keywords: ["web development", "cloud solutions", "digital marketing", "AWS", "Next.js"],
  openGraph: {
    type: "website",
    siteName: "ContentPress Co.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <main style={{ minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
