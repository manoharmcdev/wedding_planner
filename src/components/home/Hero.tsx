"use client";

import Link from "next/link";
import { Search, MapPin, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

import { theme } from "@/config/theme";
import Reveal from "@/components/common/Reveal";

const locations = [
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
];

const categories = [
  "Wedding Venues",
  "Photographers",
  "Makeup Artists",
  "Wedding Decor",
  "Mehndi Artists",
  "Wedding Caterers",
];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const searchHref = `/vendors${
    location || category
      ? `?${new URLSearchParams({
          ...(location ? { location } : {}),
          ...(category ? { category } : {}),
        }).toString()}`
      : ""
  }`;

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
          alt="Elegant wedding celebration"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="w-full max-w-4xl">
          <Reveal direction="up" delay={100}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Your wedding. Your story.
            </div>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Find the perfect
              <span className="block text-[#F4D8C8]">
                wedding vendors
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Discover beautiful venues, talented photographers, makeup
              artists, decorators and everything else you need to make your
              celebration unforgettable.
            </p>
          </Reveal>

          {/* Search */}
          <Reveal direction="up" delay={400} className="mt-9">
            <div className="rounded-[24px] border border-white/20 bg-white/95 p-2 shadow-2xl backdrop-blur-xl sm:p-3">
              <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                {/* Location */}
                <div className="relative">
                  <label
                    htmlFor="hero-location"
                    className="sr-only"
                  >
                    Select location
                  </label>

                  <div className="flex h-14 items-center rounded-2xl bg-background px-4">
                    <MapPin className="mr-3 h-5 w-5 shrink-0 text-primary" />

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                        Location
                      </p>

                      <select
                        id="hero-location"
                        value={location}
                        onChange={(event) =>
                          setLocation(event.target.value)
                        }
                        className="mt-0.5 w-full appearance-none bg-transparent text-sm font-medium text-foreground outline-none"
                      >
                        <option value="">Choose location</option>

                        {locations.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
                  </div>
                </div>

                {/* Category */}
                <div className="relative">
                  <label
                    htmlFor="hero-category"
                    className="sr-only"
                  >
                    Select category
                  </label>

                  <div className="flex h-14 items-center rounded-2xl bg-background px-4">
                    <Sparkles className="mr-3 h-5 w-5 shrink-0 text-gold" />

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                        What are you looking for?
                      </p>

                      <select
                        id="hero-category"
                        value={category}
                        onChange={(event) =>
                          setCategory(event.target.value)
                        }
                        className="mt-0.5 w-full appearance-none bg-transparent text-sm font-medium text-foreground outline-none"
                      >
                        <option value="">Choose category</option>

                        {categories.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
                  </div>
                </div>

                {/* Search Button */}
                <Link
                  href={searchHref}
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  <span>Search Vendors</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Bottom text */}
          <Reveal direction="up" delay={500}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
              <span>Popular:</span>

              <Link
                href="/vendors?category=Wedding%20Venues"
                className="border-b border-white/30 pb-0.5 transition hover:border-white hover:text-white"
              >
                Wedding Venues
              </Link>

              <Link
                href="/vendors?category=Photographers"
                className="border-b border-white/30 pb-0.5 transition hover:border-white hover:text-white"
              >
                Photographers
              </Link>

              <Link
                href="/vendors?category=Makeup%20Artists"
                className="border-b border-white/30 pb-0.5 transition hover:border-white hover:text-white"
              >
                Makeup Artists
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom brand mark */}
      <div className="absolute bottom-5 right-5 hidden text-right text-white/60 sm:block">
        <p className="font-display text-lg italic">
          {theme.brand.name}
        </p>
        <p className="text-[9px] uppercase tracking-[0.25em]">
          Wedding Marketplace
        </p>
      </div>
    </section>
  );
}