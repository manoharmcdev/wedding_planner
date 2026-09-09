import {
  BadgeCheck,
  HeartHandshake,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

import Reveal from "@/components/common/Reveal";
import { theme } from "@/config/theme";

const benefits = [
  {
    icon: SearchCheck,
    title: "Find the right vendors",
    description:
      "Discover wedding professionals by category and location, making it easier to find the right fit for your celebration.",
  },
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    description:
      "Explore trusted vendor profiles with verified information and transparent reviews.",
  },
  {
    icon: BadgeCheck,
    title: "Everything in one place",
    description:
      "Browse vendor profiles, services, portfolios and reviews without jumping between different platforms.",
  },
  {
    icon: HeartHandshake,
    title: "Connect with confidence",
    description:
      "Unlock direct vendor contact details securely when you are ready to start a conversation.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        backgroundColor: theme.colors.primaryLight,
      }}
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{
          backgroundColor: theme.colors.secondary,
          opacity: 0.35,
        }}
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{
          backgroundColor: theme.colors.secondary,
          opacity: 0.3,
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <Reveal direction="up" distance={50}>
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: theme.colors.primary,
              }}
            >
              Why choose us
            </p>

            <h2
              className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl"
              style={{
                color: theme.colors.text,
              }}
            >
              Your wedding journey,
              <br />
              made beautifully simple
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Everything you need to discover, compare and
              connect with wedding professionals in one
              beautiful place.
            </p>
          </div>
        </Reveal>

        {/* Benefits */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <Reveal
                key={benefit.title}
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
                delay={index * 90}
              >
                <article
                  className="group h-full rounded-[24px] border bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl sm:p-7"
                  style={{
                    borderColor: theme.colors.border,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor:
                        theme.colors.primaryLight,
                      color: theme.colors.primary,
                    }}
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Number */}
                  <p
                    className="mt-7 text-xs font-semibold tracking-[0.18em]"
                    style={{
                      color: theme.colors.gold,
                    }}
                  >
                    0{index + 1}
                  </p>

                  {/* Title */}
                  <h3
                    className="mt-2 font-display text-2xl leading-tight"
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mt-4 text-sm leading-6"
                    style={{
                      color: theme.colors.mutedText,
                    }}
                  >
                    {benefit.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="mt-7 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-20"
                    style={{
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom trust statement */}
        <Reveal direction="up" distance={40} delay={150}>
          <div
            className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center gap-4 rounded-[24px] border bg-white px-6 py-6 text-center sm:flex-row sm:text-left"
            style={{
              borderColor: theme.colors.border,
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: theme.colors.primaryLight,
                color: theme.colors.primary,
              }}
            >
              <HeartHandshake size={23} />
            </div>

            <div>
              <p
                className="font-display text-xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Plan with confidence
              </p>

              <p
                className="mt-1 text-sm leading-6"
                style={{
                  color: theme.colors.mutedText,
                }}
              >
                Take your time exploring vendors and connect
                directly when you find the right match.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}