import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { heroSlides, site } from "@/data/content";
import HeroScene from "./three/HeroScene";
import { GoldButton, OutlineButton, TiltCard } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-forest-950 text-ivory-50"
    >
      {/* Cinematic image backdrop (original hero slider imagery) */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={slide}
            src={heroSlides[slide]}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.8 }, scale: { duration: 7, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-forest-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/40 to-forest-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,169,97,0.14),transparent_55%)]" />
      </motion.div>

      {/* 3D scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene progress={scrollYProgress} />
        </Suspense>
      </div>

      {/* vignette + grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,17,13,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grain-light opacity-60" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:px-10 lg:justify-center lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div style={{ y: contentY, opacity: contentOpacity }}>
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gold-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
                {site.welcome}
              </span>
            </motion.div>

            {/* headline */}
            <h1 className="font-display text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.02em] sm:text-[clamp(3.2rem,9vw,8.5rem)]">
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "110%", rotateX: -30 }}
                  animate={ready ? { y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.25, ease }}
                >
                  Mahmud
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-3">
                <motion.span
                  className="block italic text-gold-shimmer"
                  initial={{ y: "110%", rotateX: -30 }}
                  animate={ready ? { y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease }}
                >
                  Patwary
                </motion.span>
              </span>
            </h1>

            {/* roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.7, ease }}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium uppercase tracking-[0.28em] text-ivory-200/80"
            >
              {site.roles.map((r, i) => (
                <span key={r} className="flex items-center gap-4">
                  {i > 0 && <span className="h-1 w-1 rotate-45 bg-gold-400" />}
                  {r}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.85, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ivory-200/70 md:text-lg"
            >
              {site.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <GoldButton href="#about">Get Started</GoldButton>
              <OutlineButton href="#projects">Explore Projects</OutlineButton>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, x: 60, rotateY: -20 }}
            animate={ready ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease }}
            className="relative mx-auto w-full max-w-[320px] perspective-2000 lg:max-w-[380px]"
          >
            <TiltCard intensity={9} className="rounded-[2rem]">
              <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-gold-300 via-gold-500/30 to-gold-300 shadow-deep">
                <div className="relative overflow-hidden rounded-[2rem] bg-forest-900">
                  <img
                    src={site.profile}
                    alt={site.name}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="font-display text-2xl text-ivory-50">{site.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold-300">
                        {site.location}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/50 bg-forest-950/50 font-display text-base text-gold-300">
                      {site.initials}
                    </span>
                  </div>
                </div>
              </div>

              {/* floating badges (3D depth) */}
              <motion.div
                style={{ z: 60 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -left-8 top-10 hidden rounded-2xl glass-dark px-4 py-3 shadow-deep md:block"
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-gold-300">Available</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ivory-50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  For new projects
                </p>
              </motion.div>
              <motion.div
                style={{ z: 80 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 bottom-24 hidden rounded-2xl glass-dark px-4 py-3 shadow-deep md:block"
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-gold-300">Crafting</p>
                <p className="mt-1 font-display text-lg text-ivory-50">Web · Graphics · Code</p>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* bottom bar: scroll cue + slide index */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-7 md:px-10">
          <a href="#story" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-ivory-200/60">
            <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-ivory-100/25 p-1.5">
              <motion.span
                animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="h-2 w-[3px] rounded-full bg-gold-400"
              />
            </span>
            <span className="hidden transition-colors group-hover:text-gold-300 sm:inline">Scroll to explore</span>
          </a>
          <div className="hidden items-center gap-3 md:flex">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className="relative h-px w-10 overflow-hidden bg-ivory-100/20"
              >
                {slide === i && (
                  <motion.span
                    key={`bar-${slide}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute inset-0 origin-left bg-gold-400"
                  />
                )}
              </button>
            ))}
            <span className="ml-2 font-display text-sm text-gold-300 tabular-nums">
              0{slide + 1} <span className="text-ivory-200/40">/ 0{heroSlides.length}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
