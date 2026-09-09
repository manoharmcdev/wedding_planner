"use client";

import Image from "next/image";
import {
  CheckCircle2,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import Reveal from "@/components/common/Reveal";
import { theme } from "@/config/theme";
import type { Vendor } from "@/types/vendor";
import VendorCardLink from "../home/VendorCardLink";

interface CategoryOption {
  id: string;
  name: string;
}

interface LocationOption {
  id: string;
  name: string;
}

interface VendorsListingProps {
  vendors: Vendor[];
  categories: CategoryOption[];
  locations: LocationOption[];
  initialLocation?: string;
  initialCategory?: string;
}

const PRICE_RANGES = [
  {
    value: "all",
    label: "Any budget",
  },
  {
    value: "under-25000",
    label: "Under ₹25,000",
  },
  {
    value: "25000-50000",
    label: "₹25,000 – ₹50,000",
  },
  {
    value: "50000-100000",
    label: "₹50,000 – ₹1,00,000",
  },
  {
    value: "over-100000",
    label: "Above ₹1,00,000",
  },
];

const RATINGS = [
  {
    value: "all",
    label: "Any rating",
  },
  {
    value: "4",
    label: "4.0+",
  },
  {
    value: "4.5",
    label: "4.5+",
  },
  {
    value: "4.8",
    label: "4.8+",
  },
];

export default function VendorsListing({
  vendors,
  categories,
  locations,
  initialLocation = "all",
  initialCategory = "all",
}: VendorsListingProps) {
  const [search, setSearch] = useState("");

  const [location, setLocation] = useState(
    initialLocation,
  );

  const [category, setCategory] = useState(
    initialCategory,
  );

  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const filteredVendors = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return vendors.filter((vendor) => {
      /*
       * Search
       */
      const matchesSearch =
        !searchValue ||
        vendor.name.toLowerCase().includes(searchValue) ||
        vendor.category
          .toLowerCase()
          .includes(searchValue) ||
        vendor.subcategory
          .toLowerCase()
          .includes(searchValue) ||
        vendor.location
          .toLowerCase()
          .includes(searchValue) ||
        vendor.description
          .toLowerCase()
          .includes(searchValue);

      /*
       * Location
       *
       * Case-insensitive so:
       * Bangalore
       * bangalore
       * BANGALORE
       *
       * all work.
       */
      const matchesLocation =
        location === "all" ||
        vendor.location.toLowerCase() ===
          location.toLowerCase();

      /*
       * Category
       */
      const matchesCategory =
        category === "all" ||
        vendor.category.toLowerCase() ===
          category.toLowerCase();

      /*
       * Price
       */
      const matchesPrice = (() => {
        if (price === "all") {
          return true;
        }

        if (price === "under-25000") {
          return vendor.startingPrice < 25000;
        }

        if (price === "25000-50000") {
          return (
            vendor.startingPrice >= 25000 &&
            vendor.startingPrice <= 50000
          );
        }

        if (price === "50000-100000") {
          return (
            vendor.startingPrice > 50000 &&
            vendor.startingPrice <= 100000
          );
        }

        if (price === "over-100000") {
          return vendor.startingPrice > 100000;
        }

        return true;
      })();

      /*
       * Rating
       */
      const matchesRating =
        rating === "all" ||
        vendor.rating >= Number(rating);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [
    vendors,
    search,
    location,
    category,
    price,
    rating,
  ]);

  const hasFilters =
    search.trim() !== "" ||
    location !== "all" ||
    category !== "all" ||
    price !== "all" ||
    rating !== "all";

  const clearFilters = () => {
    setSearch("");
    setLocation("all");
    setCategory("all");
    setPrice("all");
    setRating("all");
  };

  return (
    <div>
      {/* ================================================== */}
      {/* SEARCH HEADER */}
      {/* ================================================== */}

      <section
        className="border-b"
        style={{
          backgroundColor: theme.colors.primaryLight,
          borderColor: theme.colors.border,
        }}
      >
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <Reveal direction="up" distance={40}>
            <div className="max-w-3xl">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{
                  color: theme.colors.primary,
                }}
              >
                Find your vendors
              </p>

              <h1
                className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Find the perfect wedding team
              </h1>

              <p
                className="mt-4 max-w-2xl text-sm leading-7 sm:text-base"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                Explore trusted wedding professionals and
                find the right team for your celebration.
              </p>
            </div>
          </Reveal>

          {/* ================================================== */}
          {/* SEARCH */}
          {/* ================================================== */}

          <Reveal direction="up" distance={40} delay={100}>
            <div className="mt-8">
              <div
                className="flex min-h-14 items-center gap-3 rounded-2xl border bg-white px-4 shadow-sm"
                style={{
                  borderColor: theme.colors.border,
                }}
              >
                <Search
                  size={20}
                  className="shrink-0"
                  style={{
                    color: theme.colors.mutedText,
                  }}
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search vendors, categories, locations..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  style={{
                    color: theme.colors.text,
                  }}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* ================================================== */}
          {/* DESKTOP FILTERS */}
          {/* ================================================== */}

          <Reveal direction="up" distance={40} delay={160}>
            <div className="mt-4 hidden gap-3 lg:grid lg:grid-cols-4">
              <FilterSelect
                label="Location"
                value={location}
                onChange={setLocation}
                options={[
                  {
                    value: "all",
                    label: "All locations",
                  },
                  ...locations.map((item) => ({
                    value: item.name,
                    label: item.name,
                  })),
                ]}
              />

              <FilterSelect
                label="Category"
                value={category}
                onChange={setCategory}
                options={[
                  {
                    value: "all",
                    label: "All categories",
                  },
                  ...categories.map((item) => ({
                    value: item.name,
                    label: item.name,
                  })),
                ]}
              />

              <FilterSelect
                label="Budget"
                value={price}
                onChange={setPrice}
                options={PRICE_RANGES}
              />

              <FilterSelect
                label="Rating"
                value={rating}
                onChange={setRating}
                options={RATINGS}
              />
            </div>
          </Reveal>

          {/* ================================================== */}
          {/* MOBILE FILTER BUTTON */}
          {/* ================================================== */}

          <Reveal direction="up" distance={30} delay={160}>
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  !mobileFiltersOpen,
                )
              }
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full border bg-white text-sm font-semibold lg:hidden"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            >
              <SlidersHorizontal size={17} />

              Filters

              {hasFilters && (
                <span
                  className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] text-white"
                  style={{
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  !
                </span>
              )}
            </button>
          </Reveal>

          {/* ================================================== */}
          {/* MOBILE FILTERS */}
          {/* ================================================== */}

          {mobileFiltersOpen && (
            <Reveal direction="down" distance={20}>
              <div
                className="mt-4 space-y-4 rounded-2xl border bg-white p-5 lg:hidden"
                style={{
                  borderColor: theme.colors.border,
                }}
              >
                <FilterSelect
                  label="Location"
                  value={location}
                  onChange={setLocation}
                  options={[
                    {
                      value: "all",
                      label: "All locations",
                    },
                    ...locations.map((item) => ({
                      value: item.name,
                      label: item.name,
                    })),
                  ]}
                />

                <FilterSelect
                  label="Category"
                  value={category}
                  onChange={setCategory}
                  options={[
                    {
                      value: "all",
                      label: "All categories",
                    },
                    ...categories.map((item) => ({
                      value: item.name,
                      label: item.name,
                    })),
                  ]}
                />

                <FilterSelect
                  label="Budget"
                  value={price}
                  onChange={setPrice}
                  options={PRICE_RANGES}
                />

                <FilterSelect
                  label="Rating"
                  value={rating}
                  onChange={setRating}
                  options={RATINGS}
                />

                <button
                  type="button"
                  onClick={() => {
                    clearFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="h-11 w-full rounded-full border text-sm font-semibold"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.primary,
                  }}
                >
                  Clear filters
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ================================================== */}
      {/* RESULTS */}
      {/* ================================================== */}

      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <Reveal direction="up" distance={40}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="text-sm"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                {filteredVendors.length}{" "}
                {filteredVendors.length === 1
                  ? "vendor"
                  : "vendors"}{" "}
                found
              </p>

              <h2
                className="mt-1 font-display text-3xl sm:text-4xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Wedding vendors
              </h2>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 self-start text-sm font-semibold sm:self-auto"
                style={{
                  color: theme.colors.primary,
                }}
              >
                Clear all
                <X size={15} />
              </button>
            )}
          </div>
        </Reveal>

        {/* ================================================== */}
        {/* VENDOR GRID */}
        {/* ================================================== */}

        {filteredVendors.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVendors.map((vendor, index) => (
              <Reveal
                key={vendor.id}
                direction={
                  index % 4 === 0
                    ? "left"
                    : index % 4 === 1
                      ? "up"
                      : index % 4 === 2
                        ? "down"
                        : "right"
                }
                distance={45}
                delay={(index % 4) * 80}
              >
                <article
                  className="group overflow-hidden rounded-[22px] border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  {/* IMAGE */}
                  <VendorImage vendor={vendor} />

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className="font-display text-xl leading-tight"
                            style={{
                              color: theme.colors.text,
                            }}
                          >
                            {vendor.name}
                          </h3>

                          {vendor.verified && (
                            <CheckCircle2
                              size={16}
                              style={{
                                color:
                                  theme.colors.primary,
                              }}
                            />
                          )}
                        </div>

                        <p
                          className="mt-2 text-xs font-medium uppercase tracking-wider"
                          style={{
                            color: theme.colors.primary,
                          }}
                        >
                          {vendor.category}
                        </p>
                      </div>
                    </div>

                    {/* RATING + LOCATION */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Star
                          size={15}
                          fill="currentColor"
                          style={{
                            color: theme.colors.gold,
                          }}
                        />

                        <strong
                          style={{
                            color: theme.colors.text,
                          }}
                        >
                          {vendor.rating}
                        </strong>

                        <span
                          style={{
                            color: theme.colors.mutedText,
                          }}
                        >
                          ({vendor.reviewCount})
                        </span>
                      </span>

                      <span
                        className="inline-flex items-center gap-1.5"
                        style={{
                          color: theme.colors.mutedText,
                        }}
                      >
                        <MapPin size={15} />

                        {vendor.location}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p
                      className="mt-4 line-clamp-2 text-sm leading-6"
                      style={{
                        color: theme.colors.mutedText,
                      }}
                    >
                      {vendor.description}
                    </p>

                    {/* BUTTON */}
                    <div className="mt-5">
                      <VendorCardLink
                        href={`/vendors/${vendor.slug}`}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          /* ================================================== */
          /* EMPTY STATE */
          /* ================================================== */

          <Reveal direction="up" distance={40}>
            <div
              className="mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border bg-white px-6 text-center"
              style={{
                borderColor: theme.colors.border,
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    theme.colors.primaryLight,
                }}
              >
                <Search
                  size={26}
                  style={{
                    color: theme.colors.primary,
                  }}
                />
              </div>

              <h3
                className="mt-5 font-display text-2xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                No vendors found
              </h3>

              <p
                className="mt-2 max-w-md text-sm leading-6"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                Try changing your search or filters to find
                more wedding vendors.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 h-11 rounded-full px-6 text-sm font-semibold text-white"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                Clear filters
              </button>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}

/* ====================================================== */
/* VENDOR IMAGE                                            */
/* ====================================================== */

function VendorImage({
  vendor,
}: {
  vendor: Vendor;
}) {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden">
        <a
          href={`/vendors/${vendor.slug}`}
          className="group/image block h-full w-full"
        >
          <Image
            src={vendor.coverImage}
            alt={vendor.name}
            fill
            className="object-cover transition-transform duration-700 group-hover/image:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
        </a>

        {vendor.verified && (
          <div
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
            style={{
              backgroundColor: "rgba(178,58,91,0.9)",
            }}
          >
            <CheckCircle2 size={14} />
            Verified
          </div>
        )}
      </div>
    </div>
  );
}

/* ====================================================== */
/* FILTER SELECT                                           */
/* ====================================================== */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label
        className="mb-2 block text-xs font-semibold"
        style={{
          color: theme.colors.mutedText,
        }}
      >
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-12 w-full appearance-none rounded-2xl border bg-white px-4 pr-10 text-sm outline-none transition-all focus:ring-2"
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          style={{
            color: theme.colors.mutedText,
          }}
        />
      </div>
    </div>
  );
}