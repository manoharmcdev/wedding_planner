"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { theme } from "@/config/theme";
import LoadingLink from "@/components/common/LoadingLink";
import Reveal from "@/components/common/Reveal";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface CategoriesListingProps {
  categories: Category[];
}

export default function CategoriesListing({
  categories,
}: CategoriesListingProps) {
  return (
    <main>
      {/* Header */}
      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{
          backgroundColor: theme.colors.primaryLight,
        }}
      >
        <div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40"
          style={{
            backgroundColor: theme.colors.secondary,
          }}
        />

        <div
          className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full opacity-30"
          style={{
            backgroundColor: theme.colors.secondary,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal direction="down">
            <span
              className="inline-flex rounded-full border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.primary,
              }}
            >
              Explore categories
            </span>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <h1
              className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl"
              style={{
                color: theme.colors.text,
              }}
            >
              Everything you need for your
              <span
                className="block"
                style={{
                  color: theme.colors.primary,
                }}
              >
                perfect wedding
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <p
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Explore wedding vendors by category and discover the
              right professionals for every part of your celebration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section
        className="py-20 sm:py-24"
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length === 0 ? (
            <div className="rounded-3xl border bg-white p-12 text-center">
              <p
                className="text-sm"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                No categories available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const directions: Array<
                  "left" | "right" | "up" | "down"
                > = ["left", "right", "up", "down"];

                return (
                  <Reveal
                    key={category.id}
                    direction={directions[index % directions.length]}
                    delay={(index % 4) * 100}
                  >
                    <article
                      className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                      style={{
                        borderColor: theme.colors.border,
                      }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="flex h-full items-center justify-center"
                            style={{
                              backgroundColor:
                                theme.colors.primaryLight,
                            }}
                          >
                            <span
                              className="font-display text-3xl"
                              style={{
                                color: theme.colors.primary,
                              }}
                            >
                              {category.name.charAt(0)}
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                            Wedding Category
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h2
                          className="font-display text-2xl"
                          style={{
                            color: theme.colors.text,
                          }}
                        >
                          {category.name}
                        </h2>

                        {category.description && (
                          <p
                            className="mt-3 line-clamp-2 text-sm leading-6"
                            style={{
                              color: theme.colors.mutedText,
                            }}
                          >
                            {category.description}
                          </p>
                        )}

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <div
                            className="flex items-center gap-2 text-xs font-medium"
                            style={{
                              color: theme.colors.success,
                            }}
                          >
                            <CheckCircle2 size={15} />
                            Trusted vendors
                          </div>

                          <LoadingLink
                            href={`/vendors?category=${encodeURIComponent(
                              category.id,
                            )}`}
                            className="group/button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            style={{
                              backgroundColor: theme.colors.primary,
                            }}
                          >
                            Explore
                            <ArrowUpRight
                              size={15}
                              className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                            />
                          </LoadingLink>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}