import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/content";
import { lockScroll } from "@/hooks/useLenis";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    lockScroll(true);
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          lockScroll(false);
          setTimeout(onDone, 500);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lockScroll(false);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950 grain"
          exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-[120px]" />
            <div className="absolute left-[20%] top-[30%] h-[40vmin] w-[40vmin] rounded-full bg-forest-300/10 blur-[100px]" />
          </div>

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 40 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold-400/30"
              style={{ perspective: 800 }}
            >
              <div className="absolute inset-2 rounded-full border border-gold-400/15" />
              <motion.div
                className="absolute inset-0 rounded-full border-t border-gold-400"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
              />
              <span className="font-display text-4xl font-semibold text-gold-gradient">
                {site.initials}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 text-[11px] uppercase tracking-[0.45em] text-ivory-200/60"
            >
              {site.name}
            </motion.p>

            <div className="mt-10 flex w-56 flex-col items-center gap-3">
              <div className="h-px w-full bg-ivory-100/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600"
                  style={{ width: `${count}%` }}
                />
              </div>
              <div className="flex w-full items-center justify-between text-[10px] tracking-[0.3em] text-ivory-200/50">
                <span>CRAFTING</span>
                <span className="font-display text-base text-gold-300 tabular-nums">
                  {count.toString().padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
