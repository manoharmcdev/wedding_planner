"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import LoadingLink from "@/components/common/LoadingLink";
import { theme } from "@/config/theme";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface LocationOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

const locations: LocationOption[] = [
  { id: "bangalore", name: "Bangalore" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "chennai", name: "Chennai" },
  { id: "mumbai", name: "Mumbai" },
  { id: "delhi", name: "Delhi" },
  { id: "pune", name: "Pune" },
  { id: "mysore", name: "Mysore" },
];

const categories: CategoryOption[] = [
  { id: "photographers", name: "Photographers" },
  { id: "videographers", name: "Videographers" },
  { id: "makeup-artists", name: "Makeup Artists" },
  { id: "wedding-venues", name: "Wedding Venues" },
  { id: "decorators", name: "Decorators" },
  { id: "mehendi-artists", name: "Mehendi Artists" },
  { id: "bridal-wear", name: "Bridal Wear" },
  { id: "groom-wear", name: "Groom Wear" },
];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const selectedLocation = useMemo(
    () => locations.find((item) => item.id === location),
    [location],
  );

  const selectedCategory = useMemo(
    () => categories.find((item) => item.id === category),
    [category],
  );

  const searchHref = useMemo(() => {
    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    if (category) {
      params.set("category", category);
    }

    const query = params.toString();

    return query ? `/vendors?${query}` : "/vendors";
  }, [location, category]);

  return (
    <section
      className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(41,37,36,0.88) 0%, rgba(41,37,36,0.68) 42%, rgba(41,37,36,0.28) 100%)",
        }}
      />

      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-[-120px] top-[15%] h-[350px] w-[350px] rounded-full opacity-30 blur-3xl"
        style={{
          backgroundColor: theme.colors.primary,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-[760px]">
          {/* Badge */}
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md"
            style={{
              borderColor: "rgba(255,255,255,0.28)",
              backgroundColor: "rgba(255,255,255,0.10)",
              color: "#fff",
            }}
          >
            <Sparkles
              size={15}
              style={{
                color: theme.colors.secondary,
              }}
            />

            <span>India&apos;s premium wedding marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Everything you need
            <br />
            for your{" "}
            <span
              style={{
                color: theme.colors.secondary,
              }}
            >
              perfect wedding
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[650px] text-base leading-7 text-white/80 sm:text-lg">
            Discover trusted wedding vendors, compare services and find the
            perfect professionals to make your special day unforgettable.
          </p>

          {/* Search box */}
          <div
            className="mt-9 w-full rounded-[24px] p-3 shadow-2xl backdrop-blur-xl sm:p-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.96)",
            }}
          >
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_auto]">
              {/* LOCATION */}
              <div className="relative min-w-0">
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                  <MapPin
                    size={19}
                    style={{
                      color: theme.colors.primary,
                    }}
                  />
                </div>

                <Combobox
                  value={location}
                  onValueChange={(value) => {
                    setLocation(value ?? "");
                  }}
                >
                  <ComboboxInput
                    placeholder="Where is your wedding?"
                    className="h-14 w-full rounded-xl border-0 bg-[#fffaf7] pl-11 pr-10 text-sm font-medium text-stone-800 shadow-none outline-none placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-[#b23a5b]/20"
                  />

                  {!location && (
                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  )}

                  <ComboboxContent
                    className="z-[100] w-[240px] rounded-xl border border-stone-200 bg-white p-1 shadow-xl"
                    align="start"
                    sideOffset={6}
                  >
                    <ComboboxList className="max-h-[240px] overflow-y-auto">
                      {locations.map((item) => (
                        <ComboboxItem
                          key={item.id}
                          value={item.id}
                          className="cursor-pointer rounded-lg px-3 py-3 text-sm text-stone-700 outline-none data-[highlighted]:bg-[#f9e8ed] data-[highlighted]:text-[#8f2947]"
                        >
                          <span className="flex min-w-0 flex-1 items-center gap-3">
                            <MapPin
                              size={16}
                              className="shrink-0 text-stone-400"
                            />

                            <span className="truncate">
                              {item.name}
                            </span>
                          </span>

                          {location === item.id && (
                            <Check
                              size={16}
                              className="shrink-0"
                              style={{
                                color: theme.colors.primary,
                              }}
                            />
                          )}
                        </ComboboxItem>
                      ))}

                      <ComboboxEmpty className="px-3 py-3 text-sm text-stone-500">
                        No location found.
                      </ComboboxEmpty>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              {/* CATEGORY */}
              <div className="relative min-w-0">
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                  <Search
                    size={19}
                    style={{
                      color: theme.colors.primary,
                    }}
                  />
                </div>

                <Combobox
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value ?? "");
                  }}
                >
                  <ComboboxInput
                    placeholder="What are you looking for?"
                    className="h-14 w-full rounded-xl border-0 bg-[#fffaf7] pl-11 pr-10 text-sm font-medium text-stone-800 shadow-none outline-none placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-[#b23a5b]/20"
                  />

                  {!category && (
                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  )}

                  <ComboboxContent
                    className="z-[100] w-[240px] rounded-xl border border-stone-200 bg-white p-1 shadow-xl"
                    align="start"
                    sideOffset={6}
                  >
                    <ComboboxList className="max-h-[240px] overflow-y-auto">
                      {categories.map((item) => (
                        <ComboboxItem
                          key={item.id}
                          value={item.id}
                          className="cursor-pointer rounded-lg px-3 py-3 text-sm text-stone-700 outline-none data-[highlighted]:bg-[#f9e8ed] data-[highlighted]:text-[#8f2947]"
                        >
                          <span className="flex min-w-0 flex-1 items-center gap-3">
                            <Search
                              size={16}
                              className="shrink-0 text-stone-400"
                            />

                            <span className="truncate">
                              {item.name}
                            </span>
                          </span>

                          {category === item.id && (
                            <Check
                              size={16}
                              className="shrink-0"
                              style={{
                                color: theme.colors.primary,
                              }}
                            />
                          )}
                        </ComboboxItem>
                      ))}

                      <ComboboxEmpty className="px-3 py-3 text-sm text-stone-500">
                        No category found.
                      </ComboboxEmpty>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              {/* SEARCH BUTTON */}
              <LoadingLink
                href={searchHref}
                className="h-14 w-full rounded-xl px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg lg:w-auto"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                <span>Search Vendors</span>

                <ArrowRight
                  size={17}
                  className="ml-2"
                />
              </LoadingLink>
            </div>

            {/* Selected filters */}
            {(selectedLocation || selectedCategory) && (
              <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
                {selectedLocation && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f9e8ed] px-3 py-1.5 text-xs font-medium text-[#8f2947]">
                    <MapPin size={13} />
                    {selectedLocation.name}
                  </div>
                )}

                {selectedCategory && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f9e8ed] px-3 py-1.5 text-xs font-medium text-[#8f2947]">
                    <Search size={13} />
                    {selectedCategory.name}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Popular searches */}
          <div className="mt-7">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
              <CalendarDays size={15} />

              <span>Popular searches</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className="rounded-full border px-4 py-2 text-xs font-medium text-white transition hover:bg-white hover:text-stone-800"
                  style={{
                    borderColor: "rgba(255,255,255,0.28)",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
        style={{
          background:
            "linear-gradient(to top, rgba(255,250,247,1), rgba(255,250,247,0))",
        }}
      />
    </section>
  );
}