"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const contactInfo = [
  { icon: "📍", label: "Our Office", value: "123 Tech Avenue, Suite 400\nSan Francisco, CA 94105" },
  { icon: "📧", label: "Email Us", value: "hello@contentpress.co" },
  { icon: "📞", label: "Call Us", value: "+1 (415) 555-0192" },
  { icon: "🕐", label: "Office Hours", value: "Mon – Fri, 9am – 6pm PST" },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    
    const result = await submitContactForm(form);

    if (result.success) {
      setStatus("success");
    } else {
      console.error(result.error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-32 px-6 flex flex-col items-center gap-6 max-w-[500px] mx-auto">
        <div className="text-6xl animate-[float_5s_ease-in-out_infinite]">🎉</div>
        <h2 className="text-[2rem] font-bold text-white">Thank You, {form.name.split(" ")[0]}!</h2>
        <p className="text-base text-neutral-400">
          We've received your inquiry and will get back to you within 1 business day.
          Check your inbox at <strong className="text-white">{form.email}</strong> for a confirmation.
        </p>
        <button
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[15px] font-semibold transition-all bg-transparent text-white border-[1.5px] border-neutral-600 hover:border-brand-400 hover:text-brand-300 hover:bg-brand-500/10 hover:-translate-y-0.5"
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-32 px-6 flex flex-col items-center gap-6 max-w-[500px] mx-auto">
        <div className="text-6xl animate-[float_5s_ease-in-out_infinite]">❌</div>
        <h2 className="text-[2rem] font-bold text-white">Oops, something went wrong.</h2>
        <p className="text-base text-neutral-400">We couldn't send your message. Please try again later.</p>
        <button 
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[15px] font-semibold transition-all bg-transparent text-white border-[1.5px] border-neutral-600 hover:border-brand-400 hover:text-brand-300 hover:bg-brand-500/10 hover:-translate-y-0.5"
          onClick={() => setStatus("idle")}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
      {/* Contact Info */}
      <div className="lg:sticky top-[104px] p-10 bg-brand-800 border border-neutral-800 rounded-3xl">
        <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s Talk Business</h2>
        <p className="text-[15px] text-neutral-500 leading-relaxed mb-8">
          Have a project in mind? Fill in the form and our team will get back to you
          within 24 hours with a tailored proposal.
        </p>
        <div className="flex flex-col gap-6">
          {contactInfo.map((item) => (
            <div key={item.label} className="flex gap-4 items-start">
              <span className="text-xl w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center shrink-0">
                {item.icon}
              </span>
              <div>
                <p className="text-[13px] font-bold text-neutral-400 tracking-wider uppercase mb-1">
                  {item.label}
                </p>
                <p className="text-[15px] text-neutral-300 leading-relaxed whitespace-pre-line">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form className="p-10 bg-brand-800 border border-neutral-800 rounded-3xl flex flex-col gap-6" onSubmit={handleSubmit} noValidate id="contact-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-semibold text-neutral-300">
              Full Name <span className="text-danger ml-0.5">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-brand-900 border-[1.5px] ${errors.name ? 'border-danger focus:border-danger focus:ring-danger/15' : 'border-neutral-700 focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15'} rounded-xl text-white font-body text-[15px] transition-all outline-none placeholder:text-neutral-600`}
            />
            {errors.name && <span className="text-[13px] text-danger mt-1">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-semibold text-neutral-300">
              Email Address <span className="text-danger ml-0.5">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-brand-900 border-[1.5px] ${errors.email ? 'border-danger focus:border-danger focus:ring-danger/15' : 'border-neutral-700 focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15'} rounded-xl text-white font-body text-[15px] transition-all outline-none placeholder:text-neutral-600`}
            />
            {errors.email && <span className="text-[13px] text-danger mt-1">{errors.email}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-semibold text-neutral-300">
            Your Message <span className="text-danger ml-0.5">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Tell us about your project, goals, and timeline..."
            value={form.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-brand-900 border-[1.5px] ${errors.message ? 'border-danger focus:border-danger focus:ring-danger/15' : 'border-neutral-700 focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15'} rounded-xl text-white font-body text-[15px] transition-all outline-none placeholder:text-neutral-600 resize-y min-h-[130px] leading-relaxed`}
          />
          {errors.message && <span className="text-[13px] text-danger mt-1">{errors.message}</span>}
        </div>

        <button
          type="submit"
          id="contact-submit"
          className="w-full justify-center py-3.5 px-7 text-base rounded-full font-semibold transition-all flex items-center gap-2 bg-gradient-to-br from-brand-500 to-accent-500 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span> Sending...
            </>
          ) : (
            "Send Message →"
          )}
        </button>
      </form>
    </div>
  );
}
