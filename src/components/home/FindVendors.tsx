"use client";

import { ArrowRight, Check, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import Reveal from "@/components/common/Reveal";
import LoadingLink from "@/components/common/LoadingLink";
import { theme } from "@/config/theme";
import type { Category } from "@/types/category";
import type { LocationOption } from "@/services/locationService";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FindVendorsProps {
  categories: Category[];
  locations: LocationOption[];
}

export default function FindVendors({
  categories,
  locations,
}: FindVendorsProps) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [locationSearch, setLocationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const filteredLocations = useMemo(() => {
    const search = locationSearch.trim().toLowerCase();

    if (!search) {
      return locations;
    }

    return locations.filter((item) =>
      item.name.toLowerCase().includes(search),
    );
  }, [locations, locationSearch]);

  const filteredCategories = useMemo(() => {
    const search = categorySearch.trim().toLowerCase();

    if (!search) {
      return categories;
    }

    return categories.filter((item) =>
      item.name.toLowerCase().includes(search),
    );
  }, [categories, categorySearch]);

  const selectedLocationName =
    locations.find((item) => item.id === location)?.name ?? "";

  const selectedCategoryName =
    categories.find((item) => item.id === category)?.name ?? "";

  const searchParams = new URLSearchParams();

  if (location) {
    searchParams.set("location", location);
  }

  if (category) {
    searchParams.set("category", category);
  }

  const searchHref = `/vendors${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  return (
    <section
      id="find-vendors"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(180deg, #fffaf7 0%, #fff5f6 50%, #fffaf7 100%)",
      }}
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full blur-3xl opacity-40"
        style={{ background: theme.colors.primaryLight }}
      />

      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ background: theme.colors.secondary }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: theme.colors.border,
                background: "#ffffff",
                color: theme.colors.primary,
              }}
            >
              <SlidersHorizontal size={14} />
              Find your perfect vendor
            </div>

            <h2
              className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl"
              style={{ color: theme.colors.text }}
            >
              Find Wedding Vendors
            </h2>

            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: theme.colors.mutedText }}
            >
              Search trusted wedding professionals by location and category.
              Find the right match for your special day.
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <div
            className="mx-auto mt-10 rounded-[24px] border bg-white p-4 shadow-[0_20px_60px_rgba(89,48,57,0.10)] sm:p-6 lg:p-7"
            style={{ borderColor: theme.colors.border }}
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
              {/* Location */}
              <div className="min-w-0">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  Location
                </label>

                <Select
                  value={location}
                  onValueChange={(value) => {
                    setLocation(value ?? "");
                    setLocationSearch("");
                  }}
                >
                  <SelectTrigger
                    className="h-14 w-full rounded-2xl border px-4 shadow-none transition-all hover:shadow-sm focus:ring-2"
                    style={{
                      borderColor: theme.colors.border,
                      background: "#fffdfc",
                      color: location
                        ? theme.colors.text
                        : theme.colors.mutedText,
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: theme.colors.primaryLight,
                          color: theme.colors.primary,
                        }}
                      >
                        <MapPin size={17} />
                      </span>

                      <SelectValue placeholder="Choose a location">
                        <span className="truncate">
                          {selectedLocationName}
                        </span>
                      </SelectValue>
                    </div>
                  </SelectTrigger>

                  <SelectContent
                    className="z-[100] w-[var(--radix-select-trigger-width)] min-w-[280px] overflow-hidden rounded-2xl border bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
                    style={{ borderColor: theme.colors.border }}
                  >
                    {/* Search */}
                    <div
                      className="sticky top-0 z-10 mb-2 rounded-xl border bg-white p-2"
                      style={{ borderColor: theme.colors.border }}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 px-2">
                        <Search
                          size={16}
                          style={{ color: theme.colors.mutedText }}
                        />

                        <input
                          value={locationSearch}
                          onChange={(event) =>
                            setLocationSearch(event.target.value)
                          }
                          placeholder="Search location..."
                          className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    {/* Scrollable options */}
                    <div className="max-h-64 overflow-y-auto pr-1">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                            className="my-1 cursor-pointer rounded-xl py-3 pl-3 pr-9 text-sm"
                          >
                            <span className="flex items-center gap-2">
                              <MapPin
                                size={15}
                                style={{ color: theme.colors.primary }}
                              />
                              {item.name}

                              {location === item.id && (
                                <Check
                                  size={15}
                                  className="ml-auto"
                                  style={{ color: theme.colors.primary }}
                                />
                              )}
                            </span>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-3 py-8 text-center text-sm text-stone-500">
                          No locations found
                        </div>
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="min-w-0">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  Category
                </label>

                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value ?? "");
                    setCategorySearch("");
                  }}
                >
                  <SelectTrigger
                    className="h-14 w-full rounded-2xl border px-4 shadow-none transition-all hover:shadow-sm focus:ring-2"
                    style={{
                      borderColor: theme.colors.border,
                      background: "#fffdfc",
                      color: category
                        ? theme.colors.text
                        : theme.colors.mutedText,
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: theme.colors.primaryLight,
                          color: theme.colors.primary,
                        }}
                      >
                        <SlidersHorizontal size={17} />
                      </span>

                      <SelectValue placeholder="Choose a category">
                        <span className="truncate">
                          {selectedCategoryName}
                        </span>
                      </SelectValue>
                    </div>
                  </SelectTrigger>

                  <SelectContent
                    className="z-[100] w-[var(--radix-select-trigger-width)] min-w-[280px] overflow-hidden rounded-2xl border bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
                    style={{ borderColor: theme.colors.border }}
                  >
                    {/* Search */}
                    <div
                      className="sticky top-0 z-10 mb-2 rounded-xl border bg-white p-2"
                      style={{ borderColor: theme.colors.border }}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 px-2">
                        <Search
                          size={16}
                          style={{ color: theme.colors.mutedText }}
                        />

                        <input
                          value={categorySearch}
                          onChange={(event) =>
                            setCategorySearch(event.target.value)
                          }
                          placeholder="Search category..."
                          className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    {/* Scrollable options */}
                    <div className="max-h-64 overflow-y-auto pr-1">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                            className="my-1 cursor-pointer rounded-xl py-3 pl-3 pr-9 text-sm"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{
                                  background: theme.colors.primary,
                                }}
                              />

                              {item.name}

                              {category === item.id && (
                                <Check
                                  size={15}
                                  className="ml-auto"
                                  style={{ color: theme.colors.primary }}
                                />
                              )}
                            </span>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-3 py-8 text-center text-sm text-stone-500">
                          No categories found
                        </div>
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* Search button */}
              <div className="lg:pb-0">
                <LoadingLink
                  href={searchHref}
                  className="h-14 w-full rounded-2xl px-6 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:w-auto lg:min-w-[170px]"
                  style={{
                    background: theme.colors.primary,
                  }}
                >
                  <Search size={18} />
                  <span className="ml-2">Find Vendors</span>
                </LoadingLink>
              </div>
            </div>

            {/* Selected filters */}
            {(location || category) && (
              <div
                className="mt-5 flex flex-wrap items-center gap-2 border-t pt-4"
                style={{ borderColor: theme.colors.border }}
              >
                <span
                  className="mr-1 text-xs font-medium"
                  style={{ color: theme.colors.mutedText }}
                >
                  Selected:
                </span>

                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="rounded-full px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                    style={{
                      background: theme.colors.primaryLight,
                      color: theme.colors.primary,
                    }}
                  >
                    {selectedLocationName} ×
                  </button>
                )}

                {category && (
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    className="rounded-full px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                    style={{
                      background: theme.colors.primaryLight,
                      color: theme.colors.primary,
                    }}
                  >
                    {selectedCategoryName} ×
                  </button>
                )}
              </div>
            )}

            {/* Browse all */}
            <div className="mt-5 flex justify-center">
              <LoadingLink
                href="/vendors"
                className="group inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme.colors.primary }}
              >
                Browse all vendors
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </LoadingLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}