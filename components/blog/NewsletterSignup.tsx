"use client";

import { useState, FormEvent } from "react";
import { Mail, ArrowRight, Check, AlertCircle } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
  className?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({
  variant = "card",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setState("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setState("success");
        setEmail("");
      } else {
        setState("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (variant === "inline") {
    return (
      <div className={className}>
        {state === "success" ? (
          <div className="flex items-center gap-2 text-green-800 font-mono text-sm">
            <Check size={16} />
            Thanks for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="your@email.com"
                className="w-full min-w-0 pl-10 pr-4 py-2 rounded-full bg-background border border-rule text-foreground placeholder:text-muted-foreground font-mono text-sm focus:border-air transition-colors"
                disabled={state === "loading"}
                required
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              aria-label="Subscribe"
              className="btn btn-primary px-4 disabled:opacity-50"
            >
              {state === "loading" ? "..." : <ArrowRight size={16} />}
            </button>
          </form>
        )}
        {state === "error" && (
          <p className="mt-2 text-red-700 text-xs font-mono flex items-center gap-1">
            <AlertCircle size={12} />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`p-6 bg-card border ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-rose-tint">
          <Mail size={20} className="text-primary" />
        </div>
        <div>
          <h4 className="font-serif font-medium text-xl">Stay Updated</h4>
          <p className="text-muted-foreground text-xs font-mono">
            No spam, unsubscribe anytime
          </p>
        </div>
      </div>

      {state === "success" ? (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-800 font-mono text-sm">
          <Check size={16} />
          Thanks for subscribing! Check your inbox.
        </div>
      ) : (
        <>
          <p className="text-muted-foreground text-sm mb-4">
            Get notified about new blog posts on software engineering,
            architecture, and building products.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="your@email.com"
                className="w-full min-w-0 pl-10 pr-4 py-3 rounded-full bg-background border border-rule text-foreground placeholder:text-muted-foreground font-mono text-sm focus:border-air transition-colors"
                disabled={state === "loading"}
                required
              />
            </div>

            {state === "error" && (
              <p className="text-red-700 text-xs font-mono flex items-center gap-1">
                <AlertCircle size={12} />
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {state === "loading" ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
