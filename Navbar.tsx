import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/content";
import { lockScroll } from "@/hooks/useLenis";
import { cn } from "@/utils/cn";
import { Magnetic } from "./ui";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  // active section tracking
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-8"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 md:px-6",
            scrolled || open
              ? "glass-dark shadow-deep backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          {/* Brand */}
          <a href="#home" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-forest-900/60">
              <span className="font-display text-base font-bold text-gold-300">{site.initials}</span>
              <span className="absolute inset-0 rounded-full border border-gold-400/0 transition-all duration-500 group-hover:scale-125 group-hover:border-gold-400/40" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold text-ivory-50">{site.brand}</span>
              <span className="mt-0.5 text-[9px] uppercase tracking-[0.32em] text-gold-300/80">
                Developer · Designer
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
                    active === l.href ? "text-gold-300" : "text-ivory-100/70 hover:text-ivory-50",
                  )}
                >
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gold-400/10 ring-1 ring-gold-400/25"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <a
                href="#contact"
                className="hover-glow-gold group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-[length:200%_auto] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-900 shadow-gold transition-all duration-700 hover:bg-right"
              >
                Hire Me
                <span className="h-1.5 w-1.5 rounded-full bg-forest-800 transition-transform duration-500 group-hover:scale-150" />
              </a>
            </Magnetic>

            {/* Burger */}
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ivory-100/15 bg-forest-900/40 lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-ivory-50 transition-all duration-500",
                  open ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-ivory-50 transition-all duration-500",
                  open ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-forest-950 px-8 grain lg:hidden"
          >
            <div className="pointer-events-none absolute right-[-20%] top-[-10%] h-[60vmin] w-[60vmin] rounded-full bg-gold-400/10 blur-[100px]" />
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="font-display text-sm text-gold-400">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl text-ivory-50 transition-colors group-hover:text-gold-300 sm:text-5xl">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-ivory-200/50"
            >
              <span className="h-px w-10 bg-gold-400/50" />
              {site.location}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
