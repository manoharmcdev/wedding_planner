import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/common/ScrollToTop";
import Reveal from "@/components/common/Reveal";

import { theme } from "@/config/theme";
import { getVendorBySlug } from "@/services/vendorService";
import { getVendorProfile } from "@/services/vendorProfileService";
import ContactUnlockCard from "@/components/vendor/ContactUnlockCard";

interface VendorDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VendorDetailsPage({
  params,
}: VendorDetailsPageProps) {
  const { slug } = await params;

  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    return (
      <>
        <Header />

        <main
          className="min-h-[70vh]"
          style={{ backgroundColor: theme.colors.background }}
        >
          <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-20">
            <div
              className="w-full rounded-3xl border bg-white p-8 text-center shadow-sm sm:p-12"
              style={{ borderColor: theme.colors.border }}
            >
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  backgroundColor: theme.colors.primaryLight,
                  color: theme.colors.primary,
                }}
              >
                <MapPin size={28} />
              </div>

              <h1
                className="mt-6 font-serif text-3xl font-semibold"
                style={{ color: theme.colors.text }}
              >
                Vendor profile not found
              </h1>

              <p
                className="mx-auto mt-3 max-w-md text-sm leading-7"
                style={{ color: theme.colors.mutedText }}
              >
                We couldn't find the vendor profile you're looking for.
              </p>

              <Link
                href="/vendors"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                <ArrowLeft size={17} />
                Back to Vendors
              </Link>
            </div>
          </div>
        </main>

        <ScrollToTop />
      </>
    );
  }

  const profile = await getVendorProfile(vendor.id);

  if (!profile) {
    return (
      <>
        <Header />

        <main
          className="min-h-[70vh]"
          style={{ backgroundColor: theme.colors.background }}
        >
          <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-20">
            <div
              className="w-full rounded-3xl border bg-white p-8 text-center shadow-sm sm:p-12"
              style={{ borderColor: theme.colors.border }}
            >
              <h1
                className="font-serif text-3xl font-semibold"
                style={{ color: theme.colors.text }}
              >
                Profile details unavailable
              </h1>

              <p
                className="mt-3 text-sm"
                style={{ color: theme.colors.mutedText }}
              >
                This vendor has not completed their profile yet.
              </p>

              <Link
                href="/vendors"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                <ArrowLeft size={17} />
                Back to Vendors
              </Link>
            </div>
          </div>
        </main>

        <ScrollToTop />
      </>
    );
  }

  return (
    <>
      <Header />

      <main
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Breadcrumb */}
        <Reveal direction="down">
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/vendors"
                className="transition hover:underline"
                style={{ color: theme.colors.mutedText }}
              >
                Vendors
              </Link>

              <ChevronRight
                size={15}
                style={{ color: theme.colors.mutedText }}
              />

              <span
                className="truncate font-medium"
                style={{ color: theme.colors.text }}
              >
                {vendor.name}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Top section */}
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            {/* Vendor card */}
            <Reveal direction="left">
              <div
                className="min-w-0 overflow-hidden rounded-3xl border bg-white shadow-sm"
                style={{ borderColor: theme.colors.border }}
              >
                {/* Cover image */}
                <div className="relative aspect-[16/8] min-h-[240px] overflow-hidden sm:aspect-[16/7]">
                  <Image
                    src={vendor.coverImage}
                    alt={vendor.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  {/* Back */}
                  <Link
                    href="/vendors"
                    className="absolute left-4 top-4 flex h-10 items-center gap-2 rounded-full bg-white/90 px-4 text-xs font-semibold shadow-sm backdrop-blur transition hover:bg-white"
                    style={{ color: theme.colors.text }}
                  >
                    <ArrowLeft size={15} />
                    Back
                  </Link>

                  {/* Favorite */}
                  <button
                    type="button"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
                    aria-label={`Add ${vendor.name} to favorites`}
                  >
                    <Heart
                      size={18}
                      style={{ color: theme.colors.primary }}
                    />
                  </button>
                </div>

                {/* Basic information */}
                <div className="p-5 sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1
                          className="font-serif text-2xl font-semibold sm:text-3xl"
                          style={{ color: theme.colors.text }}
                        >
                          {vendor.name}
                        </h1>

                        {vendor.verified && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{
                              backgroundColor: "#EAF7EF",
                              color: theme.colors.success,
                            }}
                          >
                            <BadgeCheck size={14} />
                            Verified
                          </span>
                        )}
                      </div>

                      <p
                        className="mt-2 text-sm"
                        style={{ color: theme.colors.mutedText }}
                      >
                        {vendor.category} · {vendor.subcategory}
                      </p>
                    </div>

                    {/* Rating */}
                    <div
                      className="flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3"
                      style={{
                        backgroundColor: theme.colors.primaryLight,
                      }}
                    >
                      <Star
                        size={18}
                        fill="currentColor"
                        style={{ color: theme.colors.gold }}
                      />

                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{ color: theme.colors.text }}
                        >
                          {vendor.rating}
                        </p>

                        <p
                          className="text-xs"
                          style={{ color: theme.colors.mutedText }}
                        >
                          {vendor.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                      style={{
                        borderColor: theme.colors.border,
                        color: theme.colors.mutedText,
                      }}
                    >
                      <MapPin size={16} />
                      {vendor.location}
                    </div>

                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                      style={{
                        borderColor: theme.colors.border,
                        color: theme.colors.mutedText,
                      }}
                    >
                      <CalendarDays size={16} />
                      Wedding Services
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="mt-5 max-w-3xl text-sm leading-7"
                    style={{ color: theme.colors.mutedText }}
                  >
                    {vendor.description}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact / Payment */}
            <Reveal direction="right" delay={120}>
              <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
                <ContactUnlockCard vendor={vendor} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* About / Highlights / Services */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div
              className="rounded-3xl border bg-white p-5 shadow-sm sm:p-8"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                {/* About */}
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: theme.colors.primary }}
                  >
                    About
                  </p>

                  <h2
                    className="mt-2 font-serif text-2xl font-semibold sm:text-3xl"
                    style={{ color: theme.colors.text }}
                  >
                    About {vendor.name}
                  </h2>

                  <p
                    className="mt-4 text-sm leading-8"
                    style={{ color: theme.colors.mutedText }}
                  >
                    {profile.about}
                  </p>

                  {/* Experience */}
                  <div
                    className="mt-5 rounded-2xl border p-4"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: theme.colors.primary }}
                    >
                      Experience
                    </p>

                    <p
                      className="mt-2 text-sm leading-7"
                      style={{ color: theme.colors.mutedText }}
                    >
                      {profile.experience}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: theme.colors.primary }}
                  >
                    Highlights
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3">
                    {profile.highlights.map((highlight, index) => (
                      <div
                        key={`${profile.vendorId}-highlight-${index}`}
                        className="flex items-start gap-3 rounded-2xl p-4"
                        style={{
                          backgroundColor: theme.colors.primaryLight,
                        }}
                      >
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: theme.colors.card,
                            color: theme.colors.primary,
                          }}
                        >
                          <Check size={14} />
                        </span>

                        <span
                          className="text-sm font-medium leading-6"
                          style={{ color: theme.colors.text }}
                        >
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div
                className="mt-10 border-t pt-8"
                style={{ borderColor: theme.colors.border }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: theme.colors.primary }}
                >
                  Services
                </p>

                <h2
                  className="mt-2 font-serif text-2xl font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  What they offer
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {profile.services.map((service, index) => (
                    <div
                      key={`${profile.vendorId}-service-${index}`}
                      className="rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        borderColor: theme.colors.border,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: theme.colors.primaryLight,
                            color: theme.colors.primary,
                          }}
                        >
                          <Check size={15} />
                        </span>

                        <p
                          className="text-sm font-semibold leading-6"
                          style={{ color: theme.colors.text }}
                        >
                          {service}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Wedding Photos */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Reveal direction="up" delay={80}>
            <div>
              <div className="mb-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: theme.colors.primary }}
                >
                  Portfolio
                </p>

                <h2
                  className="mt-2 font-serif text-2xl font-semibold sm:text-3xl"
                  style={{ color: theme.colors.text }}
                >
                  Wedding Photos
                </h2>

                <p
                  className="mt-2 text-sm"
                  style={{ color: theme.colors.mutedText }}
                >
                  A glimpse of celebrations captured by this vendor.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {profile.gallery.slice(0, 10).map((image, index) => (
                  <Reveal
                    key={`${profile.vendorId}-gallery-${index}`}
                    direction={
                      index % 4 === 0
                        ? "left"
                        : index % 4 === 1
                          ? "up"
                          : index % 4 === 2
                            ? "down"
                            : "right"
                    }
                    delay={index * 50}
                  >
                    <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
                      <Image
                        src={image}
                        alt={`${vendor.name} wedding photo ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Ratings & Reviews */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Reveal direction="up" delay={120}>
            <div
              className="rounded-3xl border bg-white p-5 shadow-sm sm:p-8"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: theme.colors.primary }}
                  >
                    Reviews
                  </p>

                  <h2
                    className="mt-2 font-serif text-2xl font-semibold sm:text-3xl"
                    style={{ color: theme.colors.text }}
                  >
                    Ratings & Reviews
                  </h2>
                </div>

                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.mutedText }}
                >
                  <Star
                    size={17}
                    fill="currentColor"
                    style={{ color: theme.colors.gold }}
                  />

                  <strong style={{ color: theme.colors.text }}>
                    {vendor.rating}
                  </strong>

                  from {vendor.reviewCount} reviews
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {profile.reviews.map((review) => (
                  <div
                    key={`${profile.vendorId}-review-${review.id}`}
                    className="rounded-2xl border p-5"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3
                          className="font-semibold"
                          style={{ color: theme.colors.text }}
                        >
                          {review.customerName}
                        </h3>

                        {review.verified && (
                          <div
                            className="mt-1 flex items-center gap-1 text-xs font-medium"
                            style={{ color: theme.colors.success }}
                          >
                            <BadgeCheck size={13} />
                            Verified review
                          </div>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={`${review.id}-star-${index}`}
                            size={14}
                            fill={
                              index < review.rating
                                ? "currentColor"
                                : "none"
                            }
                            style={{
                              color: theme.colors.gold,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <p
                      className="mt-4 text-sm leading-7"
                      style={{ color: theme.colors.mutedText }}
                    >
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <ScrollToTop />
    </>
  );
}