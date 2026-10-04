import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Reveal — fade/blur-up on scroll                                    */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SplitText — word-by-word cinematic reveal                          */
/* ------------------------------------------------------------------ */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%", opacity: 0, rotateX: -40 },
    show: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const MotionTag = motion[Tag] as typeof motion.span;
  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      style={{ perspective: 800 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span className="inline-block will-change-transform" variants={child}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading                                                     */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        align === "center" && "text-center mx-auto max-w-3xl",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-10 bg-gold-400" />
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold-500">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <h2
        className={cn(
          "font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight",
          dark ? "text-ivory-50" : "text-forest-800",
        )}
      >
        <SplitWords text={title} />
      </h2>
      {description && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-6 text-base md:text-lg leading-relaxed max-w-2xl",
              dark ? "text-ivory-200/70" : "text-forest-600/80",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TiltCard — 3D perspective tilt following the cursor                */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  intensity = 10,
  glare = true,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      animate={{ scale: hover ? scale : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{ opacity: hover ? 1 : 0, transition: "opacity .4s" }}
        >
          <motion.div
            className="absolute -inset-1/2 h-[200%] w-[200%]"
            style={{
              left: glareX,
              top: glareY,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(circle at center, rgba(255,250,235,0.35) 0%, rgba(201,169,97,0.12) 20%, transparent 55%)",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MagneticButton                                                     */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Social icons (inline SVG — no external lib)                        */
/* ------------------------------------------------------------------ */
export function SocialIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const props = {
    viewBox: "0 0 24 24",
    className,
    fill: "currentColor",
  } as const;
  switch (name) {
    case "facebook":
      return (
        <svg {...props}>
          <path d="M13.5 9H16V6h-2.5c-.83 0-1.5.67-1.5 1.5V9H10v3h2v6h3v-6h1.7l.3-3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...props}>
          <path d="M7.5 2C5.01 2 3 4.01 3 6.5v11C3 19.99 5.01 22 7.5 22h9c2.49 0 4.5-2.01 4.5-4.5v-11C21 4.01 18.99 2 16.5 2h-9zm0 2h9c1.38 0 2.5 1.12 2.5 2.5v11c0 1.38-1.12 2.5-2.5 2.5h-9C6.12 20 5 18.88 5 17.5v-11C5 5.12 6.12 4 7.5 4zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...props}>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.88 9.88 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.8c2.17 0 4.21.85 5.75 2.38a8.1 8.1 0 012.37 5.74c0 4.48-3.64 8.12-8.12 8.12-1.47 0-2.9-.39-4.16-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.07 8.07 0 01-1.24-4.28c0-4.48 3.65-8.12 8.19-8.12zm4.52 6.16c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.3z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...props}>
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
        </svg>
      );
    case "envelope":
      return (
        <svg {...props}>
          <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2.5.47l7 4.67a.9.9 0 001 0l7-4.67a.5.5 0 00-.28-.92H4.78a.5.5 0 00-.28.92z" />
        </svg>
      );
    case "github":
      return (
        <svg {...props}>
          <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0112 6.84c.85 0 1.71.12 2.51.35 1.91-1.31 2.75-1.04 2.75-1.04.55 1.39.2 2.42.1 2.68.64.71 1.03 1.62 1.03 2.73 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0022 12.24C22 6.58 17.52 2 12 2z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */
export function GoldButton({
  children,
  href,
  className,
  onClick,
  type,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const inner = (
    <span
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-[0.18em] uppercase",
        "bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-[length:200%_auto] text-forest-900",
        "shadow-gold transition-[background-position,box-shadow] duration-700 hover:bg-right hover:shadow-[0_25px_70px_-20px_rgba(201,169,97,0.7)]",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <svg
        className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </span>
  );
  if (href)
    return (
      <Magnetic>
        <a href={href}>{inner}</a>
      </Magnetic>
    );
  return (
    <Magnetic>
      <button type={type ?? "button"} onClick={onClick}>
        {inner}
      </button>
    </Magnetic>
  );
}

export function OutlineButton({
  children,
  href,
  className,
  dark = true,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Magnetic>
      <a
        href={href}
        className={cn(
          "group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-[0.18em] uppercase transition-colors duration-500",
          dark
            ? "border border-ivory-100/25 text-ivory-50 hover:border-gold-400 hover:text-gold-200"
            : "border border-forest-700/25 text-forest-800 hover:border-gold-500 hover:text-gold-600",
          className,
        )}
      >
        {children}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 animate-pulse-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
        </span>
      </a>
    </Magnetic>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                            */
/* ------------------------------------------------------------------ */
export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max items-center gap-10 animate-marquee"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-3xl md:text-5xl italic tracking-tight">{item}</span>
            <span className="h-2 w-2 rotate-45 bg-gold-400/80" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Counter                                                            */
/* ------------------------------------------------------------------ */
export function Counter({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative                                                         */
/* ------------------------------------------------------------------ */
export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full hairline", className)} />;
}

export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" className={cn("h-5 w-auto text-gold-400", className)} fill="none">
      <path d="M0 12h44M76 12h44" stroke="currentColor" strokeWidth="1" />
      <path d="M60 2l6 10-6 10-6-10z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="60" cy="12" r="2" fill="currentColor" />
      <circle cx="48" cy="12" r="1.3" fill="currentColor" />
      <circle cx="72" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}
