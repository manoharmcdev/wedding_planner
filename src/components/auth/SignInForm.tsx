"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { theme } from "@/config/theme";
import { signIn } from "@/services/userService";
import { saveUser } from "@/services/authService";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const user = await signIn(email, password);

      if (!user) {
        setError(
          "Invalid email or password. Please use the demo credentials.",
        );
        setLoading(false);
        return;
      }

      saveUser(user);

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  }

  function fillDemoCredentials() {
    setEmail("user@wednest.com");
    setPassword("User@123");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="signin-email"
          className="mb-2 block text-xs font-semibold"
          style={{
            color: theme.colors.text,
          }}
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color: theme.colors.mutedText,
            }}
          />

          <input
            id="signin-email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-sm outline-none transition-all focus:ring-2"
            style={{
              borderColor: theme.colors.border,
            }}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="signin-password"
            className="text-xs font-semibold"
            style={{
              color: theme.colors.text,
            }}
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold"
            style={{
              color: theme.colors.primary,
            }}
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color: theme.colors.mutedText,
            }}
          />

          <input
            id="signin-password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-2xl border bg-white pl-11 pr-12 text-sm outline-none transition-all focus:ring-2"
            style={{
              borderColor: theme.colors.border,
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (value) => !value,
              )
            }
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl"
            style={{
              color: theme.colors.mutedText,
            }}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>
      </div>

      {/* Demo Credentials */}
      <div
        className="rounded-2xl border p-4"
        style={{
          backgroundColor:
            theme.colors.primaryLight,
          borderColor: theme.colors.border,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="text-xs font-semibold"
              style={{
                color: theme.colors.primary,
              }}
            >
              Demo account
            </p>

            <div
              className="mt-2 space-y-1 text-xs"
              style={{
                color: theme.colors.mutedText,
              }}
            >
              <p>
                Email:{" "}
                <strong>
                  user@wednest.com
                </strong>
              </p>

              <p>
                Password:{" "}
                <strong>User@123</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold"
            style={{
              borderColor:
                theme.colors.primary,
              color: theme.colors.primary,
            }}
          >
            Use Demo
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-2xl border p-3 text-xs leading-5"
          style={{
            backgroundColor: "#FEF2F2",
            borderColor: "#FECACA",
            color: theme.colors.danger,
          }}
        >
          {error}
        </div>
      )}

      {/* Login */}
      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-wait disabled:opacity-80"
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}