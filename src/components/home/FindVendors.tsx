"use client";

import {
  ArrowRight,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";

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

  const searchHref =
    `/vendors?location=${encodeURIComponent(location)}` +
    `&category=${encodeURIComponent(category)}`;

  return (
    <section
      className="w-full overflow-hidden py-14 sm:py-16 lg:py-20"
      style={{
        backgroundColor: theme.colors.primaryLight,
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <Reveal direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.primary,
              }}
            >
              <Search size={14} />
              Find Vendors
            </div>

            <h2
              className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              style={{
                color: theme.colors.text,
              }}
            >
              Find the perfect vendors
              <span
                className="block"
                style={{
                  color: theme.colors.primary,
                }}
              >
                for your wedding
              </span>
            </h2>

            <p
              className="mt-4 text-sm leading-6 sm:text-base"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Choose your location and service to discover
              trusted wedding professionals.
            </p>
          </div>
        </Reveal>

        {/* Search Box */}
        <Reveal direction="up" delay={120}>
          <div
            className="mx-auto mt-8 w-full max-w-5xl rounded-[24px] border bg-white p-3 shadow-xl sm:mt-10 sm:rounded-[28px] sm:p-4"
            style={{
              borderColor: theme.colors.border,
            }}
          >
            <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_auto]">

              {/* LOCATION */}
              <div
                className="flex min-h-[64px] min-w-0 items-center rounded-[18px] border px-4 sm:px-5"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                }}
              >
                <div
                  className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: theme.colors.primaryLight,
                    color: theme.colors.primary,
                  }}
                >
                  <MapPin size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{
                      color: theme.colors.mutedText,
                    }}
                  >
                    Location
                  </p>

                  <Select
                    value={location}
                     onValueChange={(value) => setLocation(value ?? "")}
                  >
                    <SelectTrigger
                      className="h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none outline-none focus:ring-0 focus:ring-offset-0"
                      style={{
                        color: location
                          ? theme.colors.text
                          : theme.colors.mutedText,
                      }}
                    >
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>

                    <SelectContent
                      className="z-[9999] rounded-xl border bg-white shadow-xl"
                      style={{
                        borderColor: theme.colors.border,
                      }}
                    >
                      {locations.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.name}
                          className="cursor-pointer rounded-lg py-2.5"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* CATEGORY */}
              <div
                className="flex min-h-[64px] min-w-0 items-center rounded-[18px] border px-4 sm:px-5"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                }}
              >
                <div
                  className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: theme.colors.primaryLight,
                    color: theme.colors.primary,
                  }}
                >
                  <Search size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{
                      color: theme.colors.mutedText,
                    }}
                  >
                    What are you looking for?
                  </p>

                  <Select
                    value={category}
                     onValueChange={(value) => setCategory(value ?? "")}
                  >
                    <SelectTrigger
                      className="h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none outline-none focus:ring-0 focus:ring-offset-0"
                      style={{
                        color: category
                          ? theme.colors.text
                          : theme.colors.mutedText,
                      }}
                    >
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>

                    <SelectContent
                      className="z-[9999] rounded-xl border bg-white shadow-xl"
                      style={{
                        borderColor: theme.colors.border,
                      }}
                    >
                      {categories.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="cursor-pointer rounded-lg py-2.5"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <LoadingLink
                href={searchHref}
                className="min-h-[64px] w-full rounded-[18px] px-7 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:min-w-[175px] lg:w-auto"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                <Search size={18} />
                <span className="ml-2">
                  Find Vendors
                </span>
              </LoadingLink>
            </div>

            {/* Selected values */}
            {(location || category) && (
              <div className="mt-3 flex flex-wrap gap-2 px-1">
                {location && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-medium"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                  >
                    <MapPin
                      size={13}
                      style={{
                        color: theme.colors.primary,
                      }}
                    />
                    {location}
                  </span>
                )}

                {category && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-medium"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                  >
                    <Search
                      size={13}
                      style={{
                        color: theme.colors.primary,
                      }}
                    />

                    {categories.find(
                      (item) => item.id === category,
                    )?.name ?? category}
                  </span>
                )}
              </div>
            )}
          </div>
        </Reveal>

        {/* Browse all */}
        <Reveal direction="up" delay={220}>
          <div className="mt-6 text-center">
            <LoadingLink
              href="/vendors"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{
                color: theme.colors.primary,
              }}
            >
              Browse all vendors
              <ArrowRight size={16} />
            </LoadingLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}