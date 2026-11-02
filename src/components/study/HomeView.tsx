"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BookOpenText,
  BrainCircuit,
  GraduationCap,
  Layers,
  ListChecks,
  MousePointerClick,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";
import { Signature } from "./Signature";
import { numberCards } from "@/data/lessons";
import { TOTAL, TOTAL_MCQ, TOTAL_TF } from "@/data";

function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="lat">
      {val}
    </span>
  );
}

/** Animated Inputs -> Processing -> Outputs pipeline with a travelling spark */
function Pipeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="glass rounded-3xl p-5 sm:p-7 relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4" dir="ltr">
        {[
          { t: "Inputs", ar: "مدخلات", c: "from-sky-400/80 to-sky-300/40" },
          { t: "Processing", ar: "معالجة", c: "from-gold to-gold/40" },
          { t: "Outputs", ar: "مخرجات", c: "from-emerald-400/80 to-emerald-300/40" },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + i * 0.25, type: "spring", stiffness: 200 }}
            className="flex-1 flex flex-col items-center gap-1.5"
          >
            <div
              className={`h-11 w-11 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br ${s.c} flex items-center justify-center shadow-lg`}
            >
              {i === 0 && <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
              {i === 1 && <BrainCircuit className="h-5 w-5 sm:h-6 sm:w-6 text-black/80" />}
              {i === 2 && <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            </div>
            <div className="text-center">
              <div className="lat text-xs sm:text-sm font-bold text-foreground">{s.t}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{s.ar}</div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* travelling spark */}
      <div className="relative mt-4 h-[3px] rounded-full bg-white/8" dir="ltr">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/40 via-gold/50 to-emerald-400/40" />
        <div
          className="absolute -top-[3px] h-[9px] w-[10px] rounded-full bg-gold-soft"
          style={{ animation: "travel 3.2s ease-in-out infinite", boxShadow: "0 0 12px 3px oklch(0.85 0.14 85/0.7)" }}
        />
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        أي نظام في الدنيا شكله كده — والمحاسبة نظام، والنظام المحوسب هو نفس الشكل بس بالحاسوب
      </p>
    </motion.div>
  );
}

const FEATURES = [
  {
    icon: BookOpenText,
    title: "شرح من الصفر",
    desc: "6 فصول كاملة بالعربي والإنجليزي — من تعريف النظام لحد إعداد العملاء والضرائب، بأسلوب بسيط زي ما واحد بيشرح لك.",
  },
  {
    icon: ListChecks,
    title: `${TOTAL} سؤال بترجمة وشرح`,
    desc: "كل سؤال من ورقة الامتحان: نصه إنجليزي وترجمته عربي، وكل اختيار مترجم، وليه الإجابة دي صح — بالعربي والإنجليزي.",
  },
  {
    icon: Timer,
    title: "مود امتحان حقيقي",
    desc: "30 سؤال (20 اختياري + 10 صح وغلط) في 45 دقيقة بمؤقت وشاشة امتحان — وتخرج بشهادة بتوقيعك.",
  },
  {
    icon: MousePointerClick,
    title: "موشن جرافيك وتفاعل",
    desc: "أنيميشن في كل حتة: مخططات متحركة، نافذة Peachtree تفاعلية، إحصائيات بتعد لوحدها، واحتفال لما تنجح.",
  },
];

