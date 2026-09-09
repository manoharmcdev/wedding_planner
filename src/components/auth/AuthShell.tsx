"use client";

import Link from "next/link";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { theme } from "@/config/theme";

interface AuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
}

export default function AuthShell({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerHref,
}: AuthShellProps) {
  return (
    <main
      className="relative min-h-[calc(100vh-80px)] overflow-hidden py-10 sm:py-16"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Decorative shapes */}
      <div
        className="absolute -left-32 -top-24 h-80 w-80 rounded-full opacity-50"
        style={{
          backgroundColor: theme.colors.primaryLight,
        }}
      />

      <div
        className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-40"
        style={{
          backgroundColor: theme.colors.secondary,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <div className="hidden lg:block">
          <div className="max-w-lg">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            >
              <Heart size={25} fill="currentColor" />
            </div>

            <h1
              className="mt-7 font-display text-5xl leading-tight"
              style={{
                color: theme.colors.text,
              }}
            >
              Your wedding journey,
              <span
                className="block"
                style={{
                  color: theme.colors.primary,
                }}
              >
                all in one place.
              </span>
            </h1>

            <p
              className="mt-5 text-base leading-7"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Sign in to save your favourite vendors, manage your
              enquiries and continue planning your perfect celebration.
            </p>

            <div className="mt-8 space-y-4">
              <Feature
                icon={<Sparkles size={18} />}
                text="Save vendors you love"
              />

              <Feature
                icon={<ShieldCheck size={18} />}
                text="Secure account and payments"
              />

              <Feature
                icon={<Heart size={18} />}
                text="Keep your wedding planning organized"
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div
          className="mx-auto w-full max-w-md rounded-3xl border bg-white p-6 shadow-xl sm:p-8"
          style={{
            borderColor: theme.colors.border,
          }}
        >
          {/* Mobile logo */}
          <div className="mb-7 flex items-center justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-semibold text-white"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                W
              </span>

              <span
                className="font-display text-2xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                {theme.brand.name}
              </span>
            </Link>
          </div>

          <div className="text-center">
            <h2
              className="font-display text-3xl sm:text-4xl"
              style={{
                color: theme.colors.text,
              }}
            >
              {title}
            </h2>

            <p
              className="mt-3 text-sm leading-6"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              {description}
            </p>
          </div>

          <div className="mt-7">{children}</div>

          <div
            className="mt-7 border-t pt-6 text-center text-sm"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.mutedText,
            }}
          >
            {footerText}{" "}
            <Link
              href={footerHref}
              className="font-semibold"
              style={{
                color: theme.colors.primary,
              }}
            >
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Feature({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: theme.colors.primaryLight,
          color: theme.colors.primary,
        }}
      >
        {icon}
      </span>

      <span
        className="text-sm font-medium"
        style={{
          color: theme.colors.text,
        }}
      >
        {text}
      </span>
    </div>
  );
}