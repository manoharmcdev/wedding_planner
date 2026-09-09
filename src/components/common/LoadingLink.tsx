"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import type {
  CSSProperties,
  ReactNode,
} from "react";
import { useState } from "react";

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function LoadingLink({
  href,
  children,
  className = "",
  style,
}: LoadingLinkProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center ${
        loading ? "pointer-events-none" : ""
      } ${className}`}
      style={style}
      onClick={() => setLoading(true)}
      aria-disabled={loading}
    >
      {loading ? (
        <>
          <LoaderCircle
            size={17}
            className="animate-spin"
          />
          <span className="ml-2">
            Opening...
          </span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}