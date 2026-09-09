"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import type { Theme } from "@/types/theme";

interface ThemeProviderProps {
  children: ReactNode;
  theme: Theme;
}

export default function ThemeProvider({
  children,
  theme,
}: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty(
      "--background",
      theme.colors.background,
    );

    root.style.setProperty(
      "--foreground",
      theme.colors.text,
    );

    root.style.setProperty(
      "--primary",
      theme.colors.primary,
    );

    root.style.setProperty(
      "--primary-dark",
      theme.colors.primaryDark,
    );

    root.style.setProperty(
      "--primary-light",
      theme.colors.primaryLight,
    );

    root.style.setProperty(
      "--secondary",
      theme.colors.secondary,
    );

    root.style.setProperty(
      "--gold",
      theme.colors.gold,
    );

    root.style.setProperty(
      "--card",
      theme.colors.card,
    );

    root.style.setProperty(
      "--muted",
      theme.colors.mutedText,
    );

    root.style.setProperty(
      "--border",
      theme.colors.border,
    );

    root.style.setProperty(
      "--success",
      theme.colors.success,
    );

    root.style.setProperty(
      "--warning",
      theme.colors.warning,
    );

    root.style.setProperty(
      "--danger",
      theme.colors.danger,
    );

    root.style.setProperty(
      "--header-background",
      theme.header.background,
    );

    root.style.setProperty(
      "--header-text",
      theme.header.text,
    );

    root.style.setProperty(
      "--header-active",
      theme.header.activeText,
    );

    root.style.setProperty(
      "--header-border",
      theme.header.border,
    );

    root.style.setProperty(
      "--footer-background",
      theme.footer.background,
    );

    root.style.setProperty(
      "--footer-text",
      theme.footer.text,
    );

    root.style.setProperty(
      "--footer-muted",
      theme.footer.mutedText,
    );

    root.style.setProperty(
      "--footer-border",
      theme.footer.border,
    );
  }, [theme]);

  return <>{children}</>;
}