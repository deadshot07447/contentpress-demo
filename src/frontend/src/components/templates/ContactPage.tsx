import React from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage({ data }: { data?: any }) {
  const acf = data?.acfFields || {};
  const headline = acf.headline || "Start Your Next <span class=\"gradient-text\">Project With Us</span>";
  const subhead = acf.subhead || "Tell us about your goals and we'll put together a tailored proposal — no commitment required.";

  return (
    <>
      <section className="relative text-center py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container">
          <span className="badge badge-blue">Get In Touch</span>
          <h1 className="my-5 mb-4" dangerouslySetInnerHTML={{ __html: headline }} />
          <p className="text-lg max-w-[540px] mx-auto">
            {subhead}
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
