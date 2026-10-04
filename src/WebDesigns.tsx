import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { liveWebsites, process, projects, webFeatures } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

function Icon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-7 w-7",
  };
  switch (name) {
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
          <path d="M3 17.5l9 5 9-5" />
        </svg>
      );
    case "devices":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="15" height="11" rx="2" />
          <path d="M6 19h7" />
          <rect x="17" y="9" width="5" height="10" rx="1.2" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
          <path d="M19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
  }
}

function FeatureCard({ f, i }: { f: (typeof webFeatures)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const bg = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(260px circle at ${x}px ${y}px, rgba(201,169,97,0.22), transparent 60%)`,
  );
  return (
    <Reveal delay={i * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="hover-glow-gold group relative h-full overflow-hidden rounded-[1.5rem] glass-dark p-8"
      >
        <motion.div
          style={{ background: bg }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/30 bg-forest-900/60 text-gold-300 transition-all duration-500 group-hover:scale-110 group-hover:border-gold-400/70 group-hover:shadow-gold">
              <Icon name={f.icon} />
            </span>
            <span className="font-display text-sm text-ivory-200/40">0{i + 1}</span>
          </div>
          <h3 className="mt-8 font-display text-3xl text-ivory-50">{f.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ivory-200/65">{f.description}</p>
          <div className="mt-8 h-px w-full bg-ivory-100/10">
            <div className="h-full w-0 bg-gold-400 transition-all duration-700 group-hover:w-full" />
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

function BrowserMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [38, 0]), {
    stiffness: 80,
    damping: 20,
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.88, 1]), {
    stiffness: 80,
    damping: 20,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div ref={ref} className="perspective-2000">
      <motion.div
        style={{ rotateX, scale, opacity, transformOrigin: "center top" }}
        className="relative mx-auto max-w-5xl preserve-3d"
      >
        {/* glow */}
        <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gold-400/15 blur-[80px]" />
        <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-gold-300/70 via-gold-500/10 to-gold-300/50 shadow-deep">
          <div className="overflow-hidden rounded-[1.5rem] bg-forest-900">
            {/* chrome */}
            <div className="flex items-center gap-3 border-b border-ivory-100/10 px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gold-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-ivory-200/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-forest-300/70" />
              </div>
              <div className="mx-auto flex h-7 w-full max-w-md items-center justify-center rounded-full bg-forest-950/70 text-[10px] tracking-[0.25em] text-ivory-200/50">
                mahmudpatwary.com
              </div>
            </div>
            {/* page */}
            <div className="relative grid gap-5 bg-gradient-to-br from-forest-900 to-forest-950 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
              <div className="flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-[0.4em] text-gold-300">Premium Web Design</span>
                <h4 className="mt-3 font-display text-3xl leading-tight text-ivory-50 md:text-5xl">
                  Websites that feel <span className="italic text-gold-gradient">expensive.</span>
                </h4>
                <p className="mt-3 max-w-sm text-xs leading-relaxed text-ivory-200/60 md:text-sm">
                  Modern UI, responsive systems and silky interactions — engineered to convert visitors into clients.
                </p>
                <div className="mt-6 flex gap-3">
                  <span className="rounded-full bg-gold-400 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-forest-900">
                    Hire Me
                  </span>
                  <span className="rounded-full border border-ivory-100/20 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-100">
                    Portfolio
                  </span>
                </div>
              </div>
              <div className="relative grid grid-cols-2 gap-3">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    animate={{ y: [0, i % 2 ? 8 : -8, 0] }}
                    transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
                    className={
                      "overflow-hidden rounded-xl ring-1 ring-gold-400/20 " +
                      (i === 0 ? "col-span-2 aspect-[16/7]" : "aspect-[4/3]")
                    }
                  >
                    <img src={p.image} alt="" className="h-full w-full object-cover" />
                  </motion.div>
                ))}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
        {/* reflection */}
        <div className="mx-auto mt-2 h-24 max-w-4xl bg-gradient-to-b from-gold-400/10 to-transparent blur-xl" />
      </motion.div>
    </div>
  );
}

export default function WebDesigns() {
  return (
    <section id="webdesign" className="relative overflow-hidden bg-forest-950 py-28 text-ivory-50 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 hairline" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[60vmin] w-[60vmin] rounded-full bg-gold-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[50vmin] w-[50vmin] rounded-full bg-forest-300/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 grain-light opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Web Designs"
          title="Interfaces engineered to impress."
          description="Beautiful layouts, flawless responsiveness, smooth motion and uncompromising performance — the four pillars of every build."
          dark
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {webFeatures.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>

        {/* showcase */}
        <div className="mt-28 md:mt-36">
          <Reveal className="mb-14 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
              Website Showcase
            </span>
          </Reveal>
          <BrowserMockup />
        </div>

        {/* ---------------- Live websites showcase ---------------- */}
        <div className="mt-28 md:mt-36">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-gold-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
                  Live Websites
                </span>
              </div>
              <h3 className="font-display text-4xl leading-tight text-ivory-50 md:text-5xl lg:text-6xl">
                Ships live on the internet.
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-sm leading-relaxed text-ivory-200/65 md:text-base">
                A selection of websites I have designed and deployed — each one fully responsive,
                interactive and ready for real visitors. Click any card to visit.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {liveWebsites.map((w, i) => (
              <Reveal key={w.id} delay={(i % 4) * 0.08}>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-glow-gold group relative block overflow-hidden rounded-[1.5rem] bg-forest-900"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                    {/* live badge */}
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-forest-950/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300 backdrop-blur-md ring-1 ring-gold-400/40">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Live
                    </span>
                    {/* visit arrow */}
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-forest-900 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {/* tags */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-ivory-100/25 bg-forest-950/40 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ivory-100 backdrop-blur"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-display text-xl text-ivory-50 md:text-2xl">
                        {w.title}
                      </h4>
                      <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.3em] text-gold-300/80 md:inline">
                        Visit ↗
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ivory-200/65">
                      {w.description}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* process */}
        <div className="mt-28 md:mt-36">
          <Reveal className="mb-12 flex items-center gap-4">
            <span className="h-px w-10 bg-gold-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
              The Process
            </span>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ivory-100/10 bg-ivory-100/10 md:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08} className="h-full">
                <div className="group relative h-full bg-forest-950 p-8 transition-colors duration-500 hover:bg-forest-900">
                  <span className="font-display text-5xl text-gold-400/30 transition-colors duration-500 group-hover:text-gold-400">
                    {s.step}
                  </span>
                  <h4 className="mt-6 font-display text-2xl text-ivory-50">{s.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-200/60">{s.text}</p>
                  <span className="absolute right-8 top-8 h-2 w-2 rotate-45 border border-gold-400/50 transition-all duration-500 group-hover:bg-gold-400" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
