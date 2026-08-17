import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ContentPress Co. Tell us about your project and we'll respond within 1 business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative text-center py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container">
          <span className="badge badge-blue">Get In Touch</span>
          <h1 className="my-5 mb-4">
            Start Your Next <span className="gradient-text">Project With Us</span>
          </h1>
          <p className="text-lg max-w-[540px] mx-auto">
            Tell us about your goals and we&apos;ll put together a tailored proposal —
            no commitment required.
          </p>
        </div>
      </section>

      <section className="section--sm">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
