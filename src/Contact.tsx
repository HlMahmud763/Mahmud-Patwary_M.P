import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { navLinks, site, socialLinks } from "@/data/content";
import { cn } from "@/utils/cn";
import { GoldButton, Magnetic, Reveal, SectionHeading, SocialIcon } from "./ui";

const services = [
  "Website Design",
  "Web Development",
  "Graphics / Branding",
  "Programming",
  "Other",
];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("group block", className)}>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300/80 transition-colors group-focus-within:text-gold-300">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-ivory-100/10 bg-forest-900/50 px-4 py-3.5 text-sm text-ivory-50 placeholder:text-ivory-200/30 outline-none transition-all duration-300 focus:border-gold-400/60 focus:bg-forest-900/80 focus:shadow-[0_0_0_4px_rgba(201,169,97,0.08)]";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: services[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry — ${form.service} (${form.name})`,
    );
    const body = encodeURIComponent(
      `Assalamualaikum Mahmud,\n\nMy name is ${form.name}.\nI'm interested in: ${form.service}\n\n${form.message}\n\nReply to: ${form.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const infoRows = [
    {
      k: "Email",
      v: site.email,
      href: `mailto:${site.email}`,
      icon: "envelope" as const,
    },
    {
      k: "WhatsApp",
      v: site.whatsappDisplay,
      href: site.whatsapp,
      icon: "whatsapp" as const,
    },
    { k: "Location", v: site.location, icon: "map" as const },
    {
      k: "Availability",
      v: site.availability,
      icon: "globe" as const,
      live: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-forest-950 pt-28 text-ivory-50 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 grain-light opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 hairline" />
      <div className="pointer-events-none absolute -right-20 top-20 h-[60vmin] w-[60vmin] rounded-full bg-gold-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-40 h-[50vmin] w-[50vmin] rounded-full bg-forest-300/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* left */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something premium."
              description="Tell me about your website, brand or product idea. I reply within 24 hours with a clear plan and next steps."
              dark
              className="mb-10 md:mb-12"
            />

            {/* info rows — with golden glow on dark bg */}
            <div className="grid gap-3 sm:grid-cols-2">
              {infoRows.map((row) => (
                <Reveal key={row.k}>
                  <a
                    href={row.href ?? "#contact"}
                    target={row.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="hover-glow-gold group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-ivory-100/10 bg-forest-900/50 p-4 md:p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-400/30 bg-forest-950/70 text-gold-300 transition-all duration-500 group-hover:border-gold-400/80 group-hover:bg-gold-400 group-hover:text-forest-900">
                      {row.icon === "map" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <path
                            d="M12 21s-7-7.3-7-12a7 7 0 0114 0c0 4.7-7 12-7 12z"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      ) : row.icon === "globe" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3 12h18M12 3c2.5 3 3.5 6 3.5 9s-1 6-3.5 9M12 3C9.5 6 8.5 9 8.5 12s1 6 3.5 9" />
                        </svg>
                      ) : (
                        <SocialIcon name={row.icon} className="h-5 w-5" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory-200/55">
                        {row.k}
                      </span>
                      <span className="mt-1 flex items-center gap-2 truncate text-sm font-medium text-ivory-50 md:text-base">
                        {row.live && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                        )}
                        {row.v}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-gold-300 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        d="M7 17L17 7M9 7h8v8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* socials with gold glow on dark */}
            <Reveal delay={0.2}>
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold-400/60" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                    Connect
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <Magnetic key={s.label} strength={0.3}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        aria-label={s.label}
                        className="hover-glow-gold group relative flex h-12 w-12 items-center justify-center rounded-full border border-ivory-100/15 bg-forest-900/60 text-ivory-100 transition-all duration-500 hover:text-gold-300 md:h-14 md:w-14"
                      >
                        <SocialIcon name={s.icon} className="h-[18px] w-[18px] md:h-5 md:w-5" />
                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-900/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-300 opacity-0 ring-1 ring-gold-400/30 transition-opacity duration-300 group-hover:opacity-100">
                          {s.label}
                        </span>
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-gold-400/60 via-gold-500/5 to-gold-400/40 shadow-deep"
            >
              <div className="relative rounded-[2rem] bg-forest-900/70 p-6 backdrop-blur-xl md:p-10">
                <div className="mb-6 flex items-center justify-between md:mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-gold-300">
                      Project brief
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-ivory-50 md:text-3xl">
                      Start the conversation
                    </h3>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 font-display text-lg text-gold-300">
                    {site.initials}
                  </span>
                </div>

                <div className="grid gap-4 md:gap-5 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="I need" className="sm:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setForm({ ...form, service: s })}
                          className={cn(
                            "rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 md:px-4 md:text-[11px]",
                            form.service === s
                              ? "border-gold-400 bg-gold-400 text-forest-900 shadow-gold"
                              : "border-ivory-100/15 text-ivory-100/70 hover:border-gold-400/60 hover:text-gold-200",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Project details" className="sm:col-span-2">
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your goals, timeline and anything you have in mind…"
                      className={cn(inputCls, "resize-none")}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <GoldButton type="submit">Send inquiry</GoldButton>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-ivory-200/40">
                    Reply within 24h
                  </p>
                </div>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 rounded-xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-sm text-gold-200"
                    >
                      Jazakallah khair — your email client is opening with the brief. I'll be in touch soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-ivory-100/10 md:mt-32">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-14 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_auto] lg:gap-14">
            <div>
              <a href="#home" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 font-display text-base font-bold text-gold-300">
                  {site.initials}
                </span>
                <span className="font-display text-xl text-ivory-50 md:text-2xl">
                  {site.name}
                </span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory-200/55">
                {site.tagline}
              </p>
              {/* footer socials */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory-100/15 text-ivory-100/70 transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
                  >
                    <SocialIcon name={s.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                Navigate
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-ivory-200/70 transition-colors hover:text-gold-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row items-center justify-between gap-6 lg:flex-col lg:items-end">
              <Magnetic>
                <button
                  onClick={() =>
                    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
                  }
                  aria-label="Back to top"
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 text-gold-300 transition-all duration-500 hover:bg-gold-400 hover:text-forest-900"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      d="M12 19V5M5 12l7-7 7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Magnetic>
              <p className="text-[10px] uppercase tracking-[0.3em] text-ivory-200/40">
                Back to top
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ivory-100/10 pt-7 text-[11px] uppercase tracking-[0.25em] text-ivory-200/40 md:flex-row">
            <span>
              © 2026 {site.name} (MP). All Rights Reserved.
            </span>
            <span className="flex items-center gap-2">
              Crafted with <span className="text-gold-400">◆</span> in {site.location} · Available{" "}
              {site.availability}
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
