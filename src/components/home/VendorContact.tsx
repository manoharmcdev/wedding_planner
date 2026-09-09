"use client";

import { Check, Lock, MessageCircle } from "lucide-react";
import { useState } from "react";

import { theme } from "@/config/theme";

interface VendorContactProps {
  instagram: string;
  whatsapp: string;
  contactLocked: boolean;
}

function InstagramIcon() {
  return (
    <span
      className="relative flex h-[17px] w-[17px] items-center justify-center rounded-[5px] border-[1.5px]"
      aria-hidden="true"
    >
      <span className="h-[7px] w-[7px] rounded-full border-[1.5px]" />
      <span className="absolute right-[2px] top-[2px] h-[3px] w-[3px] rounded-full bg-current" />
    </span>
  );
}

export default function VendorContact({
  instagram,
  whatsapp,
  contactLocked,
}: VendorContactProps) {
  const [unlocked, setUnlocked] = useState(!contactLocked);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = () => {
    setPaymentLoading(true);

    // Demo payment simulation.
    // Razorpay will be connected later.
    setTimeout(() => {
      setPaymentLoading(false);
      setUnlocked(true);
    }, 1500);
  };

  if (unlocked) {
    return (
      <div
        className="mt-5 rounded-xl p-4"
        style={{
          backgroundColor: "#F0FDF4",
          border: "1px solid #BBF7D0",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-white"
            style={{
              backgroundColor: theme.colors.success,
            }}
          >
            <Check size={13} strokeWidth={3} />
          </span>

          <span
            className="text-xs font-semibold"
            style={{
              color: theme.colors.success,
            }}
          >
            Contact details unlocked
          </span>
        </div>

        <p
          className="mt-2 text-xs leading-5"
          style={{
            color: theme.colors.mutedText,
          }}
        >
          You can now connect directly with this vendor.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <InstagramIcon />
            Instagram
          </a>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: theme.colors.success,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-5 rounded-xl p-4"
      style={{
        backgroundColor: theme.colors.primaryLight,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <div className="flex items-center gap-2">
        <Lock
          size={16}
          style={{
            color: theme.colors.primary,
          }}
        />

        <span
          className="text-sm font-semibold"
          style={{
            color: theme.colors.text,
          }}
        >
          Contact details are private
        </span>
      </div>

      <p
        className="mt-2 text-xs leading-5"
        style={{
          color: theme.colors.mutedText,
        }}
      >
        Unlock the contact details to connect directly with this vendor on
        Instagram or WhatsApp.
      </p>

      <button
        type="button"
        onClick={handlePayment}
        disabled={paymentLoading}
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        {paymentLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Processing...
          </>
        ) : (
          <>
            <Lock size={14} />
            Pay & Unlock Contact
          </>
        )}
      </button>
    </div>
  );
}