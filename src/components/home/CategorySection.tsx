import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { getCategories } from "@/services/categoryService";
import Reveal from "@/components/common/Reveal";
import LoadingLink from "@/components/common/LoadingLink";

export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-52 top-20 h-[420px] w-[420px] rounded-full bg-primary-light/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-52 bottom-10 h-[480px] w-[480px] rounded-full bg-secondary/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal direction="left" distance={70}>
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Explore services
              </div>

              <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Everything for your
                <span className="mt-1 block text-primary">
                  perfect celebration
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                From finding your dream venue to choosing the perfect
                photographer, discover trusted wedding professionals in one
                beautiful place.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" distance={50}>
            <Link
              href="/categories"
              className="group hidden items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md lg:inline-flex"
            >
              View all categories

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Category cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:grid-cols-6">
          {categories.map((category, index) => {
            const direction =
              index % 4 === 0
                ? "left"
                : index % 4 === 1
                  ? "right"
                  : index % 4 === 2
                    ? "up"
                    : "down";

            return (
              <Reveal
                key={category.id}
                direction={direction}
                distance={45}
                delay={index * 90}
                className="h-full"
              >
                <LoadingLink
                  href={`/vendors?category=${encodeURIComponent(
                    category.slug,
                  )}`}
                  className="group block h-full"
                >
                  <article className="relative h-full overflow-hidden rounded-[22px] border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    {/* Fixed card size */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Subtle hover glow */}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Number */}
                      <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/20 text-[10px] font-semibold text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Arrow */}
                      <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/60">
                          Wedding service
                        </p>

                        <h3 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                          {category.name}
                        </h3>

                        <div className="mt-3 h-px w-0 bg-white/50 transition-all duration-500 group-hover:w-full" />

                        <p className="mt-2 translate-y-2 text-[11px] text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/70">
                          Discover professionals
                        </p>
                      </div>
                    </div>
                  </article>
                </LoadingLink>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile / tablet CTA */}
        <Reveal direction="up" delay={300}>
          <div className="mt-9 flex justify-center lg:hidden">
            <Link
              href="/categories"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-lg"
            >
              View all categories

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}