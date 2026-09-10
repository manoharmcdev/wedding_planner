"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { theme } from "@/config/theme";
import { getFeaturedVendors } from "@/services/vendorService";
import type { Vendor } from "@/types/vendor";
import LoadingLink from "@/components/common/LoadingLink";
import FavoriteButton from "../vendor/FavoriteButton";
import VendorCardLink from "./VendorCardLink";

export default function FeaturedVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadVendors() {
      const data = await getFeaturedVendors();

      if (active) {
        setVendors(data);
        setLoading(false);
      }
    }

    loadVendors();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />
            <div className="mt-4 h-10 w-72 animate-pulse rounded bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
              >
                <div className="aspect-[4/3] animate-pulse bg-stone-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (vendors.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.colors.primary }}
          >
            Handpicked Vendors
          </p>

          <h2
            className="mt-3 font-serif text-3xl font-semibold sm:text-4xl"
            style={{ color: theme.colors.text }}
          >
            Featured Wedding Vendors
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base"
            style={{ color: theme.colors.mutedText }}
          >
            Discover trusted wedding professionals who can make your celebration
            beautiful and memorable.
          </p>
        </div>

        {/* Vendor cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vendors.slice(0, 8).map((vendor) => (
            <article
              key={vendor.id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderColor: theme.colors.border,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Link
                  href={`/vendors/${vendor.slug}`}
                  className="block h-full w-full"
                >
                  <Image
                    src={vendor.coverImage}
                    alt={vendor.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </Link>

                {/* Verified */}
                {vendor.verified && (
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm">
                    <BadgeCheck
                      size={15}
                      style={{
                        color: theme.colors.success,
                      }}
                    />
                    Verified
                  </div>
                )}

                {/* Favorite */}
                <div className="absolute right-4 top-4">
                  <FavoriteButton
                    vendorId={vendor.id}
                    vendorName={vendor.name}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3
                      className="truncate text-lg font-semibold"
                      style={{ color: theme.colors.text }}
                    >
                      {vendor.name}
                    </h3>

                    <p
                      className="mt-1 text-sm"
                      style={{ color: theme.colors.mutedText }}
                    >
                      {vendor.category}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                    <Star
                      size={15}
                      fill="currentColor"
                      style={{ color: theme.colors.gold }}
                    />
                    <span style={{ color: theme.colors.text }}>
                      {vendor.rating}
                    </span>
                  </div>
                </div>

                <div
                  className="mt-3 flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.mutedText }}
                >
                  <MapPin size={15} />
                  <span>{vendor.location}</span>
                </div>

                <div
                  className="mt-2 flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.mutedText }}
                >
                  <Heart size={15} />
                  <span>{vendor.reviewCount} reviews</span>
                </div>
                
                {/* View Vendor */}
                <div className="mt-5">
                  {/* <LoadingLink
                    href={`/vendors/${vendor.slug}`}
                    className="h-12 w-full rounded-xl font-semibold text-white hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      backgroundColor: theme.colors.primary,
                    }}
                  >
                    View Vendor
                  </LoadingLink> */}
                  <VendorCardLink href={`/vendors/${vendor.slug}`} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile / bottom CTA */}
        <div className="mt-10 flex justify-center">
          <LoadingLink
            href="/vendors"
            className="h-12 rounded-full border px-7 font-semibold"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
            }}
          >
            Explore All Vendors
          </LoadingLink>
        </div>
      </div>
    </section>
  );
}
