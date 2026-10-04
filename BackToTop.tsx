import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Magnetic } from "./ui";

export default function BackToTop() {
  const { scrollYProgress, scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  const scrollToTop = () => {
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[70] md:bottom-8 md:right-8"
        >
          <Magnetic strength={0.2}>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-forest-900/85 text-gold-300 shadow-deep backdrop-blur-md ring-1 ring-gold-400/40 transition-colors duration-500 hover:text-forest-900 md:h-16 md:w-16"
            >
              {/* progress ring */}
              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(201,169,97,0.18)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#topGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    pathLength: scrollYProgress,
                    strokeDasharray: "289.03",
                    strokeDashoffset: "0",
                  }}
                />
                <defs>
                  <linearGradient id="topGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#e2cf9a" />
                    <stop offset="100%" stopColor="#9c7b3a" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-300 to-gold-500 text-forest-900 transition-all duration-500 group-hover:scale-110 group-hover:shadow-gold md:h-11 md:w-11">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                >
                  <path
                    d="M12 19V5M5 12l7-7 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-900/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300 opacity-0 shadow-deep ring-1 ring-gold-400/30 transition-opacity duration-500 group-hover:opacity-100">
                Back to top
              </span>
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
