import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import Reveal from "@/components/common/Reveal";
import VendorCardLink from "@/components/home/VendorCardLink";
import { getFeaturedVendors } from "@/services/vendorService";
import { theme } from "@/config/theme";

export default async function FeaturedVendors() {
  const vendors = await getFeaturedVendors();

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal direction="left">
            <div>
              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]"
                style={{
                  color: theme.colors.primary,
                }}
              >
                Handpicked for you
              </p>

              <h2
                className="font-display text-4xl leading-tight sm:text-5xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Meet our
                <span
                  className="block italic"
                  style={{
                    color: theme.colors.primary,
                  }}
                >
                  featured vendors
                </span>
              </h2>

              <p
                className="mt-5 max-w-2xl text-base leading-7"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                Discover trusted wedding professionals who can make
                every moment of your celebration beautiful and memorable.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <Link
              href="/vendors"
              className="group hidden items-center gap-2 text-sm font-semibold lg:flex"
              style={{
                color: theme.colors.primary,
              }}
            >
              View all vendors

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Vendor cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vendors.slice(0, 4).map((vendor, index) => {
            const direction =
              index % 2 === 0 ? "left" : "right";

            return (
              <Reveal
                key={vendor.id}
                direction={direction}
                delay={index * 100}
                distance={70}
                className="h-full"
              >
                <article
                  className="group flex h-full flex-col overflow-hidden bg-white"
                  style={{
                    borderRadius: theme.borderRadius.card,
                    border: `1px solid ${theme.colors.border}`,
                    boxShadow:
                      "0 12px 35px rgba(41, 37, 36, 0.07)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={vendor.coverImage}
                      alt={vendor.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/10" />

                    {/* Verified */}
                    {vendor.verified && (
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm">
                        <BadgeCheck
                          size={15}
                          style={{
                            color: theme.colors.primary,
                          }}
                        />
                        Verified
                      </div>
                    )}

                    {/* Favorite */}
                    <button
                      type="button"
                      aria-label={`Add ${vendor.name} to favorites`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.8}
                        style={{
                          color: theme.colors.primary,
                        }}
                      />
                    </button>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-sm">
                      <Star
                        size={15}
                        fill="currentColor"
                        style={{
                          color: theme.colors.gold,
                        }}
                      />

                      <span className="text-sm font-semibold">
                        {vendor.rating}
                      </span>

                      <span
                        className="text-xs"
                        style={{
                          color: theme.colors.mutedText,
                        }}
                      >
                        ({vendor.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <p
                      className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{
                        color: theme.colors.primary,
                      }}
                    >
                      {vendor.category}
                    </p>

                    <h3
                      className="font-display text-2xl leading-tight"
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      {vendor.name}
                    </h3>

                    <div
                      className="mt-3 flex items-center gap-2 text-sm"
                      style={{
                        color: theme.colors.mutedText,
                      }}
                    >
                      <MapPin size={16} />
                      <span>{vendor.location}</span>
                    </div>

                    <div className="mt-auto pt-6">
                      <VendorCardLink
                        href={`/vendors/${vendor.slug}`}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <Reveal direction="up" delay={250}>
          <div className="mt-10 text-center lg:hidden">
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: theme.colors.primary,
                color: theme.colors.primary,
              }}
            >
              View all vendors
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}