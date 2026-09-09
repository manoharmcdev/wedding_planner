"use client";

import { useEffect } from "react";

export default function RouteLoaderProvider() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      const link = target.closest("a");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      // Ignore external links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//")
      ) {
        return;
      }

      // Ignore hash links
      if (href.startsWith("#")) {
        return;
      }

      // Ignore new-tab / modified clicks
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      // Ignore downloads
      if (link.hasAttribute("download")) {
        return;
      }

      // Ignore same-page URL
      const currentUrl =
        window.location.pathname + window.location.search;

      if (href === currentUrl) {
        return;
      }

      window.dispatchEvent(
        new CustomEvent("route-loading-start"),
      );

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("route-loading-stop"),
        );
      }, 1500);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}