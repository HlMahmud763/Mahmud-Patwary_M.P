import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/content";
import { cn } from "@/utils/cn";
import { GoldButton, Marquee, Reveal, SectionHeading, TiltCard } from "./ui";

function ProjectCard({
  project,
  className,
  horizontal = false,
  delay = 0,
}: {
  project: (typeof projects)[number];
  className?: string;
  horizontal?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <Reveal delay={delay} className={className}>
      <TiltCard intensity={6} scale={1.01} className="h-full rounded-[1.75rem]">
        <article
          ref={ref}
          className={cn(
            "hover-glow-green group relative flex h-full overflow-hidden rounded-[1.75rem] bg-white/70 shadow-card ring-1 ring-forest-800/5 backdrop-blur",
            horizontal ? "flex-col lg:flex-row" : "flex-col",
          )}
        >
          {/* image */}
          <div
            className={cn(
              "relative overflow-hidden",
              horizontal ? "aspect-[16/10] lg:aspect-auto lg:w-[58%]" : "aspect-[16/11]",
            )}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              style={{ y }}
              className="absolute inset-0 h-[124%] w-full -top-[12%] object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
            <div className="absolute inset-0 bg-gold-400/0 mix-blend-overlay transition-colors duration-700 group-hover:bg-gold-400/30" />
            {/* index */}
            <span className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full glass-dark font-display text-lg text-gold-200">
              {project.id}
            </span>
            {/* arrow */}
            <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-forest-900 opacity-0 transition-all duration-700 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ivory-100/30 bg-forest-950/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory-100 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* body */}
          <div className={cn("flex flex-1 flex-col justify-between p-7 md:p-9", horizontal && "lg:p-12")}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-600">
                {project.category}
              </p>
              <h3
                className={cn(
                  "mt-3 font-display text-forest-800 leading-tight",
                  horizontal ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
                )}
              >
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-forest-600/80 md:text-base">
                {project.description}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-forest-800/10 pt-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-forest-500/70">
                Case study
              </span>
              <span className="relative text-[12px] font-semibold uppercase tracking-[0.2em] text-forest-800">
                View
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-ivory-100 py-28 md:py-40 grain">
      {/* soft glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[50vmin] w-[50vmin] rounded-full bg-gold-300/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[50vmin] w-[50vmin] rounded-full bg-forest-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects crafted with intent."
            description="Modern, responsive and animated — each project is designed to look premium and perform flawlessly."
            className="mb-0 md:mb-0"
          />
          <Reveal delay={0.3} className="lg:pb-6">
            <GoldButton href="#contact">Start a project</GoldButton>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:gap-8 lg:grid-cols-12">
          <ProjectCard project={projects[0]} className="lg:col-span-7" />
          <ProjectCard project={projects[1]} className="lg:col-span-5" delay={0.12} />
          <ProjectCard project={projects[2]} className="lg:col-span-12" horizontal delay={0.08} />
        </div>
      </div>

      {/* marquee */}
      <div className="relative mt-28 border-y border-forest-800/10 py-6 text-forest-800/80">
        <Marquee
          items={[
            "Web Development",
            "Graphics Design",
            "Programming",
            "UI / UX",
            "Branding",
            "Motion & Animation",
          ]}
        />
      </div>
    </section>
  );
}
