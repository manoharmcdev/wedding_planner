import { HeartHandshake, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import ScrollToTop from "@/components/common/ScrollToTop";
import { theme } from "@/config/theme";

const values = [
  {
    icon: SearchCheck,
    title: "Discover with ease",
    description:
      "Find wedding professionals by category and location through a simple and beautiful browsing experience.",
  },
  {
    icon: ShieldCheck,
    title: "Choose with confidence",
    description:
      "Explore detailed vendor profiles, services, photos, ratings and reviews before making your decision.",
  },
  {
    icon: HeartHandshake,
    title: "Connect directly",
    description:
      "When you are ready, securely unlock the vendor's direct contact details and start a conversation.",
  },
  {
    icon: Sparkles,
    title: "Plan your celebration",
    description:
      "Bring the important parts of your wedding planning journey together in one convenient marketplace.",
  },
];

export default function AboutPage() {
  return (
    <>
      <ScrollToTop />

      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-20 sm:py-28"
          style={{
            backgroundColor: theme.colors.primaryLight,
          }}
        >
          <div
            className="absolute -left-32 -top-32 h-80 w-80 rounded-full opacity-40"
            style={{
              backgroundColor: theme.colors.secondary,
            }}
          />

          <div
            className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-30"
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
                About {theme.brand.name}
              </span>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <h1
                className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Making wedding planning
                <span
                  className="block"
                  style={{
                    color: theme.colors.primary,
                  }}
                >
                  simpler and more beautiful
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <p
                className="mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                {theme.brand.tagline}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section
          className="py-20 sm:py-24"
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal direction="left">
                <div
                  className="relative overflow-hidden rounded-3xl border"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85"
                    alt="Wedding celebration"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <div
                      className="rounded-2xl px-5 py-4 backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.92)",
                      }}
                    >
                      <p
                        className="font-display text-xl"
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        Your celebration,
                      </p>

                      <p
                        className="text-sm"
                        style={{
                          color: theme.colors.primary,
                        }}
                      >
                        your way.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={150}>
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{
                      color: theme.colors.primary,
                    }}
                  >
                    Our purpose
                  </span>

                  <h2
                    className="mt-4 font-display text-4xl leading-tight sm:text-5xl"
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    A better way to find the people behind your perfect day.
                  </h2>

                  <div
                    className="mt-6 space-y-4 text-sm leading-7"
                    style={{
                      color: theme.colors.mutedText,
                    }}
                  >
                    <p>
                      Planning a wedding involves countless decisions.
                      Finding the right professionals should not be one of
                      the difficult ones.
                    </p>

                    <p>
                      {theme.brand.name} brings wedding vendors together
                      in one marketplace so couples can explore,
                      compare and connect with professionals for their
                      celebration.
                    </p>

                    <p>
                      From discovering a photographer to finding a venue,
                      makeup artist or decorator, our goal is to make the
                      discovery process clear, convenient and enjoyable.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          className="py-20 sm:py-24"
          style={{
            backgroundColor: theme.colors.primaryLight,
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="up">
              <div className="mx-auto max-w-2xl text-center">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{
                    color: theme.colors.primary,
                  }}
                >
                  What we believe
                </span>

                <h2
                  className="mt-4 font-display text-4xl sm:text-5xl"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  Built around your wedding journey
                </h2>

                <p
                  className="mt-4 text-sm leading-7 sm:text-base"
                  style={{
                    color: theme.colors.mutedText,
                  }}
                >
                  Every part of the experience is designed to help you
                  discover the right professionals with less effort.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;

                const directions: Array<
                  "left" | "right" | "up" | "down"
                > = ["left", "right", "up", "down"];

                return (
                  <Reveal
                    key={value.title}
                    direction={directions[index]}
                    delay={index * 100}
                  >
                    <div
                      className="h-full rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                      style={{
                        borderColor: theme.colors.border,
                      }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor: theme.colors.primaryLight,
                          color: theme.colors.primary,
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <h3
                        className="mt-5 font-display text-2xl"
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        {value.title}
                      </h3>

                      <p
                        className="mt-3 text-sm leading-6"
                        style={{
                          color: theme.colors.mutedText,
                        }}
                      >
                        {value.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 sm:py-24"
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal direction="up">
              <div
                className="rounded-3xl border p-8 shadow-xl sm:p-12"
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                }}
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white"
                  style={{
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  <HeartHandshake size={25} />
                </div>

                <h2
                  className="mt-6 font-display text-4xl sm:text-5xl"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  Ready to find your wedding vendors?
                </h2>

                <p
                  className="mx-auto mt-4 max-w-xl text-sm leading-7"
                  style={{
                    color: theme.colors.mutedText,
                  }}
                >
                  Explore our marketplace and discover professionals
                  who can help bring your wedding vision to life.
                </p>

                <div className="mt-7">
                  <a
                    href="/vendors"
                    className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      backgroundColor: theme.colors.primary,
                    }}
                  >
                    Explore Vendors
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}