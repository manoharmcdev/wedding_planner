"use client";

import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { theme } from "@/config/theme";
import { clearStoredUser, getStoredUser } from "@/services/authService";
import type { User } from "@/types/user";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Vendors",
    href: "/vendors",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      setUser(getStoredUser());
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    const interval = window.setInterval(loadUser, 500);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.clearInterval(interval);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    clearStoredUser();

    setUser(null);
    setProfileOpen(false);
    setMobileOpen(false);

    router.push("/");
    router.refresh();
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[1000] border-b bg-white/95 backdrop-blur-xl"
      style={{
        borderColor: theme.header.border,
      }}
    >
      {/* Premium top line */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.colors.gold}, transparent)`,
        }}
      />

      <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-3"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl font-display text-lg font-semibold text-white shadow-md"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          >
            W
          </span>

          <div className="hidden sm:block">
            <div
              className="font-display text-xl font-semibold"
              style={{
                color: theme.header.text,
              }}
            >
              {theme.brand.name}
            </div>

            <p
              className="text-[10px] uppercase tracking-[0.15em]"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              Wedding Marketplace
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
              style={{
                color: isActive(item.href)
                  ? theme.header.activeText
                  : theme.header.text,

                backgroundColor: isActive(item.href)
                  ? theme.colors.primaryLight
                  : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Favorites */}
          <Link
            href="/favorites"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: theme.header.text,
            }}
            aria-label="Favorites"
          >
            <Heart size={19} />
          </Link>

          {!user ? (
            <>
              {/* Sign In */}
              <Link
                href="/signin"
                className="flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  color: theme.header.text,
                }}
              >
                <UserRound size={17} />
                Sign In
              </Link>

              {/* Get Started */}
              <Link
                href="/signup"
                className="flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor:
                    theme.header.buttonBackground,
                }}
              >
                Get Started
              </Link>
            </>
          ) : (
            /* Logged-in Profile */
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((value) => !value)
                }
                className="flex h-11 items-center gap-2 rounded-full border px-2 pr-3 transition-all duration-300 hover:shadow-md"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.card,
                }}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{
                    backgroundColor:
                      theme.colors.primary,
                  }}
                >
                  <UserRound size={16} />
                </span>

                <span
                  className="max-w-[100px] truncate text-sm font-semibold"
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  {user.name}
                </span>

                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                  style={{
                    color: theme.colors.mutedText,
                  }}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-[-1] h-screen w-screen cursor-default"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    aria-label="Close profile menu"
                  />

                  <div
                    className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border bg-white shadow-2xl"
                    style={{
                      borderColor:
                        theme.colors.border,
                    }}
                  >
                    {/* User */}
                    <div
                      className="border-b p-4"
                      style={{
                        borderColor:
                          theme.colors.border,
                        backgroundColor:
                          theme.colors.primaryLight,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
                          style={{
                            backgroundColor:
                              theme.colors.primary,
                          }}
                        >
                          <UserRound size={20} />
                        </span>

                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-semibold"
                            style={{
                              color:
                                theme.colors.text,
                            }}
                          >
                            {user.name}
                          </p>

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
                    </div>

                    {/* Menu */}
                    <div className="p-2">
                      <ProfileLink
                        href="/dashboard"
                        label="My Dashboard"
                        icon={<UserRound size={17} />}
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      />

                      <ProfileLink
                        href="/profile"
                        label="My Profile"
                        icon={<UserRound size={17} />}
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      />

                      <ProfileLink
                        href="/favorites"
                        label="My Favorites"
                        icon={<Heart size={17} />}
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-red-50"
                        style={{
                          color:
                            theme.colors.danger,
                        }}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                          <LogOut size={17} />
                        </span>

                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() =>
            setMobileOpen((value) => !value)
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl lg:hidden"
          style={{
            color: theme.header.text,
            backgroundColor:
              theme.colors.primaryLight,
          }}
          aria-label={
            mobileOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t bg-white transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
        style={{
          borderColor: theme.header.border,
        }}
      >
        <nav className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-medium"
                style={{
                  color: isActive(item.href)
                    ? theme.header.activeText
                    : theme.header.text,

                  backgroundColor: isActive(item.href)
                    ? theme.colors.primaryLight
                    : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div
            className="mt-3 border-t pt-4"
            style={{
              borderColor: theme.header.border,
            }}
          >
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={closeMobileMenu}
                  className="flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-semibold"
                  style={{
                    borderColor:
                      theme.colors.border,
                    color: theme.header.text,
                  }}
                >
                  <UserRound size={17} />
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{
                    backgroundColor:
                      theme.header.buttonBackground,
                  }}
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div
                className="rounded-2xl border p-3"
                style={{
                  borderColor:
                    theme.colors.border,
                  backgroundColor:
                    theme.colors.primaryLight,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                    style={{
                      backgroundColor:
                        theme.colors.primary,
                    }}
                  >
                    <UserRound size={18} />
                  </span>

                  <div className="min-w-0">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{
                        color:
                          theme.colors.text,
                      }}
                    >
                      {user.name}
                    </p>

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

                <div className="mt-3 space-y-1">
                  <MobileProfileLink
                    href="/dashboard"
                    label="My Dashboard"
                    onClick={closeMobileMenu}
                  />

                  <MobileProfileLink
                    href="/profile"
                    label="My Profile"
                    onClick={closeMobileMenu}
                  />

                  <MobileProfileLink
                    href="/favorites"
                    label="My Favorites"
                    onClick={closeMobileMenu}
                  />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold"
                    style={{
                      color:
                        theme.colors.danger,
                    }}
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Favorites */}
          <Link
            href="/favorites"
            onClick={closeMobileMenu}
            className="mt-2 flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold"
            style={{
              color: theme.colors.primary,
              backgroundColor:
                theme.colors.primaryLight,
            }}
          >
            <Heart size={17} />
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ProfileLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-stone-50"
      style={{
        color: theme.colors.text,
      }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor:
            theme.colors.primaryLight,
          color: theme.colors.primary,
        }}
      >
        {icon}
      </span>

      {label}
    </Link>
  );
}

function MobileProfileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-xl px-3 py-3 text-sm font-medium"
      style={{
        color: theme.colors.text,
      }}
    >
      {label}
    </Link>
  );
}