"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-md px-4 text-center">
        <p className="mb-4 text-lg font-semibold text-accent">Error</p>
        <h1 className="mb-4 font-serif text-4xl text-primary">Something went wrong</h1>
        <p className="mb-8 text-lg text-primary/70">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
