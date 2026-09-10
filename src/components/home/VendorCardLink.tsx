"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import type { MouseEvent } from "react";
import { useState } from "react";

import Link from "next/link";

import { theme } from "@/config/theme";

interface VendorCardLinkProps {
  href: string;
}

export default function VendorCardLink({
  href,
}: VendorCardLinkProps) {
  const [loading, setLoading] = useState(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (loading) {
      event.preventDefault();
      return;
    }

    setLoading(true);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-disabled={loading}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        loading ? "pointer-events-none opacity-90" : ""
      }`}
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {loading ? (
        <>
          <LoaderCircle size={17} className="animate-spin" />
          Opening...
        </>
      ) : (
        <>
          View Vendor
          <ArrowUpRight size={17} />
        </>
      )}
    </Link>
  );
}