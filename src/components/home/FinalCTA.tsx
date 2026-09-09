import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import Reveal from "@/components/common/Reveal";
import { theme } from "@/config/theme";

export default function FinalCTA() {
  return (
    <section
      className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal direction="up" distance={60}>
          <div
            className="relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          >
            {/* Decorative circles */}
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full border"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />

            <div
              className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full border"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />

            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                backgroundColor:
                  theme.colors.primaryDark,
                opacity: 0.35,
              }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-3xl">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.14)",
                }}
              >
                <Heart
                  size={25}
                  fill="currentColor"
                  className="text-white"
                />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                Start planning
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Your perfect wedding
                <br />
                starts here
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                Discover beautiful wedding vendors, explore
                their work and connect with the right
                professionals for your celebration.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/vendors"
                  className="group flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    color: theme.colors.primary,
                  }}
                >
                  Explore Vendors

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/categories"
                  className="flex h-12 items-center justify-center rounded-full border px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.35)",
                  }}
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}