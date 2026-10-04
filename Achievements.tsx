import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { achievements, certificates, stats } from "@/data/content";
import { lockScroll } from "@/hooks/useLenis";
import { cn } from "@/utils/cn";
import { Counter, Reveal, SectionHeading } from "./ui";

const medals = [
  // laurel / code / palette
  <svg key="a" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 6H4a2 2 0 0 0 0 4h3M17 6h3a2 2 0 0 1 0 4h-3" />
  </svg>,
  <svg key="b" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 1 0 9 9c0-1.5-1.2-2-2.3-2H17a2 2 0 0 1-2-2 2 2 0 0 0-2-2h-1a9 9 0 0 0 0-3z" />
    <circle cx="7.5" cy="10.5" r="1" /><circle cx="9.5" cy="6.5" r="1" /><circle cx="14" cy="6" r="1" /><circle cx="7" cy="14.5" r="1" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
  </svg>,
];

function CertificateCard({
  c,
  i,
  onOpen,
}: {
  c: (typeof certificates)[number];
  i: number;
  onOpen: () => void;
}) {
  const side = i === 0 ? 1 : i === 2 ? -1 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: side * 40 }}
      whileInView={{ opacity: 1, y: 0, rotateY: side * 16 }}
      whileHover={{ rotateY: 0, z: 60, scale: 1.04 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("relative", i === 1 && "lg:-mt-6 lg:z-10")}
    >
      <button onClick={onOpen} className="hover-glow-gold group block w-full text-left">
        <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-gold-300/80 via-gold-500/15 to-gold-300/60 shadow-deep">
          <div className="overflow-hidden rounded-[1.5rem] bg-forest-900">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent opacity-60" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass-dark text-gold-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold-400" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                  Certificate
                </span>
              </div>
              <h4 className="mt-3 font-display text-2xl uppercase tracking-wide text-ivory-50">{c.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ivory-200/60">{c.description}</p>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function Achievements() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  return (
    <section className="relative overflow-hidden bg-forest-950 text-ivory-50">
      <div className="pointer-events-none absolute inset-0 grain-light opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-gold-400/8 blur-[160px]" />

      {/* ---------------- Achievements ---------------- */}
      <div id="achievements" className="relative mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-40">
        {/* stats */}
        <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-ivory-100/10 bg-ivory-100/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="h-full bg-forest-950 px-6 py-8 md:px-10 md:py-10">
                <p className="font-display text-5xl text-gold-gradient md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-ivory-200/55">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-28 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Achievements"
            title="Milestones that shaped the craft."
            description="Training, practice and shipped work — each step adds depth to what I deliver for clients."
            dark
            className="mb-0"
          />
          <div className="space-y-4">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="hover-glow-gold group flex items-center gap-6 rounded-[1.25rem] glass-dark p-6 md:p-7"
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gold-400/30 bg-forest-900/60 text-gold-300 transition-all duration-500 group-hover:border-gold-400/70 group-hover:shadow-gold">
                    {medals[i]}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-2xl text-ivory-50 md:text-3xl">{a.title}</h4>
                      <span className="rounded-full border border-gold-400/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold-300">
                        {a.stat}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ivory-200/65">{a.description}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* big drifting word */}
      <motion.div
        style={{ x }}
        aria-hidden
        className="pointer-events-none mt-24 select-none whitespace-nowrap font-display text-[18vw] leading-none text-ivory-50/[0.035]"
      >
        Certified · Creative · Committed
      </motion.div>

      {/* ---------------- Certificates ---------------- */}
      <div id="certificates" className="relative mx-auto max-w-7xl px-6 pb-28 pt-10 md:px-10 md:pb-40">
        <SectionHeading
          eyebrow="Certificates"
          title="Verified skills, proudly earned."
          description="Formal completion certificates in programming, website design and graphics design."
          dark
          align="center"
        />
        <div className="grid gap-8 perspective-2000 lg:grid-cols-3 lg:gap-6">
          {certificates.map((c, i) => (
            <CertificateCard key={c.title} c={c} i={i} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-xl md:p-10"
            data-lenis-prevent
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-ivory-100/20 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-[1.5rem] p-[1px] bg-gradient-to-br from-gold-300/70 via-gold-500/10 to-gold-300/50"
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-forest-900">
                <img
                  src={certificates[open].image}
                  alt={certificates[open].title}
                  className="max-h-[80vh] w-full object-contain"
                />
                <div className="flex items-center justify-between px-6 py-4">
                  <h4 className="font-display text-2xl uppercase tracking-wide text-ivory-50">
                    {certificates[open].title}
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-300">
                    {certificates[open].description}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
