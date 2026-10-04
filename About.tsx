import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about, site } from "@/data/content";
import { GoldButton, Ornament, Reveal, SectionHeading, SplitWords } from "./ui";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Responsive UI",
  "Animations",
  "Photoshop",
  "Illustrator",
  "PixelLab",
  "Branding",
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section id="about" className="relative overflow-hidden bg-ivory-100 py-28 md:py-40 grain">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[60vmin] w-[60vmin] rounded-full bg-gold-200/40 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[40vmin] w-[40vmin] rounded-full bg-forest-100/60 blur-[120px]" />

      <div ref={ref} className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* visuals */}
        <div className="relative perspective-2000">
          <Reveal>
            <motion.div style={{ rotate }} className="hover-glow-green relative rounded-[2rem] p-[1px] bg-gradient-to-br from-gold-400/70 via-gold-500/10 to-gold-400/60 shadow-deep">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-900">
                <motion.img
                  src={about.image}
                  alt="Workspace"
                  style={{ y: imgY }}
                  className="absolute inset-0 h-[120%] w-full -top-[10%] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold-300">Based in</p>
                  <p className="font-display text-3xl text-ivory-50">{site.location}</p>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* floating profile card */}
          <motion.div
            style={{ y: cardY }}
            className="absolute -right-4 top-10 w-44 md:-right-10 md:w-56"
          >
            <Reveal delay={0.3}>
              <div className="hover-glow-gold rounded-[1.5rem] p-[1px] bg-gradient-to-br from-gold-300 to-gold-500/30 shadow-deep transition-all duration-500">
                <div className="overflow-hidden rounded-[1.5rem] bg-forest-900">
                  <img src={site.profile} alt={site.name} className="aspect-square w-full object-cover object-top" />
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-display text-base text-ivory-50">{site.initials}</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-gold-300">Founder</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* stamp */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="absolute -bottom-8 -left-6 flex h-32 w-32 items-center justify-center md:h-40 md:w-40"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="circlePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="#10211a" />
              <circle cx="100" cy="100" r="86" fill="none" stroke="#c9a961" strokeWidth="0.8" />
              <text fill="#e2cf9a" fontSize="15" letterSpacing="4" fontFamily="Manrope, sans-serif" fontWeight="600">
                <textPath href="#circlePath">PREMIUM WEB · GRAPHICS · CODE ·</textPath>
              </text>
              <text x="100" y="108" textAnchor="middle" fill="#c9a961" fontSize="30" fontFamily="Cormorant Garamond, serif" fontWeight="700">
                MP
              </text>
            </svg>
          </motion.div>
        </div>

        {/* copy */}
        <div>
          <SectionHeading eyebrow="About Me" title={about.greeting} className="mb-8 md:mb-10" />
          <p className="font-display text-2xl leading-snug text-forest-800 md:text-3xl">
            <SplitWords text={about.p1} stagger={0.02} />
          </p>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-forest-600/85 md:text-lg">{about.p2}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-forest-800/15 bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-700 transition-colors duration-300 hover:border-gold-500 hover:text-gold-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <GoldButton href="#contact">Work with me</GoldButton>
              <div className="flex flex-col">
                <span className="font-display text-3xl italic text-forest-800">{site.name}</span>
                <Ornament className="mt-1 h-3" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
