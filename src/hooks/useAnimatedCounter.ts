"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface UseAnimatedCounterOptions {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

/**
 * Animates a number from start → end when the element scrolls into view.
 * Great for stats sections ("500+ clients", "10 years experience").
 *
 * @example
 * const { count, ref } = useAnimatedCounter({ end: 500, duration: 2000 })
 * return <span ref={ref}>{count}+</span>
 */
export function useAnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  decimals = 0
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now() + delay;
    const difference = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + difference * easeProgress;

      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, start, duration, delay, decimals]);

  return { count, ref };
}

/**
 * Returns scroll progress as a percentage (0–100).
 * Useful for reading progress bars or scroll-based animations.
 *
 * @example
 * const progress = useScrollProgress()
 * return <div style={{ width: `${progress}%` }} />
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

/**
 * Returns true once the user has scrolled past the given threshold (px).
 * Common use: Navbar shadow/shrink on scroll.
 *
 * @example
 * const isScrolled = useIsScrolled(50)
 * return <nav className={isScrolled ? 'shadow-md' : ''}>
 */
export function useIsScrolled(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}

/**
 * Returns true if the given CSS media query matches.
 * Useful for responsive logic in JS (e.g., mobile menu breakpoint).
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener("change", updateMatches);

    return () => media.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}