export function HomeView({ onGo, solvedCount, correctCount }: {
  onGo: (v: "lessons" | "bank" | "exam") => void;
  solvedCount: number;
  correctCount: number;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const accuracy = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;

  return (
    <div className="relative">
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-[92svh] flex flex-col items-center justify-center px-4 pt-24 pb-16">
        <motion.div style={{ y: yTitle, opacity }} className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-gold-soft mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            حزم البرامج المحاسبية — Peachtree / Sage 50
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.25] tracking-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.15 }}
            >
              من «مش فاهم حاجة»
            </motion.span>
            <motion.span
              className="block text-shine"
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.4 }}
            >
              لقادر يحل أي سؤال
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            الموقع ده رحلتك الكاملة في مادة{" "}
            <span className="lat text-gold-soft font-semibold">Software Packages</span> — شرح بسيط
            يوصلك لأعمق نقطة، بنك أسئلة مترجم ومشروح، ومود امتحان يحسّسك إنك قاعد في قاعة الامتحان
            بجد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => onGo("lessons")}
              className="gold-btn rounded-2xl px-7 py-3.5 font-bold text-sm sm:text-base transition-transform hover:scale-[1.03] active:scale-95 inline-flex items-center gap-2"
            >
              <GraduationCap className="h-5 w-5" />
              ابدأ التعلم من الصفر
            </button>
            <button
              onClick={() => onGo("exam")}
              className="glass rounded-2xl px-7 py-3.5 font-bold text-sm sm:text-base transition-all hover:bg-white/10 hover:scale-[1.03] active:scale-95 inline-flex items-center gap-2 text-gold-soft"
            >
              <Timer className="h-5 w-5" />
              امتحان تجريبي — 30 سؤال
            </button>
          </motion.div>

          {/* signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex flex-col items-center gap-1"
          >
            <Signature size={56} delay={0.2} />
            <span className="text-[11px] text-muted-foreground/70">إعداد</span>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute bottom-6 text-muted-foreground/50 text-xs"
        >
          ↓ اسحب لتحت
        </motion.div>
      </section>

      {/* ============ PIPELINE + STATS ============ */}
      <section className="relative px-4 pb-20 max-w-4xl mx-auto">
        <Pipeline />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {[
            { n: TOTAL, l: "سؤال جاهز", sub: "من ورقة الامتحان" },
            { n: 6, l: "فصول مشروحة", sub: "عربي + إنجليزي" },
            { n: 30, l: "سؤال في الامتحان", sub: "20 اختياري + 10 صح/غلط" },
            { n: 45, l: "دقيقة مؤقت", sub: "إحساس الامتحان الحقيقي" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="glass rounded-2xl p-4 sm:p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-gold-soft">
                <CountUp to={s.n} />
              </div>
              <div className="mt-1 text-xs sm:text-sm font-semibold">{s.l}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {solvedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl mt-6 p-5 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <div className="text-sm font-bold">تقدمك الحالي</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                حليت <span className="lat font-bold text-gold-soft">{solvedCount}</span> سؤال —
                إجاباتك الصحيحة{" "}
                <span className="lat font-bold text-emerald-400">{correctCount}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-36 sm:w-52 h-2.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(solvedCount / TOTAL) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-l from-gold to-gold-soft"
                />
              </div>
              <span className="lat text-sm font-bold text-gold-soft">{accuracy}%</span>
            </div>
          </motion.div>
        )}
      </section>

      {/* ============ FEATURES ============ */}
      <section className="relative px-4 pb-20 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black text-center mb-8"
        >
          إزاي الموقع هياخدك <span className="text-shine">من الصفر للقمة؟</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="glass rounded-3xl p-6 group"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6 text-gold-soft" />
              </div>
              <h3 className="font-bold text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ NUMBERS TO MEMORIZE ============ */}
      <section className="relative px-4 pb-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            أرقام <span className="text-shine">لازم تحفظها</span>
          </h2>
          <button
            onClick={() => onGo("lessons")}
            className="text-xs sm:text-sm text-gold-soft hover:underline"
          >
            اتعلمها في الدروس ←
          </button>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {numberCards.slice(0, 7).map((c, i) => (
            <motion.div
              key={c.en + i}
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 220 }}
              whileHover={{ y: -6, rotate: 1 }}
              className="glass rounded-2xl p-4 text-center cursor-default"
            >
              <div className="lat text-4xl font-black text-gold-soft">{c.big}</div>
              <div className="mt-2 text-[11px] sm:text-xs font-bold leading-snug">{c.ar}</div>
              <div className="text-[9px] sm:text-[10px] text-muted-foreground mt-1 leading-tight">{c.en}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative px-4 pb-24 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[2rem] p-8 sm:p-12 relative overflow-hidden"
        >
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.8 0.12 85 / 0.25), transparent 70%)" }}
          />
          <h2 className="font-display text-2xl sm:text-4xl font-bold leading-snug">
            جاهز تختبر نفسك كأنك في الامتحان؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            30 سؤال مختارين عشوائيًا من كل بنك الأسئلة — مؤقت 45 دقيقة، تنقّل بين الأسئلة، وشهادة
            نتيجة بتوقيعك في الآخر.
          </p>
          <button
            onClick={() => onGo("exam")}
            className="gold-btn rounded-2xl px-8 py-4 font-black text-base mt-7 inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Timer className="h-5 w-5" />
            يلا نبدأ الامتحان
          </button>
        </motion.div>
      </section>
    </div>
  );
}
