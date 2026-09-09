"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { theme } from "@/config/theme";

export default function RouteLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleStop = () => {
      setLoading(false);
    };

    window.addEventListener("route-loading-start", handleStart);
    window.addEventListener("route-loading-stop", handleStop);

    return () => {
      window.removeEventListener("route-loading-start", handleStart);
      window.removeEventListener("route-loading-stop", handleStop);
    };
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div
        className="flex w-[90%] max-w-sm flex-col items-center rounded-[28px] border bg-white px-8 py-9 text-center shadow-2xl"
        style={{
          borderColor: theme.colors.border,
        }}
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            backgroundColor: theme.colors.primaryLight,
          }}
        >
          <div className="relative flex h-12 w-12 items-center justify-center">
            <LoaderCircle
              size={48}
              strokeWidth={2.5}
              className="animate-spin"
              style={{
                color: theme.colors.primary,
              }}
            />

            <span
              className="absolute font-display text-lg font-semibold"
              style={{
                color: theme.colors.primary,
              }}
            >
              W
            </span>
          </div>
        </div>

        <h2
          className="mt-6 font-display text-2xl"
          style={{
            color: theme.colors.text,
          }}
        >
          Loading
        </h2>

        <p
          className="mt-2 text-sm leading-6"
          style={{
            color: theme.colors.mutedText,
          }}
        >
          Please wait while we prepare your page...
        </p>

        <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full w-1/2 animate-pulse rounded-full"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          />
        </div>
      </div>
    </div>
  );
}