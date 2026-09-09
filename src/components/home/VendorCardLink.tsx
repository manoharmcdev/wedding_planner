"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { theme } from "@/config/theme";

interface VendorCardLinkProps {
  href: string;
}

export default function VendorCardLink({
  href,
}: VendorCardLinkProps) {
  return (
    <Link
      href={href}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      View Vendor
      <ArrowUpRight size={17} />
    </Link>
  );
}