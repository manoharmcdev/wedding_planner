"use client";

import {
  Camera,
  Check,
  ChevronRight,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

import { theme } from "@/config/theme";
import {
  isContactUnlocked,
  saveContactUnlock,
} from "@/services/contactUnlockService";
import type { Vendor } from "@/types/vendor";

interface ContactUnlockCardProps {
  vendor: Vendor;
}

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  weddingDate: string;
  requirements: string;
}

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  weddingDate: "",
  requirements: "",
};

export default function ContactUnlockCard({
  vendor,
}: ContactUnlockCardProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [form, setForm] =
    useState<ContactForm>(initialForm);

  /*
   * Check existing demo unlock when vendor changes.
   */
  useEffect(() => {
    setUnlocked(isContactUnlocked(vendor.id));
  }, [vendor.id]);

  function updateField(
    field: keyof ContactForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleUnlock() {
    if (processing || unlocked) {
      return;
    }

    setProcessing(true);

    /*
     * DEMO PAYMENT FLOW
     *
     * This will later be replaced with:
     *
     * 1. Create enquiry
     * 2. Create Razorpay order through Node.js
     * 3. Open Razorpay Checkout
     * 4. Verify payment on Node.js
     * 5. Save payment
     * 6. Authorize contact access
     * 7. Return protected vendor contact details
     */

    window.setTimeout(() => {
      saveContactUnlock(vendor.id);

      setProcessing(false);
      setUnlocked(true);
    }, 1500);
  }

  return (
    <div
      className="overflow-hidden rounded-3xl border bg-white shadow-sm"
      style={{
        borderColor: theme.colors.border,
      }}
    >
      {/* Header */}
      <div
        className="p-5 sm:p-6"
        style={{
          background:
            "linear-gradient(135deg, #fff 0%, #F9E8ED 100%)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: theme.colors.primary,
              color: "#FFFFFF",
            }}
          >
            {unlocked ? (
              <Check size={21} />
            ) : (
              <LockKeyhole size={20} />
            )}
          </div>

          <div className="min-w-0">
            <h2
              className="font-serif text-xl font-semibold"
              style={{ color: theme.colors.text }}
            >
              {unlocked
                ? "Contact Unlocked"
                : "Contact Vendor"}
            </h2>

            <p
              className="mt-1 text-sm leading-6"
              style={{ color: theme.colors.mutedText }}
            >
              {unlocked
                ? `You can now contact ${vendor.name}.`
                : "Send your requirements and unlock the vendor's contact details."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {!unlocked ? (
          <>
            {/* Contact Form */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: theme.colors.text }}
                >
                  Full Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value,
                    )
                  }
                  placeholder="Enter your name"
                  className="h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: theme.colors.text }}
                >
                  Phone Number
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value,
                    )
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: theme.colors.text }}
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value,
                    )
                  }
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="wedding-date"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: theme.colors.text }}
                >
                  Wedding / Function Date
                </label>

                <input
                  id="wedding-date"
                  type="date"
                  value={form.weddingDate}
                  onChange={(event) =>
                    updateField(
                      "weddingDate",
                      event.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: theme.colors.text }}
                >
                  Requirements
                </label>

                <textarea
                  id="requirements"
                  value={form.requirements}
                  onChange={(event) =>
                    updateField(
                      "requirements",
                      event.target.value,
                    )
                  }
                  placeholder="Tell the vendor about your requirements..."
                  rows={4}
                  className="w-full resize-none rounded-xl border bg-white px-3.5 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>
            </div>

            {/* Security */}
            <div
              className="mt-5 flex gap-3 rounded-2xl border p-4"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: "#FFFCFA",
              }}
            >
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0"
                style={{ color: theme.colors.success }}
              />

              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  Your information is protected
                </p>

                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: theme.colors.mutedText }}
                >
                  Your details are shared securely with the
                  vendor only for your enquiry.
                </p>
              </div>
            </div>

            {/* Unlock Fee */}
            <div
              className="mt-5 flex items-center justify-between rounded-2xl border p-4"
              style={{
                borderColor: theme.colors.border,
              }}
            >
              <div>
                <p
                  className="text-xs"
                  style={{ color: theme.colors.mutedText }}
                >
                  Contact unlock
                </p>

                <p
                  className="mt-1 text-lg font-bold"
                  style={{ color: theme.colors.text }}
                >
                  ₹99
                </p>
              </div>

              <div
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: theme.colors.mutedText }}
              >
                <ShieldCheck size={15} />
                Secure payment
              </div>
            </div>

            {/* Payment Button */}
            <button
              type="button"
              onClick={handleUnlock}
              disabled={processing}
              className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-80"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            >
              {processing ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Processing Payment...
                </>
              ) : (
                <>
                  Pay & Unlock Contact
                  <ChevronRight size={18} />
                </>
              )}
            </button>

            <p
              className="mt-3 text-center text-[11px] leading-5"
              style={{ color: theme.colors.mutedText }}
            >
              This is a marketplace contact-unlock fee.
              Vendor service/package pricing is separate.
            </p>
          </>
        ) : (
          <>
            {/* Success */}
            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: "#B7E4C7",
                backgroundColor: "#F2FBF5",
              }}
            >
              <div className="flex gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: theme.colors.success,
                    color: "#FFFFFF",
                  }}
                >
                  <Check size={18} />
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    Contact details unlocked
                  </p>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: theme.colors.mutedText }}
                  >
                    You can now connect with {vendor.name}
                    directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="mt-5 space-y-3">
              <a
                href={vendor.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
              >
                <Camera size={18} />
                Instagram
              </a>

              <a
                href={`https://wa.me/${vendor.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  backgroundColor: theme.colors.success,
                }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

              {/* Access Information */}
              <div
                className="rounded-2xl border p-4"
                style={{
                  borderColor: theme.colors.border,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: theme.colors.primary }}
                >
                  Contact access
                </p>

                <div className="mt-3 space-y-3">
                  <div
                    className="flex items-center gap-3 text-sm"
                    style={{ color: theme.colors.mutedText }}
                  >
                    <Phone size={16} />
                    <span>WhatsApp contact available</span>
                  </div>

                  <div
                    className="flex items-center gap-3 text-sm"
                    style={{ color: theme.colors.mutedText }}
                  >
                    <Mail size={16} />
                    <span>Contact through vendor profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div
              className="mt-5 flex items-center gap-2 text-xs"
              style={{ color: theme.colors.mutedText }}
            >
              <ShieldCheck size={15} />
              Payment verified · Contact access granted
            </div>
          </>
        )}
      </div>
    </div>
  );
}