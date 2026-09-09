"use client";

import {
  Check,
  ChevronRight,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { theme } from "@/config/theme";

interface ContactUnlockCardProps {
  vendorName: string;
}

export default function ContactUnlockCard({
  vendorName,
}: ContactUnlockCardProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setUnlocked(true);
    }, 1500);
  };

  if (unlocked) {
    return (
      <div
        className="w-full overflow-hidden rounded-2xl border bg-white shadow-lg sm:rounded-3xl"
        style={{
          borderColor: "#BBF7D0",
        }}
      >
        <div
          className="p-5 sm:p-7"
          style={{
            backgroundColor: "#F0FDF4",
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
              style={{
                backgroundColor: theme.colors.success,
              }}
            >
              <Check
                size={18}
                strokeWidth={3}
              />
            </span>

            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  color: theme.colors.success,
                }}
              >
                Contact unlocked
              </p>

              <h2
                className="mt-1 break-words font-display text-2xl sm:text-3xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Connect with {vendorName}
              </h2>
            </div>
          </div>

          <p
            className="mt-4 text-sm leading-6"
            style={{
              color: theme.colors.mutedText,
            }}
          >
            Your payment was successful. You can now connect
            directly with this vendor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-7">
          <a
            href="#"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.primary,
            }}
          >
            <span className="text-lg font-bold">@</span>
            Instagram
          </a>

          <a
            href="#"
            className="flex h-12 w-full items-center justify-center rounded-2xl border text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.success,
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border bg-white shadow-lg sm:rounded-3xl"
      style={{
        borderColor: theme.colors.border,
      }}
    >
      {/* Header */}
      <div
        className="p-5 sm:p-7"
        style={{
          backgroundColor: theme.colors.primaryLight,
        }}
      >
        <div className="flex items-center gap-2">
          <Lock
            size={17}
            className="shrink-0"
            style={{
              color: theme.colors.primary,
            }}
          />

          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs"
            style={{
              color: theme.colors.primary,
            }}
          >
            Contact details
          </p>
        </div>

        <h2
          className="mt-2 break-words font-display text-2xl leading-tight sm:text-3xl"
          style={{
            color: theme.colors.text,
          }}
        >
          Connect with {vendorName}
        </h2>

        <p
          className="mt-3 text-sm leading-6"
          style={{
            color: theme.colors.mutedText,
          }}
        >
          Fill in your details and unlock direct Instagram
          and WhatsApp access after successful payment.
        </p>
      </div>

      {/* Form */}
      <div className="p-5 sm:p-7">
        <div className="space-y-4">
          <Input
            label="Full name"
            placeholder="Enter your name"
            required
          />

          <Input
            label="Phone number"
            placeholder="Enter your phone number"
            type="tel"
            required
          />

          <Input
            label="Email address"
            placeholder="Enter your email"
            type="email"
            required
          />

          <Input
            label="Wedding / function date"
            type="date"
          />

          <div>
            <label
              className="mb-2 block text-xs font-semibold"
              style={{
                color: theme.colors.text,
              }}
            >
              Requirements
            </label>

            <textarea
              rows={4}
              placeholder="Tell us about your wedding..."
              className="block w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm leading-6 outline-none transition-all focus:ring-2"
              style={{
                borderColor: theme.colors.border,
              }}
            />
          </div>

          {/* Security */}
          <div
            className="rounded-2xl border p-4"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
            }}
          >
            <div className="flex items-start gap-2">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0"
                style={{
                  color: theme.colors.success,
                }}
              />

              <div className="min-w-0">
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  Secure contact unlock
                </span>

                <p
                  className="mt-2 text-xs leading-5"
                  style={{
                    color: theme.colors.mutedText,
                  }}
                >
                  The payment is for unlocking the vendor&apos;s
                  direct contact details. Vendor service or
                  package payments are separate.
                </p>
              </div>
            </div>
          </div>

          {/* Payment button */}
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-wait disabled:opacity-80"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                <span>
                  Processing payment...
                </span>
              </>
            ) : (
              <>
                <span>Pay &amp; Unlock Contact</span>

                <ChevronRight
                  size={17}
                  className="shrink-0"
                />
              </>
            )}
          </button>

          <p
            className="text-center text-[11px] leading-5"
            style={{
              color: theme.colors.mutedText,
            }}
          >
            Instagram and WhatsApp are available only after
            successful payment verification.
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({
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
    <div className="min-w-0">
      <label
        className="mb-2 block text-xs font-semibold"
        style={{
          color: theme.colors.text,
        }}
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="block h-11 w-full min-w-0 rounded-2xl border bg-white px-4 text-sm outline-none transition-all focus:ring-2 sm:h-12"
        style={{
          borderColor: theme.colors.border,
        }}
      />
    </div>
  );
}