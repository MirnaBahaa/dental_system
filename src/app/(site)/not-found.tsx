import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  noIndex: true
});

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-md px-4 text-center">
        <p className="mb-4 text-lg font-semibold text-accent">404</p>
        <h1 className="mb-4 font-serif text-4xl text-primary">Page Not Found</h1>
        <p className="mb-8 text-lg text-primary/70">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
