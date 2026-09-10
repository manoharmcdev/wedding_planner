"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { theme } from "@/config/theme";
import {
  isFavorite,
  toggleFavorite,
} from "@/services/favoriteService";
import { getStoredUser } from "@/services/authService";

interface FavoriteButtonProps {
  vendorId: string;
  vendorName?: string;
  className?: string;
}

export default function FavoriteButton({
  vendorId,
  vendorName = "vendor",
  className = "",
}: FavoriteButtonProps) {
  const router = useRouter();

  const [favorite, setFavorite] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = getStoredUser();

    setLoggedIn(Boolean(user));

    if (user) {
      setFavorite(isFavorite(vendorId));
    }
  }, [vendorId]);

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const user = getStoredUser();

    /*
     * Login required for favorites.
     */
    if (!user) {
      router.push(
        `/signin?redirect=${encodeURIComponent(window.location.pathname)}`,
      );

      return;
    }

    const nextFavorite = toggleFavorite(vendorId);

    setFavorite(nextFavorite);

    window.dispatchEvent(
      new CustomEvent("wednest-favorites-changed"),
    );
  }

  return (
    <button
      type="button"
      aria-label={
        !loggedIn
          ? `Sign in to favorite ${vendorName}`
          : favorite
            ? `Remove ${vendorName} from favorites`
            : `Add ${vendorName} to favorites`
      }
      aria-pressed={favorite}
      onClick={handleClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 ${className}`}
    >
      <Heart
        size={19}
        fill={favorite ? "currentColor" : "none"}
        style={{
          color: theme.colors.primary,
        }}
      />
    </button>
  );
}