import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { graphics } from "@/data/content";
import { lockScroll } from "@/hooks/useLenis";
import { cn } from "@/utils/cn";
import { Ornament, Reveal, SectionHeading, TiltCard } from "./ui";

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const g = graphics[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-xl md:p-10"
      onClick={onClose}
      data-lenis-prevent
    >
      <div className="pointer-events-none absolute inset-0 grain-light opacity-40" />
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-ivory-100/20 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
      {(["prev", "next"] as const).map((d) => (
        <button
          key={d}
          aria-label={d}
          onClick={(e) => {
            e.stopPropagation();
            onNav(d === "next" ? 1 : -1);
          }}
          className={cn(
            "absolute top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-ivory-100/20 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300 md:flex",
            d === "prev" ? "left-6" : "right-6",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
            {d === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
          </svg>
        </button>
      ))}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-full w-full max-w-6xl gap-8 lg:grid-cols-[1.3fr_0.7fr]"
      >
        <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-gold-300/70 via-gold-500/10 to-gold-300/50">
          <div className="overflow-hidden rounded-[1.5rem] bg-forest-900">
            <img src={g.image} alt={g.title} className="max-h-[70vh] w-full object-contain" />
          </div>
        </div>
        <div className="flex flex-col justify-center text-ivory-50">
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
            Calligraphy · {String(index + 1).padStart(2, "0")} / {String(graphics.length).padStart(2, "0")}
          </span>
          <p className="mt-5 font-display text-5xl text-gold-gradient" dir="rtl">
            {g.arabic}
          </p>
          <h3 className="mt-3 font-display text-4xl md:text-5xl">{g.title}</h3>
          <p className="mt-5 text-ivory-200/70">{g.description}</p>
          <Ornament className="mt-8" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Graphics() {
  const [open, setOpen] = useState<number | null>(null);
  const nav = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + graphics.length) % graphics.length)),
    [],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="graphics" className="relative overflow-hidden bg-ivory-50 py-28 md:py-40 grain">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 hairline" />
      <div className="pointer-events-none absolute left-[10%] top-40 h-[50vmin] w-[50vmin] rounded-full bg-gold-200/40 blur-[130px]" />
      <div className="pointer-events-none absolute right-[5%] bottom-20 h-[40vmin] w-[40vmin] rounded-full bg-forest-100/50 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Graphics Designs"
            title="Calligraphy, composed with reverence."
            description="Sacred phrases rendered as modern, premium artwork — balancing tradition, typography and colour."
            className="mb-0 md:mb-0"
          />
          <Reveal delay={0.2} className="lg:pb-6">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-forest-600/70">
              <span className="font-display text-3xl text-gold-600">{graphics.length}</span> pieces · click to view
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-rows:minmax(0,1fr)]">
          {graphics.map((g, i) => (
            <Reveal
              key={g.title}
              delay={(i % 4) * 0.08}
              className={cn(i === 0 && "sm:col-span-2 sm:row-span-2", i >= 5 && "lg:col-span-2")}
            >
              <TiltCard intensity={7} className="h-full rounded-[1.5rem]">
                <button
                  onClick={() => setOpen(i)}
                  className={cn(
                    "hover-glow-gold group relative block h-full w-full overflow-hidden rounded-[1.5rem] bg-forest-900 text-left shadow-card ring-1 ring-forest-800/5",
                    i === 0
                      ? "aspect-square sm:aspect-auto sm:min-h-[560px]"
                      : i >= 5
                        ? "aspect-[4/3] lg:aspect-[2/1]"
                        : "aspect-[4/5] lg:aspect-square",
                  )}
                >
                  <img
                    src={g.image}
                    alt={g.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                  {/* gold frame on hover */}
                  <div className="absolute inset-3 rounded-[1.1rem] border border-gold-300/0 transition-all duration-700 group-hover:border-gold-300/60" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-2xl text-gold-200" dir="rtl">
                      {g.arabic}
                    </p>
                    <div className="mt-1 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl text-ivory-50 md:text-3xl">{g.title}</h3>
                        <p className="mt-1 max-w-xs text-xs leading-relaxed text-ivory-200/70 opacity-0 transition-all duration-700 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                          {g.description}
                        </p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-400/60 text-gold-300 transition-all duration-500 group-hover:bg-gold-400 group-hover:text-forest-900">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
      </AnimatePresence>
    </section>
  );
}
