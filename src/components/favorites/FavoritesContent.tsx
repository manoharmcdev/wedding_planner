"use client";

import {
  ArrowRight,
  Heart,
  MapPin,
  Star,
  Trash2,
  Verified,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import LoadingLink from "@/components/common/LoadingLink";
import Reveal from "@/components/common/Reveal";
import { theme } from "@/config/theme";
import {
  getFavoriteVendors,
  removeFavorite,
} from "@/services/favoriteService";
import type { Vendor } from "@/types/vendor";

export default function FavoritesContent() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    setLoading(true);

    try {
      const favoriteVendors = await getFavoriteVendors();
      setVendors(favoriteVendors);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  function handleRemove(vendorId: string) {
    removeFavorite(vendorId);

    setVendors((current) =>
      current.filter((vendor) => vendor.id !== vendorId),
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7]">
      {/* Header */}
      <section className="border-b border-[#eadfd9] bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10">
          <Reveal direction="up">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div
                  className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor: theme.colors.primaryLight,
                    color: theme.colors.primaryDark,
                  }}
                >
                  <Heart size={14} fill="currentColor" />
                  Saved Vendors
                </div>

                <h1 className="font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
                  My Favorites
                </h1>

                <p className="mt-2 max-w-[600px] text-sm leading-6 text-stone-500 sm:text-base">
                  Keep track of the wedding vendors you love and
                  come back to them whenever you are ready.
                </p>
              </div>

              {!loading && vendors.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Heart
                    size={17}
                    style={{
                      color: theme.colors.primary,
                    }}
                  />

                  <span>
                    {vendors.length}{" "}
                    {vendors.length === 1
                      ? "vendor"
                      : "vendors"}{" "}
                    saved
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-[#eadfd9] bg-white"
              >
                <div className="h-[260px] animate-pulse bg-stone-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                  <div className="h-10 w-full animate-pulse rounded-xl bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && vendors.length === 0 && (
          <Reveal direction="up">
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#eadfd9] bg-white px-6 py-16 text-center">
              <div
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  backgroundColor: theme.colors.primaryLight,
                }}
              >
                <Heart
                  size={34}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              </div>

              <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
                No favorites yet
              </h2>

              <p className="mt-3 max-w-[500px] text-sm leading-6 text-stone-500 sm:text-base">
                Start exploring wedding vendors and save the
                ones you love. Your favorite vendors will appear
                here.
              </p>

              <LoadingLink
                href="/vendors"
                className="mt-7 h-12 rounded-full px-6 text-sm font-semibold text-white"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                Explore Vendors
                <ArrowRight size={16} className="ml-2" />
              </LoadingLink>
            </div>
          </Reveal>
        )}

        {/* Vendor cards */}
        {!loading && vendors.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor, index) => (
              <Reveal
                key={vendor.id}
                direction={
                  index % 3 === 0
                    ? "left"
                    : index % 3 === 1
                      ? "up"
                      : "right"
                }
                delay={index * 80}
              >
                <article className="group overflow-hidden rounded-2xl border border-[#eadfd9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Image */}
                  <div className="relative h-[260px] overflow-hidden">
                    <LoadingLink
                      href={`/vendors/${vendor.slug}`}
                      className="group/image block h-full w-full"
                    >
                      <Image
                        src={vendor.coverImage}
                        alt={vendor.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    </LoadingLink>

                    {/* Favorite */}
                    <button
                      type="button"
                      aria-label={`Remove ${vendor.name} from favorites`}
                      onClick={() =>
                        handleRemove(vendor.id)
                      }
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#b23a5b] shadow-md backdrop-blur-sm transition hover:scale-105"
                    >
                      <Heart
                        size={19}
                        fill="currentColor"
                      />
                    </button>

                    {/* Verified */}
                    {vendor.verified && (
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm">
                        <Verified
                          size={14}
                          style={{
                            color: theme.colors.primary,
                          }}
                        />

                        Verified
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate font-display text-xl font-semibold text-stone-900">
                          {vendor.name}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-[#b23a5b]">
                          {vendor.category}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff7e8] px-2.5 py-1 text-xs font-semibold text-stone-700">
                        <Star
                          size={13}
                          fill="currentColor"
                          style={{
                            color: theme.colors.gold,
                          }}
                        />

                        {vendor.rating}
                      </div>
                    </div>

                    {/* Location + reviews */}
                    <div className="mt-3 flex items-center gap-1.5 text-sm text-stone-500">
                      <MapPin size={15} />

                      <span className="truncate">
                        {vendor.location}
                      </span>

                      <span className="shrink-0">
                        ({vendor.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-stone-500">
                      {vendor.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                      <LoadingLink
                        href={`/vendors/${vendor.slug}`}
                        className="h-11 rounded-xl px-4 text-sm font-semibold text-white"
                        style={{
                          backgroundColor:
                            theme.colors.primary,
                        }}
                      >
                        View Vendor
                        <ArrowRight
                          size={15}
                          className="ml-2"
                        />
                      </LoadingLink>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(vendor.id)
                        }
                        aria-label={`Remove ${vendor.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfd9] text-stone-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}