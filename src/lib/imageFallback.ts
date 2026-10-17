import type { SyntheticEvent } from "react";

/**
 * Graceful degradation for remote placeholder photography.
 *
 * When an image fails to load we hide it and tint its positioned parent with
 * one of the `.img-fallback` gradients defined in globals.css. The gradients
 * are built from the design tokens, so no colour values live in component
 * files — swap the palette in one place and every fallback follows.
 */
const VARIANTS = ["f1", "f2", "f3", "f4", "f5"] as const;

export function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  const parent = img.parentElement;
  img.style.display = "none";
  if (!parent) return;
  const variant = VARIANTS[img.src.length % VARIANTS.length];
  parent.classList.add("img-fallback", variant);
}
