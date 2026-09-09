"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { theme } from "@/config/theme";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Backend registration will be connected here later.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="signup-name"
          className="mb-2 block text-xs font-semibold"
          style={{
            color: theme.colors.text,
          }}
        >
          Full name
        </label>

        <div className="relative">
          <User
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color: theme.colors.mutedText,
            }}
          />

          <input
            id="signup-name"
            type="text"
            required
            placeholder="Enter your name"
            className="h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-sm outline-none focus:ring-2"
            style={{
              borderColor: theme.colors.border,
            }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-email"
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
            id="signup-email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-sm outline-none focus:ring-2"
            style={{
              borderColor: theme.colors.border,
            }}
          />
        </div>
      </div>

      <PasswordInput
        id="signup-password"
        label="Password"
        valueVisible={showPassword}
        onToggle={() =>
          setShowPassword((value) => !value)
        }
      />

      <PasswordInput
        id="signup-confirm-password"
        label="Confirm password"
        valueVisible={showConfirmPassword}
        onToggle={() =>
          setShowConfirmPassword((value) => !value)
        }
      />

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded"
        />

        <span
          className="text-xs leading-5"
          style={{
            color: theme.colors.mutedText,
          }}
        >
          I agree to the terms and conditions and privacy
          policy.
        </span>
      </label>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        Create Account
        <ArrowRight size={17} />
      </button>
    </form>
  );
}

function PasswordInput({
  id,
  label,
  valueVisible,
  onToggle,
}: {
  id: string;
  label: string;
  valueVisible: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold"
        style={{
          color: theme.colors.text,
        }}
      >
        {label}
      </label>

      <div className="relative">
        <Lock
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{
            color: theme.colors.mutedText,
          }}
        />

        <input
          id={id}
          type={valueVisible ? "text" : "password"}
          required
          placeholder="Enter password"
          className="h-12 w-full rounded-2xl border bg-white pl-11 pr-12 text-sm outline-none focus:ring-2"
          style={{
            borderColor: theme.colors.border,
          }}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl"
          aria-label={
            valueVisible
              ? "Hide password"
              : "Show password"
          }
          style={{
            color: theme.colors.mutedText,
          }}
        >
          {valueVisible ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
}