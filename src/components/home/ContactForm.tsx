"use client";

import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import { theme } from "@/config/theme";
import Reveal from "@/components/common/Reveal";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ backgroundColor: theme.colors.primaryLight }}
    >
      {/* Decorative elements */}
      <div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30"
        style={{ backgroundColor: theme.colors.secondary }}
      />

      <div
        className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full opacity-30"
        style={{ backgroundColor: theme.colors.secondary }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* Left content */}
          <Reveal direction="left">
            <div className="max-w-xl">
              <span
                className="inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.primary,
                  backgroundColor: theme.colors.card,
                }}
              >
                Let&apos;s plan together
              </span>

              <h2
                className="mt-5 font-display text-4xl leading-tight sm:text-5xl"
                style={{ color: theme.colors.text }}
              >
                Have questions?
                <br />
                <span style={{ color: theme.colors.primary }}>
                  We&apos;re here to help.
                </span>
              </h2>

              <p
                className="mt-5 max-w-lg text-base leading-7"
                style={{ color: theme.colors.mutedText }}
              >
                Tell us what you are looking for and our team will help you
                find the right wedding vendors for your special day.
              </p>

              <div className="mt-8 space-y-4">
                <ContactInfo
                  icon={<MessageSquare size={18} />}
                  title="Tell us about your wedding"
                  description="Share your requirements and preferences."
                />

                <ContactInfo
                  icon={<Phone size={18} />}
                  title="Get guidance"
                  description="We can help you choose the right vendors."
                />

                <ContactInfo
                  icon={<Mail size={18} />}
                  title="Stay connected"
                  description="Send us your questions and requirements."
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" delay={150}>
            <div
              className="rounded-3xl border bg-white p-6 shadow-xl sm:p-8"
              style={{ borderColor: theme.colors.border }}
            >
              {submitted ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: theme.colors.primaryLight,
                      color: theme.colors.primary,
                    }}
                  >
                    <Send size={26} />
                  </div>

                  <h3
                    className="mt-6 font-display text-3xl"
                    style={{ color: theme.colors.text }}
                  >
                    Thank you!
                  </h3>

                  <p
                    className="mt-3 max-w-md text-sm leading-6"
                    style={{ color: theme.colors.mutedText }}
                  >
                    Your enquiry has been submitted successfully. Our team
                    will get back to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{ color: theme.colors.primary }}
                    >
                      Contact us
                    </p>

                    <h3
                      className="mt-2 font-display text-3xl"
                      style={{ color: theme.colors.text }}
                    >
                      Tell us what you need
                    </h3>

                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: theme.colors.mutedText }}
                    >
                      Fill out the form and we&apos;ll help you with your
                      wedding planning.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormInput
                        label="Full name"
                        placeholder="Your name"
                        required
                      />

                      <FormInput
                        label="Phone number"
                        placeholder="Your phone number"
                        type="tel"
                        required
                      />
                    </div>

                    <FormInput
                      label="Email address"
                      placeholder="you@example.com"
                      type="email"
                      required
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormInput
                        label="Wedding date"
                        type="date"
                      />

                      <FormInput
                        label="Location"
                        placeholder="Wedding location"
                      />
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-xs font-semibold"
                        style={{ color: theme.colors.text }}
                      >
                        What are you looking for?
                      </label>

                      <select
                        className="h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: theme.colors.border,
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="photography">
                          Photography
                        </option>
                        <option value="makeup">
                          Makeup
                        </option>
                        <option value="venue">
                          Wedding Venue
                        </option>
                        <option value="decor">
                          Decoration
                        </option>
                        <option value="mehndi">
                          Mehndi
                        </option>
                        <option value="catering">
                          Catering
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-xs font-semibold"
                        style={{ color: theme.colors.text }}
                      >
                        Message
                      </label>

                      <textarea
                        rows={5}
                        placeholder="Tell us about your wedding requirements..."
                        className="w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: theme.colors.border,
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{
                        backgroundColor: theme.colors.primary,
                      }}
                    >
                      Send Enquiry
                      <Send size={17} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: theme.colors.card,
          color: theme.colors.primary,
        }}
      >
        {icon}
      </div>

      <div>
        <h4
          className="text-sm font-semibold"
          style={{ color: theme.colors.text }}
        >
          {title}
        </h4>

        <p
          className="mt-1 text-sm leading-5"
          style={{ color: theme.colors.mutedText }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="mb-2 block text-xs font-semibold"
        style={{ color: theme.colors.text }}
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all focus:ring-2"
        style={{
          borderColor: theme.colors.border,
        }}
      />
    </div>
  );
}