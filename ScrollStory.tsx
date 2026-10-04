import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Suspense, useRef } from "react";
import StoryScene from "./StoryScene";

const stages = [
  {
    n: "01",
    label: "Discover",
    title: "Ideas, scattered.",
    text: "Every great website begins as fragments — colour, type, layout and code floating in search of structure.",
    range: [0.0, 0.06, 0.24, 0.32] as const,
  },
  {
    n: "02",
    label: "Design & Develop",
    title: "Composed in layers.",
    text: "I arrange hierarchy, rhythm and motion into a living system — then write clean, fast code that holds it together.",
    range: [0.36, 0.44, 0.6, 0.68] as const,
  },
  {
    n: "03",
    label: "Deliver",
    title: "Pixel-perfect. Delivered.",
    text: "Responsive, optimised and premium on every screen — a website that makes clients want to reach out.",
    range: [0.74, 0.82, 0.96, 1] as const,
  },
];

function Caption({
  stage,
  progress,
  align,
}: {
  stage: (typeof stages)[number];
  progress: MotionValue<number>;
  align: "left" | "right" | "center";
}) {
  const [a, b, c, d] = stage.range;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [50, 0, 0, -50]);
  const blur = useTransform(progress, [a, b, c, d], [12, 0, 0, 12]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  return (
    <motion.div
      style={{ opacity, y, filter }}
      className={
        align === "center"
          ? "absolute inset-x-6 bottom-[7vh] mx-auto max-w-3xl text-center md:inset-x-0 md:bottom-[9vh] md:px-6"
          : align === "left"
            ? "absolute inset-x-6 bottom-[7vh] md:inset-x-auto md:bottom-auto md:left-16 md:top-1/2 md:max-w-md md:-translate-y-1/2"
            : "absolute inset-x-6 bottom-[7vh] md:inset-x-auto md:bottom-auto md:right-16 md:top-1/2 md:max-w-md md:-translate-y-1/2 md:text-right"
      }
    >
      <div
        className={
          "mb-5 flex items-center gap-3 " +
          (align === "right" ? "md:justify-end" : align === "center" ? "justify-center" : "")
        }
      >
        <span className="font-display text-sm text-gold-400">{stage.n}</span>
        <span className="h-px w-8 bg-gold-400/60" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
          {stage.label}
        </span>
      </div>
      <h3 className="font-display text-4xl leading-[0.95] text-ivory-50 md:text-6xl lg:text-7xl">
        {stage.title}
      </h3>
      <p className="mt-5 text-sm leading-relaxed text-ivory-200/70 md:text-base">{stage.text}</p>
    </motion.div>
  );
}

export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stepIndex = useTransform(scrollYProgress, (p): string =>
    p < 0.34 ? "01" : p < 0.7 ? "02" : "03",
  );
  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section id="story" ref={ref} className="relative h-[420vh] bg-forest-950">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Suspense fallback={null}>
          <StoryScene progress={scrollYProgress} />
        </Suspense>

        {/* atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,17,13,0.8)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-950 to-transparent" />
        <div className="pointer-events-none absolute inset-0 grain-light opacity-50" />

        {/* top label */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-x-0 top-28 flex flex-col items-center gap-3 text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-gold-300">
            Scroll to build
          </span>
          <span className="font-display text-2xl italic text-ivory-100/80 md:text-3xl">
            How a premium website comes together
          </span>
        </motion.div>

        {/* captions */}
        <Caption stage={stages[0]} progress={scrollYProgress} align="left" />
        <Caption stage={stages[1]} progress={scrollYProgress} align="right" />
        <Caption stage={stages[2]} progress={scrollYProgress} align="center" />

        {/* progress rail */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:right-8 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-ivory-200/50 [writing-mode:vertical-rl]">
            Progress
          </span>
          <div className="relative h-40 w-px bg-ivory-100/15">
            <motion.div
              style={{ scaleY: barScale }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-gold-300 to-gold-600"
            />
          </div>
          <motion.span className="font-display text-xl text-gold-300 tabular-nums">
            {stepIndex}
          </motion.span>
        </div>

        {/* bottom-left meta */}
        <div className="absolute bottom-8 left-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-ivory-200/45 md:left-10">
          <span className="h-px w-8 bg-gold-400/50" />
          Real-time 3D · Scroll-driven
        </div>
      </div>
    </section>
  );
}
