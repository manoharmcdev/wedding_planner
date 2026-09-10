"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import Reveal from "@/components/common/Reveal";
import LoadingLink from "@/components/common/LoadingLink";
import { theme } from "@/config/theme";
import { getCategories } from "@/services/categoryService";
import type { Category } from "@/types/category";

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const visibleCategories = categories.slice(0, 6);

  return (
    <section
      id="categories"
      className="w-full overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* ================================
            HEADER
        ================================= */}

        <Reveal direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.primary,
              }}
            >
              <Sparkles size={14} />
              Explore Services
            </div>

            <h2
              className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              style={{
                color: theme.colors.text,
              }}
            >
              Everything for your
              <span
                className="block"
                style={{
                  color: theme.colors.primary,
                }}
              >
                perfect celebration
              </span>
            </h2>

            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-6 sm:text-base"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Discover trusted wedding professionals for every
              important moment of your celebration.
            </p>
          </div>
        </Reveal>

        {/* ================================
            LOADING
        ================================= */}

        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[220px] w-full animate-pulse rounded-2xl bg-stone-200 sm:h-[280px] lg:h-[330px]"
              />
            ))}
          </div>
        )}

        {/* ================================
            CATEGORIES
        ================================= */}

        {!loading && visibleCategories.length > 0 && (
          <div className="mt-8 grid w-full grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-6 lg:gap-4">

            {visibleCategories.map((category, index) => (
              <Reveal
                key={category.id}
                direction={
                  index % 4 === 0
                    ? "left"
                    : index % 4 === 1
                      ? "up"
                      : index % 4 === 2
                        ? "right"
                        : "down"
                }
                delay={index * 80}
                className="w-full min-w-0"
              >
                <LoadingLink
                  href={`/vendors?category=${encodeURIComponent(
                    category.id,
                  )}`}
                  className="group block w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  {/* IMAGE */}

                  <div className="relative h-[260px] w-full overflow-hidden bg-stone-100 sm:h-[300px] lg:h-[330px]">

                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        priority={index < 2}
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 16vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundColor:
                            theme.colors.primaryLight,
                          color: theme.colors.primary,
                        }}
                      >
                        <Sparkles size={32} />
                      </div>
                    )}

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* NUMBER */}

                    <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-semibold shadow-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* CONTENT */}

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-xl font-semibold leading-tight text-white lg:text-lg xl:text-xl">
                        {category.name}
                      </h3>

                      <p className="mt-2 hidden line-clamp-2 text-xs leading-5 text-white/80 lg:block">
                        {category.description}
                      </p>

                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                        Explore
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </LoadingLink>
              </Reveal>
            ))}
          </div>
        )}

        {/* ================================
            EMPTY STATE
        ================================= */}

        {!loading && visibleCategories.length === 0 && (
          <div className="mt-10 rounded-2xl border bg-white p-8 text-center">
            <p
              className="text-sm"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              No categories available right now.
            </p>
          </div>
        )}

        {/* ================================
            VIEW ALL
        ================================= */}

        {!loading && visibleCategories.length > 0 && (
          <Reveal direction="up" delay={300}>
            <div className="mt-8 text-center sm:mt-10">
              <LoadingLink
                href="/categories"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border bg-white px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.primary,
                }}
              >
                View All Categories
                <ArrowRight size={16} />
              </LoadingLink>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}