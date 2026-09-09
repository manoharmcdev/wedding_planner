"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { theme } from "@/config/theme";
import LoadingLink from "@/components/common/LoadingLink";
import Reveal from "@/components/common/Reveal";

interface FindVendorsProps {
  locations: {
    id: string;
    name: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
}

export default function FindVendors({
  locations,
  categories,
}: FindVendorsProps) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const searchHref =
    location || category
      ? `/vendors?location=${encodeURIComponent(
          location || "all",
        )}&category=${encodeURIComponent(category || "all")}`
      : "/vendors";

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -left-32 top-20 h-72 w-72 rounded-full opacity-40"
        style={{
          backgroundColor: theme.colors.primaryLight,
        }}
      />

      <div
        className="absolute -right-32 bottom-10 h-80 w-80 rounded-full opacity-30"
        style={{
          backgroundColor: theme.colors.secondary,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
                color: theme.colors.primary,
              }}
            >
              Find your perfect vendors
            </span>

            <h2
              className="mt-5 font-display text-4xl leading-tight sm:text-5xl"
              style={{
                color: theme.colors.text,
              }}
            >
              Find vendors for
              <span
                className="block"
                style={{
                  color: theme.colors.primary,
                }}
              >
                your special day
              </span>
            </h2>

            <p
              className="mt-5 text-sm leading-7 sm:text-base"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Choose your location and what you are looking for to
              discover wedding professionals that match your needs.
            </p>
          </div>
        </Reveal>

        {/* Search Card */}
        <Reveal direction="up" delay={150}>
          <div
            className="mx-auto mt-10 max-w-5xl rounded-3xl border bg-white p-5 shadow-xl sm:p-7"
            style={{
              borderColor: theme.colors.border,
            }}
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
              {/* Location */}
              <div>
                <label
                  htmlFor="find-vendor-location"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  <MapPin
                    size={16}
                    style={{
                      color: theme.colors.primary,
                    }}
                  />
                  Location
                </label>

                <select
                  id="find-vendor-location"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  <option value="">
                    Select your location
                  </option>

                  {locations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="find-vendor-category"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  <Search
                    size={16}
                    style={{
                      color: theme.colors.primary,
                    }}
                  />
                  What are you looking for?
                </label>

                <select
                  id="find-vendor-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all focus:ring-2"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  <option value="">
                    Select a category
                  </option>

                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <LoadingLink
                href={searchHref}
                className="h-12 w-full rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:w-auto"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                Find Vendors
                <ArrowRight size={17} className="ml-2" />
              </LoadingLink>
            </div>

            {/* Browse all */}
            <div className="mt-5 border-t pt-5 text-center">
              <LoadingLink
                href="/vendors"
                className="text-sm font-semibold transition-colors duration-200"
                style={{
                  color: theme.colors.primary,
                }}
              >
                Browse all vendors
                <ArrowRight size={15} className="ml-1" />
              </LoadingLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}