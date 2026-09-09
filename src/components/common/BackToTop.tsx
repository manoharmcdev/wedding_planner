"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { theme } from "@/config/theme";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-[900] flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 sm:bottom-8 sm:right-8 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}