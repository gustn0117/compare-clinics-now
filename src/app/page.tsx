"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── Scroll Reveal ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Icons (SVG) ── */
const I = {
  shield: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  diamond: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M2.7 10.3l8.6 10.8a1 1 0 001.4 0l8.6-10.8a1 1 0 00.1-1.1L18.4 3.5a1 1 0 00-.9-.5H6.5a1 1 0 00-.9.5L2.6 9.2a1 1 0 00.1 1.1z"/></svg>,
  handshake: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M20.5 11.5L17 8l-4.5 1L9 5.5 3.5 11"/><path d="M3.5 11l4 4 3-1 2.5 2.5 2-2 3 3"/></svg>,
  globe: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>,
  chat: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  money: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M16 8h-4a2 2 0 000 4h2a2 2 0 010 4H8M12 6v2m0 8v2"/></svg>,
  trending: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  clipboard: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>,
  surgery: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M7 2l-4 6h6L7 2z"/><path d="M7 8v13M17 2v7"/><circle cx="17" cy="12" r="3"/><path d="M17 15v6"/></svg>,
  sparkles: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/><path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"/></svg>,
  eye: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  hospital: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/></svg>,
  form: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  phone: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  walk: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="13" cy="4" r="2"/><path d="M15 7l-3 9 3 5M10 7l-2 5h5"/><path d="M8 12l-3 9"/></svg>,
  medical: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M8 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6l4-4z"/><path d="M12 8v8M8 12h8"/></svg>,
  check: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
  star: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  arrow: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  chevDown: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>,
  quote: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="currentColor" opacity={0.12}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
};

/* ═══════════════════════════════════
   HERO — split layout, no bg image
   ═══════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden text-white">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover brightness-[0.35] z-0"
        priority
      />
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-xl font-bold tracking-tight">CCN</span>
        <div className="flex items-center gap-5">
          <a href="#services" className="hidden sm:inline text-sm text-white/70 hover:text-white transition">Services</a>
          <a href="#process" className="hidden sm:inline text-sm text-white/70 hover:text-white transition">Process</a>
          <a href="#faq" className="hidden sm:inline text-sm text-white/70 hover:text-white transition">FAQ</a>
          <a href="#quote" className="rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold hover:bg-teal-400 transition shadow-lg shadow-teal-500/25">
            Get Free Quote
          </a>
        </div>
      </nav>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-28 text-center">
        <h1 className="anim-up mx-auto max-w-3xl text-4xl font-extrabold leading-[1.12] sm:text-5xl lg:text-6xl">
          Stop Overpaying for<br />
          <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">Your Glow Up</span>
        </h1>

        <p className="anim-up anim-d2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          Get a transparent, no-pressure clinic comparison before you choose. No hidden fees. No language barriers.
        </p>

        <div className="anim-up anim-d3 mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a href="#quote" className="anim-glow group inline-flex items-center gap-2 rounded-full bg-teal-500 px-8 py-4 text-lg font-semibold hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/30">
            Compare Clinics Now
            {I.arrow("w-5 h-5 group-hover:translate-x-1 transition-transform")}
          </a>
          <span className="text-sm text-white/50">Takes 30 seconds</span>
        </div>

        {/* Stats */}
        <div className="anim-up anim-d4 mt-16 flex gap-12 sm:gap-16">
          {[{ v: "1,200+", l: "Clients Helped" }, { v: "4.8", l: "Avg. Rating" }, { v: "50+", l: "Partner Clinics" }].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-extrabold">{s.v}</p>
              <p className="mt-1 text-xs text-white/50">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-white" />
    </section>
  );
}

/* ═══════ PAIN POINTS ═══════ */
const painPoints = [
  { icon: I.chat, title: "Language Barrier", desc: "Hard to explain what you want in Korean — worried things get lost in translation.", color: "bg-teal-50 text-teal-600" },
  { icon: I.money, title: '"Foreigner Price"', desc: "Overpriced, inconsistent quotes that don't match what locals pay.", color: "bg-teal-50 text-teal-600" },
  { icon: I.trending, title: "Aggressive Upselling", desc: "Feeling pressured to add more procedures you didn't plan for.", color: "bg-teal-50 text-teal-600" },
  { icon: I.clipboard, title: "Hidden Fees", desc: "Unexpected costs appearing after you've already committed.", color: "bg-teal-50 text-teal-600" },
];

