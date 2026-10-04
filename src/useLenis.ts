import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Lock / unlock page scrolling (works with and without Lenis). */
export function lockScroll(lock: boolean) {
  document.body.style.overflow = lock ? "hidden" : "";
  if (lenisInstance) {
    if (lock) lenisInstance.stop();
    else lenisInstance.start();
  }
}

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.3,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");
    // respect a lock that was requested before Lenis existed (preloader)
    if (document.body.style.overflow === "hidden") lenis.stop();

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor navigation through lenis for a buttery scroll
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("a[href^='#']") as
        | HTMLAnchorElement
        | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.6, force: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisInstance = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);
}
