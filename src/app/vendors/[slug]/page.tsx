import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Reveal from "@/components/common/Reveal";
import ScrollToTop from "@/components/common/ScrollToTop";
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
          className="flex min-h-[70vh] items-center justify-center px-5"
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          <div className="text-center">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{
                color: theme.colors.primary,
              }}
            >
              Vendor not found
            </p>

            <h1
              className="mt-3 font-display text-4xl"
              style={{
                color: theme.colors.text,
              }}
            >
              Vendor profile not found
            </h1>

            <p
              className="mx-auto mt-4 max-w-md text-sm leading-6"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              The vendor profile you are looking for is not
              available.
            </p>

            <Link
              href="/vendors"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            >
              <ArrowLeft size={17} />
              Back to Vendors
            </Link>
          </div>
        </main>
      </>
    );
  }

  const profile = await getVendorProfile(vendor.id);

  const gallery = profile?.gallery?.slice(0, 10) ?? [];
  const highlights = profile?.highlights ?? [];
  const services = profile?.services ?? [];
  const reviews = profile?.reviews ?? [];

  return (
    <>
      {/* =====================================================
          FORCE NEW VENDOR PAGE TO START AT TOP
      ===================================================== */}
      <ScrollToTop />

      <Header />

      <main
        className="min-h-screen"
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        {/* =====================================================
            BACK + ACTIONS
        ===================================================== */}
        <section className="pt-7 sm:pt-9">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <Reveal direction="down">
              <div className="flex items-center justify-between">
                <Link
                  href="/vendors"
                  className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-x-0.5"
                  style={{
                    color: theme.colors.mutedText,
                  }}
                >
                  <ArrowLeft
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  Back to Vendors
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Add vendor to favorites"
                    className="flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.primary,
                    }}
                  >
                    <Heart size={18} />
                  </button>

                  <button
                    type="button"
                    aria-label="Share vendor"
                    className="flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.primary,
                    }}
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            TOP VENDOR + PAYMENT
        ===================================================== */}
        <section className="py-6 sm:py-8 lg:py-10">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
              {/* =================================================
                  VENDOR CARD
              ================================================= */}
              <Reveal direction="left" distance={60}>
                <article
                  className="overflow-hidden rounded-[28px] border bg-white shadow-sm"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  {/* MEDIUM COVER IMAGE */}
                  <div className="relative aspect-[16/8] min-h-[260px] overflow-hidden sm:min-h-[330px]">
                    <Image
                      src={vendor.coverImage}
                      alt={vendor.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                    <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]">
                        {vendor.category}
                      </span>
                    </div>
                  </div>

                  {/* VENDOR DETAILS */}
                  <div className="p-6 sm:p-7 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-md sm:h-20 sm:w-20">
                        <Image
                          src={
                            vendor.images[0] ??
                            vendor.coverImage
                          }
                          alt={`${vendor.name} profile`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h1
                            className="font-display text-2xl leading-tight sm:text-3xl lg:text-4xl"
                            style={{
                              color: theme.colors.text,
                            }}
                          >
                            {vendor.name}
                          </h1>

                          {vendor.verified && (
                            <BadgeCheck
                              size={21}
                              style={{
                                color: theme.colors.primary,
                              }}
                            />
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span
                            className="flex items-center gap-1.5 text-sm font-semibold"
                            style={{
                              color: theme.colors.text,
                            }}
                          >
                            <Star
                              size={16}
                              fill="currentColor"
                              style={{
                                color: theme.colors.gold,
                              }}
                            />

                            {vendor.rating}

                            <span
                              className="font-normal"
                              style={{
                                color:
                                  theme.colors.mutedText,
                              }}
                            >
                              ({vendor.reviewCount} reviews)
                            </span>
                          </span>

                          <span
                            className="flex items-center gap-1.5 text-sm"
                            style={{
                              color:
                                theme.colors.mutedText,
                            }}
                          >
                            <MapPin size={16} />
                            {vendor.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="my-6 h-px"
                      style={{
                        backgroundColor:
                          theme.colors.border,
                      }}
                    />

                    <p
                      className="text-sm leading-7 sm:text-base"
                      style={{
                        color: theme.colors.mutedText,
                      }}
                    >
                      {vendor.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {vendor.verified && (
                        <span
                          className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                          style={{
                            backgroundColor:
                              theme.colors.primaryLight,
                            color:
                              theme.colors.primary,
                          }}
                        >
                          <BadgeCheck size={14} />
                          Verified Vendor
                        </span>
                      )}

                      {profile?.experience && (
                        <span
                          className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                          style={{
                            backgroundColor:
                              theme.colors.background,
                            color:
                              theme.colors.mutedText,
                          }}
                        >
                          <CalendarDays size={14} />
                          {profile.experience}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* =================================================
                  PAYMENT / CONTACT
              ================================================= */}
              <Reveal
                direction="right"
                delay={120}
                distance={60}
              >
                <div className="lg:sticky lg:top-24">
                  <ContactUnlockCard
                    vendorName={vendor.name}
                  />

                  <div
                    className="mt-4 flex items-start gap-3 rounded-2xl border bg-white p-4"
                    style={{
                      borderColor: theme.colors.border,
                    }}
                  >
                    <ShieldCheck
                      size={18}
                      className="mt-0.5 shrink-0"
                      style={{
                        color: theme.colors.success,
                      }}
                    />

                    <p
                      className="text-xs leading-5"
                      style={{
                        color: theme.colors.mutedText,
                      }}
                    >
                      Your contact information remains private.
                      Direct vendor contact details are available
                      only after successful payment verification.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT / HIGHLIGHTS / SERVICES
        ===================================================== */}
        <section className="pb-10 sm:pb-14 lg:pb-16">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div
              className="rounded-[28px] border bg-white p-6 shadow-sm sm:p-8 lg:p-10"
              style={{
                borderColor: theme.colors.border,
              }}
            >
              {/* ABOUT */}
              {profile?.about && (
                <Reveal direction="up">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.2em]"
                      style={{
                        color: theme.colors.primary,
                      }}
                    >
                      About
                    </p>

                    <h2
                      className="mt-2 font-display text-3xl sm:text-4xl"
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      About this vendor
                    </h2>

                    <p
                      className="mt-4 max-w-4xl text-sm leading-7 sm:text-base"
                      style={{
                        color: theme.colors.mutedText,
                      }}
                    >
                      {profile.about}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* HIGHLIGHTS */}
              {highlights.length > 0 && (
                <Reveal direction="left" delay={100}>
                  <div className="mt-10">
                    <h3
                      className="font-display text-2xl"
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      Why couples choose them
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {highlights.map(
                        (
                          highlight: string,
                          index: number,
                        ) => (
                          <Reveal
                            key={`${highlight}-${index}`}
                            direction={
                              index % 3 === 0
                                ? "left"
                                : index % 3 === 1
                                  ? "up"
                                  : "right"
                            }
                            delay={index * 80}
                          >
                            <div
                              className="flex items-start gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
                              style={{
                                borderColor:
                                  theme.colors.border,
                              }}
                            >
                              <span
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  backgroundColor:
                                    theme.colors.primaryLight,
                                }}
                              >
                                <Check
                                  size={15}
                                  strokeWidth={3}
                                  style={{
                                    color:
                                      theme.colors.primary,
                                  }}
                                />
                              </span>

                              <span
                                className="text-sm leading-6"
                                style={{
                                  color:
                                    theme.colors.mutedText,
                                }}
                              >
                                {highlight}
                              </span>
                            </div>
                          </Reveal>
                        ),
                      )}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* SERVICES */}
              {services.length > 0 && (
                <Reveal direction="right" delay={150}>
                  <div className="mt-10">
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.2em]"
                      style={{
                        color: theme.colors.primary,
                      }}
                    >
                      Services
                    </p>

                    <h3
                      className="mt-2 font-display text-2xl sm:text-3xl"
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      What they offer
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {services.map(
                        (
                          service: string,
                          index: number,
                        ) => (
                          <Reveal
                            key={`${service}-${index}`}
                            direction={
                              index % 3 === 0
                                ? "left"
                                : index % 3 === 1
                                  ? "up"
                                  : "right"
                            }
                            delay={index * 70}
                          >
                            <div
                              className="flex items-center gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                              style={{
                                borderColor:
                                  theme.colors.border,
                              }}
                            >
                              <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  backgroundColor:
                                    theme.colors.primaryLight,
                                }}
                              >
                                <Check
                                  size={16}
                                  strokeWidth={3}
                                  style={{
                                    color:
                                      theme.colors.primary,
                                  }}
                                />
                              </span>

                              <span className="text-sm font-medium">
                                {service}
                              </span>
                            </div>
                          </Reveal>
                        ),
                      )}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            WEDDING PHOTOS
        ===================================================== */}
        <section className="pb-12 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <Reveal direction="up">
              <div className="mb-7">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{
                    color: theme.colors.primary,
                  }}
                >
                  Portfolio
                </p>

                <h2
                  className="mt-2 font-display text-3xl sm:text-4xl"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  Wedding photos
                </h2>

                <p
                  className="mt-2 max-w-xl text-sm leading-6"
                  style={{
                    color: theme.colors.mutedText,
                  }}
                >
                  Explore beautiful moments captured by this
                  vendor.
                </p>
              </div>
            </Reveal>

            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {gallery.map(
                  (
                    image: string,
                    index: number,
                  ) => (
                    <Reveal
                      key={`${image}-${index}`}
                      direction={
                        index % 4 === 0
                          ? "left"
                          : index % 4 === 1
                            ? "up"
                            : index % 4 === 2
                              ? "right"
                              : "down"
                      }
                      delay={index * 70}
                      distance={45}
                    >
                      <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 sm:rounded-3xl">
                        <Image
                          src={image}
                          alt={`${vendor.name} wedding photo ${
                            index + 1
                          }`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </Reveal>
                  ),
                )}
              </div>
            ) : (
              <Reveal direction="up">
                <div
                  className="rounded-3xl border bg-white p-10 text-center"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  <p
                    className="text-sm"
                    style={{
                      color: theme.colors.mutedText,
                    }}
                  >
                    Photos will be added by the vendor.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* =====================================================
            RATINGS & REVIEWS
        ===================================================== */}
        <section
          className="border-t py-16 sm:py-20"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
              {/* RATING SUMMARY */}
              <Reveal direction="left">
                <div
                  className="rounded-3xl p-7 sm:p-8"
                  style={{
                    backgroundColor:
                      theme.colors.background,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{
                      color: theme.colors.primary,
                    }}
                  >
                    Guest feedback
                  </p>

                  <h2
                    className="mt-2 font-display text-3xl"
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    Ratings & Reviews
                  </h2>

                  <div className="mt-7">
                    <div className="flex items-end gap-2">
                      <span
                        className="font-display text-6xl"
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        {vendor.rating}
                      </span>

                      <span
                        className="pb-2 text-sm"
                        style={{
                          color:
                            theme.colors.mutedText,
                        }}
                      >
                        / 5
                      </span>
                    </div>

                    <div className="mt-3 flex gap-1">
                      {[1, 2, 3, 4, 5].map(
                        (star: number) => (
                          <Star
                            key={star}
                            size={18}
                            fill="currentColor"
                            style={{
                              color:
                                theme.colors.gold,
                            }}
                          />
                        ),
                      )}
                    </div>

                    <p
                      className="mt-3 text-sm"
                      style={{
                        color:
                          theme.colors.mutedText,
                      }}
                    >
                      Based on {vendor.reviewCount} reviews
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* REVIEW LIST */}
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map(
                    (review, index: number) => (
                      <Reveal
                        key={review.id}
                        direction={
                          index % 2 === 0
                            ? "right"
                            : "up"
                        }
                        delay={index * 90}
                      >
                        <article
                          className="rounded-3xl border bg-white p-6 shadow-sm sm:p-7"
                          style={{
                            borderColor:
                              theme.colors.border,
                          }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-semibold">
                                  {review.customerName}
                                </h3>

                                {review.verified && (
                                  <span
                                    className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
                                    style={{
                                      backgroundColor:
                                        theme.colors.primaryLight,
                                      color:
                                        theme.colors.primary,
                                    }}
                                  >
                                    <BadgeCheck size={11} />
                                    Verified
                                  </span>
                                )}
                              </div>

                              <div className="mt-2 flex gap-1">
                                {[1, 2, 3, 4, 5].map(
                                  (star: number) => (
                                    <Star
                                      key={star}
                                      size={14}
                                      fill={
                                        star <=
                                        Math.round(
                                          review.rating,
                                        )
                                          ? "currentColor"
                                          : "none"
                                      }
                                      style={{
                                        color:
                                          theme.colors
                                            .gold,
                                      }}
                                    />
                                  ),
                                )}
                              </div>
                            </div>

                            <span
                              className="text-xs font-medium"
                              style={{
                                color:
                                  theme.colors.mutedText,
                              }}
                            >
                              {review.rating.toFixed(1)}
                            </span>
                          </div>

                          <p
                            className="mt-5 text-sm leading-7"
                            style={{
                              color:
                                theme.colors.mutedText,
                            }}
                          >
                            &ldquo;{review.comment}&rdquo;
                          </p>
                        </article>
                      </Reveal>
                    ),
                  )
                ) : (
                  <Reveal direction="right">
                    <div
                      className="rounded-3xl border bg-white p-8 text-center"
                      style={{
                        borderColor:
                          theme.colors.border,
                      }}
                    >
                      <p
                        className="text-sm"
                        style={{
                          color:
                            theme.colors.mutedText,
                        }}
                      >
                        No reviews yet.
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}