function PainPoints() {
  const ref = useReveal();
  return (
    <section className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Sound familiar?</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Living in Korea but unsure where to go?</h2>
        <div className="divider-bar mt-6" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {painPoints.map((p) => (
            <div key={p.title} className="card-lift group flex gap-5 rounded-2xl border border-gray-100 bg-white p-7 text-left shadow-sm">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${p.color} transition group-hover:scale-110`}>
                {p.icon("w-6 h-6")}
              </div>
              <div>
                <h3 className="text-base font-bold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ SERVICES ═══════ */
const services = [
  { icon: I.surgery, title: "Plastic Surgery", items: ["Eyes / Nose / Contour", "Revision Surgery", "Real review insights"], color: "bg-teal-50 text-teal-600 group-hover:bg-teal-100" },
  { icon: I.sparkles, title: "Dermatology", items: ["Laser / Acne / Lifting", "Fillers & Injectables", "Standard fee references"], color: "bg-teal-50 text-teal-600 group-hover:bg-teal-100" },
  { icon: I.eye, title: "Ophthalmology", items: ["LASIK / LASEK / SMILE", "ICL Surgery", "Comprehensive eye exams"], color: "bg-teal-50 text-teal-600 group-hover:bg-teal-100" },
  { icon: I.hospital, title: "Health Checkup", items: ["Full Body Screening", "Custom Add-ons", "Language support"], color: "bg-teal-50 text-teal-600 group-hover:bg-teal-100" },
];

function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="bg-section-bg py-24">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Offer</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Our Services</h2>
        <div className="divider-bar mt-6" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="card-lift group rounded-2xl bg-white p-7 text-center shadow-sm">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition ${s.color}`}>
                {s.icon("w-7 h-7")}
              </div>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <ul className="mt-3 space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-gray-500">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ STEPS ═══════ */
const steps = [
  { n: 1, icon: I.form, title: "Tell Us Your Needs", desc: "Share your procedure type and budget through our quick form." },
  { n: 2, icon: I.diamond, title: "Compare Fair Options", desc: "We share transparent prices from top-rated, certified clinics." },
  { n: 3, icon: I.check, title: "Decide with Confidence", desc: "Choose your clinic. No pressure, no obligations — ever." },
];

function Steps() {
  const ref = useReveal();
  return (
    <section className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">3 Simple Steps</h2>
        <div className="divider-bar mt-6" />
        {/* Desktop */}
        <div className="mt-14 hidden sm:grid gap-10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-center">
              {i < steps.length - 1 && (
                <div className="absolute top-7 left-[60%] w-[80%] border-t-2 border-dashed border-teal-200" />
              )}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/25">
                {s.icon("w-6 h-6")}
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-teal-600 shadow">{s.n}</span>
              </div>
              <h3 className="mt-5 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile — vertical numbered list */}
        <div className="mt-14 flex flex-col gap-6 sm:hidden mx-auto max-w-sm">
          {steps.map((s, i) => (
            <div key={s.n} className="flex gap-4 items-center text-left">
              <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold shadow">{s.n}</span>
              <div>
                <p className="text-sm font-bold">{s.title}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="#quote" className="mt-12 inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 font-semibold text-white hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/25 group">
          Compare Clinics Now
          {I.arrow("w-4 h-4 group-hover:translate-x-1 transition-transform")}
        </a>
      </div>
    </section>
  );
}

/* ═══════ WHY CHOOSE US ═══════ */
const reasons = [
  { icon: I.shield, title: "Safety First", desc: "Only reputable, certified clinics with proven track records." },
  { icon: I.diamond, title: "Total Transparency", desc: "We explain exactly what's included — no surprises." },
  { icon: I.handshake, title: "No Pressure", desc: "Decide on your terms, your timing. We never push." },
  { icon: I.globe, title: "Multilingual Support", desc: "English, Korean, Chinese — comfortable at every step." },
];

function WhyChooseUs() {
  const ref = useReveal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
      <div className="anim-float absolute -top-20 right-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="anim-float absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" style={{ animationDelay: "1.5s" }} />

      <div ref={ref} className="reveal relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Why Us</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Why Choose Us</h2>
          <div className="divider-bar mt-6" />
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.title} className="card-lift rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400">
                {r.icon("w-5 h-5")}
              </div>
              <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ GALLERY ═══════ */
function Gallery() {
  const ref = useReveal();
  return (
    <section className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Gallery</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Real Results, Real Confidence</h2>
        <div className="divider-bar mt-6" />
        <p className="mt-3 text-gray-500">See the beauty standards trusted by our clients</p>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="group overflow-hidden rounded-2xl shadow-md">
              <Image
                src={`/images/model-${n}.jpg`}
                alt={`Client reference ${n}`}
                width={300}
                height={400}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ TRUST ═══════ */
function Trust() {
  const ref = useReveal();
  return (
    <section className="bg-section-bg py-24">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-6">
        <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-500 p-10 text-center text-white shadow-xl shadow-teal-600/20 sm:p-14">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{I.star("w-5 h-5 text-amber-300")}</span>
            ))}
          </div>
          <p className="mt-4 text-5xl font-extrabold">1,200+</p>
          <p className="mt-1 text-lg text-white/80">Foreigners Helped in Korea</p>
          <p className="text-white/55 text-sm">4.8 / 5.0 Average Satisfaction</p>

          <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-white/10 p-7 backdrop-blur-sm">
            {I.quote("mx-auto w-10 h-10 text-white")}
            <blockquote className="mt-3 text-lg italic leading-relaxed text-white/90">
              &ldquo;I finally understood the real cost breakdown before visiting. It saved me from an overpriced quote!&rdquo;
            </blockquote>
            <footer className="mt-3 text-sm font-semibold text-white/60">— Sarah J.</footer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ QUOTE FORM ═══════ */
function QuoteForm() {
  const [form, setForm] = useState({ name: "", nationality: "", phone: "", interest: "", budget: "", contact: "", timeline: "" });
  const [submitted, setSubmitted] = useState(false);
  const ref = useReveal();
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const interests = ["Plastic Surgery", "Dermatology", "Ophthalmology", "Health Checkup", "Other"];
  const contacts = ["KakaoTalk", "WhatsApp", "WeChat"];
  const budgets = ["Under $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000+"];
  const timelines = ["As soon as possible", "Within 1 month", "Within 3 months", "Just exploring"];

  if (submitted) {
    return (
      <section id="quote" className="bg-white py-24">
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
            {I.check("w-10 h-10 text-teal-600")}
          </div>
          <h2 className="mt-6 text-2xl font-bold">Thank you!</h2>
          <p className="mt-3 text-gray-500">We&apos;ve received your request. Our coordinator will contact you shortly.</p>
        </div>
      </section>
    );
  }

  const inputCls = "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition";
  const chipCls = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-teal-500 bg-teal-500 text-white shadow-md shadow-teal-500/20" : "border-gray-200 bg-white text-gray-700 hover:border-teal-300"}`;

  return (
    <section id="quote" className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-lg px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Start Now</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Get Your Free Comparison</h2>
          <div className="divider-bar mt-6" />
          <p className="mt-3 text-gray-500">We&apos;ll only contact you regarding your specific request.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-10 space-y-5 rounded-3xl border border-gray-100 bg-section-bg p-7 shadow-sm sm:p-8">
          {[
            { label: "Full Name", key: "name", ph: "Your name" },
            { label: "Nationality", key: "nationality", ph: "e.g. American, Japanese, Vietnamese" },
            { label: "Phone Number", key: "phone", ph: "e.g. +82 10-1234-5678" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold">{f.label}</label>
              <input required value={form[f.key as keyof typeof form]} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph} className={inputCls} />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold">Interest</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {interests.map((o) => <button key={o} type="button" onClick={() => set("interest", o)} className={chipCls(form.interest === o)}>{o}</button>)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">Budget Range</label>
            <select required value={form.budget} onChange={(e) => set("budget", e.target.value)} className={inputCls}>
              <option value="">Select your budget</option>
              {budgets.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Preferred Contact</label>
            <div className="mt-2 flex gap-2">
              {contacts.map((o) => <button key={o} type="button" onClick={() => set("contact", o)} className={chipCls(form.contact === o)}>{o}</button>)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">How soon?</label>
            <select required value={form.timeline} onChange={(e) => set("timeline", e.target.value)} className={inputCls}>
              <option value="">Select timeline</option>
              {timelines.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <button type="submit" className="group w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-xl transition-all">
            Get My Free Quote Now
            {I.arrow("w-4 h-4 group-hover:translate-x-1 transition-transform")}
          </button>
          <p className="text-center text-xs text-gray-400">No spam. No pressure. Just honest comparisons.</p>
        </form>
      </div>
    </section>
  );
}

/* ═══════ CONSULTATION PROCESS ═══════ */
const processSteps = [
  { icon: I.form, title: "Submit Form" },
  { icon: I.phone, title: "Coordinator Contact" },
  { icon: I.hospital, title: "Clinic Guidance" },
  { icon: I.walk, title: "Clinic Visit" },
  { icon: I.medical, title: "Procedure" },
];

function ConsultationProcess() {
  const ref = useReveal();
  return (
    <section id="process" className="bg-section-bg py-24">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Step by Step</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Consultation Process</h2>
        <div className="divider-bar mt-6" />

        {/* Desktop */}
        <div className="mt-14 hidden sm:flex items-center justify-center">
          {processSteps.map((s, i) => (
            <div key={s.title} className="flex items-center">
              <div className="flex flex-col items-center w-32">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/20">
                  {s.icon("w-6 h-6")}
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-teal-600 shadow">{i + 1}</span>
                </div>
                <p className="mt-2.5 text-xs font-bold">{s.title}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="flex items-center mx-1 text-teal-300/40">
                  <div className="w-6 border-t-2 border-dashed border-current" />
                  {I.arrow("w-3.5 h-3.5")}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile — vertical timeline */}
        <div className="mt-14 flex flex-col items-start gap-0 sm:hidden mx-auto max-w-xs">
          {processSteps.map((s, i) => (
            <div key={s.title} className="flex gap-4 items-start relative">
              {/* Vertical line */}
              {i < processSteps.length - 1 && (
                <div className="absolute left-[22px] top-14 bottom-0 w-0.5 bg-teal-200" />
              )}
              {/* Icon with number */}
              <div className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 text-white shadow-md">
                {s.icon("w-5 h-5")}
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-teal-600 shadow">{i + 1}</span>
              </div>
              {/* Text */}
              <div className="pb-8 text-left">
                <p className="text-sm font-bold">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ FAQ ═══════ */
const faqs = [
  { q: "Is this really free?", a: "Yes, our comparison service is 100% free for users. We're compensated by partner clinics, not by you." },
  { q: "Will you pressure me to choose?", a: "Never. We provide the data and the options — you make the choice on your own terms." },
  { q: "How do you select partner clinics?", a: "We only work with certified, reputable clinics that have verified track records and transparent pricing." },
  { q: "Can I get a quote for multiple procedures?", a: "Absolutely. Just select your primary interest and mention any additional procedures in the form." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useReveal();
  return (
    <section id="faq" className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
          <div className="divider-bar mt-6" />
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-section-bg overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left font-semibold hover:text-teal-600 transition">
                {f.q}
                <span className={`ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${open === i ? "bg-teal-500 text-white rotate-180" : "bg-gray-200 text-gray-500"}`}>
                  {I.chevDown("w-3.5 h-3.5")}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                <p className="px-5 text-sm text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ FOOTER ═══════ */
function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-center text-slate-400 text-sm">
      <div className="mx-auto max-w-4xl px-6 space-y-4">
        <div className="flex items-center justify-center">
          <span className="text-white text-base font-bold">Compare Clinics Now</span>
        </div>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#process" className="hover:text-white transition">Process</a>
          <a href="#quote" className="hover:text-white transition">Get Quote</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </div>
        <p>Contact: <a href="tel:+821044281139" className="text-white hover:underline">+82 10-4428-1139</a></p>
        <div className="h-px bg-slate-700/50 mx-auto max-w-xs" />
        <p className="text-xs text-slate-500">Medical Disclaimer: We provide information and consultation support only. Final medical decisions and pricing are determined by the clinic after a professional evaluation.</p>
        <p className="text-xs text-slate-500">&copy; 2026 Compare Clinics Now. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ═══════ PAGE ═══════ */
export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <Services />
      <Steps />
      <WhyChooseUs />
      <Gallery />
      <Trust />
      <QuoteForm />
      <ConsultationProcess />
      <FAQ />
      <Footer />
    </main>
  );
}
