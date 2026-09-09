import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { theme } from "@/config/theme";

const quickLinks = [
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

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: theme.footer.background,
        color: theme.footer.text,
        borderColor: theme.footer.border,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xl font-semibold"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: "#FFFFFF",
                }}
              >
                W
              </span>

              <div>
                <div
                  className="font-display text-2xl"
                  style={{
                    color: theme.footer.text,
                  }}
                >
                  {theme.brand.name}
                </div>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: theme.footer.mutedText,
                  }}
                >
                  Wedding Marketplace
                </p>
              </div>
            </Link>

            <p
              className="mt-6 max-w-md text-sm leading-7"
              style={{
                color: theme.footer.mutedText,
              }}
            >
              Everything you need to discover trusted wedding vendors
              and plan your perfect celebration with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold"
              style={{
                color: theme.footer.text,
              }}
            >
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm transition-colors duration-200 hover:text-white"
                  style={{
                    color: theme.footer.mutedText,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold"
              style={{
                color: theme.footer.text,
              }}
            >
              Get in touch
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0"
                  style={{
                    color: theme.colors.secondary,
                  }}
                />

                <span
                  className="text-sm"
                  style={{
                    color: theme.footer.mutedText,
                  }}
                >
                  Wedding Marketplace
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={17}
                  style={{
                    color: theme.colors.secondary,
                  }}
                />

                <span
                  className="text-sm"
                  style={{
                    color: theme.footer.mutedText,
                  }}
                >
                  Contact Support
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={17}
                  style={{
                    color: theme.colors.secondary,
                  }}
                />

                <span
                  className="text-sm"
                  style={{
                    color: theme.footer.mutedText,
                  }}
                >
                  Customer Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className="mt-12 flex flex-col gap-5 border-t pt-7 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: theme.footer.border,
          }}
        >
          <p
            className="text-xs"
            style={{
              color: theme.footer.mutedText,
            }}
          >
            © {new Date().getFullYear()} {theme.brand.name}. All
            rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
              style={{
                color: theme.footer.mutedText,
              }}
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
              style={{
                color: theme.footer.mutedText,
              }}
            >
              Terms
            </Link>
          </div>
        </div>

        {/* Developer Credit */}
        <div
          className="mt-6 border-t pt-5 text-center"
          style={{
            borderColor: theme.footer.border,
          }}
        >
          <p
            className="text-xs tracking-wide"
            style={{
              color: theme.footer.mutedText,
            }}
          >
            Developed by{" "}
            <span
              className="font-semibold"
              style={{
                color: theme.footer.text,
              }}
            >
              Manohar
            </span>{" "}
            <span>·</span>{" "}
            <span>Licensed Software</span>
          </p>
        </div>
      </div>
    </footer>
  );
}