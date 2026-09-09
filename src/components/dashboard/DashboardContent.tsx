"use client";

import {
  CalendarDays,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { theme } from "@/config/theme";
import Reveal from "@/components/common/Reveal";
import ScrollToTop from "@/components/common/ScrollToTop";
import {
  clearStoredUser,
  getStoredUser,
} from "@/services/authService";
import type { User } from "@/types/user";

export default function DashboardContent() {
  const [user, setUser] = useState<User | null>(
    null,
  );

  useEffect(() => {
    const currentUser = getStoredUser();

    if (!currentUser) {
      window.location.replace("/signin");
      return;
    }

    setUser(currentUser);
  }, []);

  function handleLogout() {
    clearStoredUser();
    window.location.replace("/signin");
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4"
          style={{
            borderColor:
              theme.colors.primaryLight,
            borderTopColor:
              theme.colors.primary,
          }}
        />
      </main>
    );
  }

  return (
    <>
      <ScrollToTop />

      <main
        className="min-h-screen py-8 sm:py-12"
        style={{
          backgroundColor:
            theme.colors.background,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <Reveal direction="down">
            <section
              className="relative overflow-hidden rounded-3xl p-6 shadow-xl sm:p-9"
              style={{
                backgroundColor:
                  theme.colors.primary,
              }}
            >
              <div
                className="absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-20"
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              />

              <div
                className="absolute -bottom-32 right-32 h-48 w-48 rounded-full opacity-10"
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              />

              <div className="relative">
                <p className="text-sm font-medium text-white/75">
                  Welcome back
                </p>

                <h1 className="mt-2 break-words font-display text-4xl leading-tight text-white sm:text-5xl">
                  {user.name}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
                  Manage your wedding planning,
                  favourite vendors and enquiries
                  from your personal dashboard.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={<Heart size={20} />}
              label="Favourite Vendors"
              value="0"
              delay={0}
            />

            <StatCard
              icon={<MessageSquare size={20} />}
              label="Enquiries"
              value="0"
              delay={100}
            />

            <StatCard
              icon={<ShieldCheck size={20} />}
              label="Contacts Unlocked"
              value="0"
              delay={200}
            />

            <StatCard
              icon={<CalendarDays size={20} />}
              label="Wedding Date"
              value="Not Set"
              delay={300}
            />
          </div>

          {/* Content */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* Activity */}
            <Reveal direction="left">
              <section
                className="rounded-3xl border bg-white p-5 shadow-sm sm:p-7"
                style={{
                  borderColor:
                    theme.colors.border,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{
                    color:
                      theme.colors.primary,
                  }}
                >
                  Your activity
                </p>

                <h2
                  className="mt-2 font-display text-3xl"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  Wedding planning
                </h2>

                <div className="mt-6 rounded-2xl border border-dashed p-6 text-center sm:p-8">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        theme.colors.primaryLight,
                      color:
                        theme.colors.primary,
                    }}
                  >
                    <Heart size={23} />
                  </div>

                  <h3
                    className="mt-5 font-display text-2xl"
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    Start planning your wedding
                  </h3>

                  <p
                    className="mx-auto mt-2 max-w-md text-sm leading-6"
                    style={{
                      color:
                        theme.colors.mutedText,
                    }}
                  >
                    Browse vendors and save the
                    ones you love. Your activity
                    will appear here as you plan.
                  </p>

                  <Link
                    href="/vendors"
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      backgroundColor:
                        theme.colors.primary,
                    }}
                  >
                    <Search size={16} />
                    Explore Vendors
                  </Link>
                </div>
              </section>
            </Reveal>

            {/* Profile */}
            <Reveal direction="right" delay={150}>
              <section
                className="rounded-3xl border bg-white p-5 shadow-sm sm:p-7"
                style={{
                  borderColor:
                    theme.colors.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="font-display text-2xl"
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    My Profile
                  </h2>

                  <Link
                    href="/profile"
                    className="text-xs font-semibold"
                    style={{
                      color:
                        theme.colors.primary,
                    }}
                  >
                    Edit
                  </Link>
                </div>

                <div className="mt-6 flex min-w-0 items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
                    style={{
                      backgroundColor:
                        theme.colors.primary,
                    }}
                  >
                    <UserRound size={24} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="truncate font-semibold"
                      style={{
                        color:
                          theme.colors.text,
                      }}
                    >
                      {user.name}
                    </h3>

                    <p
                      className="truncate text-xs"
                      style={{
                        color:
                          theme.colors.mutedText,
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <ProfileRow
                    icon={<Mail size={16} />}
                    value={user.email}
                  />

                  <ProfileRow
                    icon={<MessageSquare size={16} />}
                    value={user.phone}
                  />

                  <ProfileRow
                    icon={<MapPin size={16} />}
                    value="Wedding location not set"
                  />

                  <ProfileRow
                    icon={<CalendarDays size={16} />}
                    value="Wedding date not set"
                  />
                </div>

                <Link
                  href="/profile"
                  className="mt-6 flex h-11 w-full items-center justify-center rounded-full border text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    borderColor:
                      theme.colors.border,
                    color:
                      theme.colors.primary,
                  }}
                >
                  Manage Profile
                </Link>
              </section>
            </Reveal>
          </div>

          {/* Quick Actions */}
          <Reveal direction="up" delay={200}>
            <section className="mt-7">
              <h2
                className="font-display text-3xl"
                style={{
                  color: theme.colors.text,
                }}
              >
                Quick actions
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <QuickAction
                  href="/vendors"
                  icon={<Search size={20} />}
                  title="Find Vendors"
                  description="Discover wedding professionals."
                />

                <QuickAction
                  href="/categories"
                  icon={<Heart size={20} />}
                  title="Categories"
                  description="Explore wedding services."
                />

                <QuickAction
                  href="/favorites"
                  icon={<Heart size={20} />}
                  title="My Favorites"
                  description="View saved vendors."
                />

                <QuickAction
                  href="/profile"
                  icon={<UserRound size={20} />}
                  title="My Profile"
                  description="Update your information."
                />
              </div>
            </section>
          </Reveal>

          {/* Logout */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-semibold"
              style={{
                color: theme.colors.danger,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <Reveal
      direction="up"
      delay={delay}
    >
      <div
        className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5"
        style={{
          borderColor:
            theme.colors.border,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor:
                theme.colors.primaryLight,
              color:
                theme.colors.primary,
            }}
          >
            {icon}
          </span>

          <span
            className="text-right text-lg font-semibold sm:text-2xl"
            style={{
              color: theme.colors.text,
            }}
          >
            {value}
          </span>
        </div>

        <p
          className="mt-4 text-[11px] font-medium sm:text-xs"
          style={{
            color:
              theme.colors.mutedText,
          }}
        >
          {label}
        </p>
      </div>
    </Reveal>
  );
}

function ProfileRow({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor:
            theme.colors.background,
          color:
            theme.colors.primary,
        }}
      >
        {icon}
      </span>

      <span
        className="truncate text-sm"
        style={{
          color:
            theme.colors.mutedText,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderColor:
          theme.colors.border,
      }}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor:
            theme.colors.primaryLight,
          color:
            theme.colors.primary,
        }}
      >
        {icon}
      </span>

      <h3
        className="mt-4 font-semibold"
        style={{
          color: theme.colors.text,
        }}
      >
        {title}
      </h3>

      <p
        className="mt-1 text-xs leading-5"
        style={{
          color:
            theme.colors.mutedText,
        }}
      >
        {description}
      </p>
    </Link>
  );
}