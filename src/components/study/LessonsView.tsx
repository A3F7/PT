"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Lightbulb,
  ListOrdered,
  Table2,
  Workflow,
} from "lucide-react";
import type { Block, Lesson } from "@/data/lessons";
import { lessons } from "@/data/lessons";

/* ---------------- Interactive Peachtree-window mockup ---------------- */
function WindowMockup({ b, idx }: { b: Extract<Block, { k: "win" }>; idx: number }) {
  const [openMenu, setOpenMenu] = useState<string | null>(b.open);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (idx % 3) * 0.06 }}
      className="rounded-2xl overflow-hidden border border-white/10 bg-card/90 shadow-2xl"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/8" dir="ltr">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="lat ml-2 text-[11px] text-muted-foreground truncate">{b.title}</span>
      </div>
      {/* menu bar */}
      <div className="flex flex-wrap gap-1 px-2 py-1.5 bg-white/[0.03] border-b border-white/8" dir="ltr">
        {b.menus.map((m) => (
          <button
            key={m}
            onClick={() => setOpenMenu(m)}
            className={`lat rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              openMenu === m ? "bg-gold text-black" : "text-muted-foreground hover:bg-white/8 hover:text-foreground"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-[1fr_1.1fr]">
        {/* open menu + items */}
        <div className="p-3 border-b md:border-b-0 md:border-l border-white/8">
          <AnimatePresence mode="wait">
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="rounded-xl bg-secondary/70 border border-white/10 p-1.5"
              dir="ltr"
            >
              <div className="lat px-2 py-1 text-[10px] font-bold text-gold-soft/80 uppercase tracking-wider">
                {openMenu}
              </div>
              {b.items.map((it, i) => (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`lat flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[12px] ${
                    b.pick === it.label
                      ? "bg-gold/15 text-gold-soft font-bold border border-gold/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {b.pick === it.label && <Check className="h-3.5 w-3.5" />}
                    {it.label}
                  </span>
                  {it.hot && (
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-muted-foreground">{it.hot}</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* fields + note */}
        <div className="p-4">
          {b.fields && b.fields.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3" dir="ltr">
              {b.fields.map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="lat rounded-lg bg-white/6 border border-white/10 px-2 py-1 text-[10px] text-slate-300"
                >
                  {f}
                </motion.span>
              ))}
            </div>
          )}
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">{b.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Block renderer ---------------- */
function BlockView({ b, idx }: { b: Block; idx: number }) {
  switch (b.k) {
    case "h":
      return (
        <motion.h3
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-black mt-10 mb-4 first:mt-0"
        >
          <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-gold to-gold/30" />
          {b.t}
        </motion.h3>
      );
    case "p":
      return (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[15px] leading-[2] text-foreground/90 bg-white/[0.03] border border-white/6 rounded-2xl p-5 my-4"
        >
          {b.t}
        </motion.p>
      );
    case "exam":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="my-4 rounded-2xl border border-rose-400/25 bg-rose-400/[0.07] p-4 flex gap-3"
        >
          <AlertTriangle className="h-5 w-5 text-rose-300 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-black text-rose-300 mb-1">تنبيه امتحاني — Exam Alert</div>
            <p className="text-[13.5px] leading-relaxed text-foreground/90">{b.t}</p>
          </div>
        </motion.div>
      );
    case "list":
      return (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="my-4 space-y-2"
        >
          {b.items.map((it, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, x: 18 }, show: { opacity: 1, x: 0 } }}
              className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.03] px-4 py-3 text-[14px] leading-relaxed"
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-gold shrink-0" />
              <span>{it}</span>
            </motion.li>
          ))}
        </motion.ul>
      );
    case "steps":
      return (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="my-5"
        >
          {b.title && (
            <div className="flex items-center gap-2 text-sm font-bold text-gold-soft mb-3">
              <ListOrdered className="h-4 w-4" /> {b.title}
            </div>
          )}
          <ol className="relative border-r-2 border-gold/25 mr-3 space-y-4">
            {b.items.map((it, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="relative pr-8"
              >
                <span className="absolute -right-[15px] top-0.5 h-6 w-6 rounded-full bg-gold text-black text-xs font-black flex items-center justify-center shadow-lg">
                  {i + 1}
                </span>
                <p className="text-[14px] leading-relaxed bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/6">
                  {it}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      );
    case "table":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-5 rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gold/12">
                  {b.heads.map((h) => (
                    <th key={h} className="px-4 py-3 text-right font-black text-gold-soft whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Table2 className="h-3.5 w-3.5" />
                        {h}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <motion.tr
                    key={ri}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ri * 0.06 }}
                    className={ri % 2 ? "bg-white/[0.02]" : ""}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 align-top leading-relaxed border-t border-white/6 ${
                          ci === 0 ? "font-bold text-foreground/95 whitespace-nowrap" : "text-muted-foreground"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    case "flow":
      return (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="my-5 glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-gold-soft mb-4">
            <Workflow className="h-4 w-4" /> مخطط متحرك
          </div>
          <div className="flex items-center justify-between gap-2">
            {b.steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.22, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2 flex-1 last:flex-none"
              >
                <div className="lat rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/25 px-3 py-2 text-xs font-bold text-center whitespace-pre-line flex-1">
                  {s}
                </div>
                {i < b.steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.22 + 0.15 }}
                    className="h-px w-4 sm:w-8 bg-gold/50 origin-right"
                  />
                )}
              </motion.div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed">{b.note}</p>
        </motion.div>
      );
    case "win":
      return <WindowMockup b={b} idx={idx} />;
  }
}

/* ---------------- Lessons view ---------------- */
export function LessonsView({ onGoExam }: { onGoExam: () => void }) {
  const [active, setActive] = useState<number>(1);
  const lesson: Lesson = useMemo(() => lessons.find((l) => l.n === active) ?? lessons[0], [active]);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
      {/* header */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-gold-soft mb-3">
          <BookOpen className="h-3.5 w-3.5" /> الدروس — بالعربي مع المصطلح الإنجليزي
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          الفصول <span className="text-shine">الستة</span>
        </h1>
      </motion.div>

      {/* chapter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
        {lessons.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.n)}
            className={`relative shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
              active === l.n ? "text-black" : "glass text-foreground/80 hover:bg-white/10"
            }`}
          >
            {active === l.n && (
              <motion.span
                layoutId="chapter-pill"
                className="absolute inset-0 rounded-2xl gold-btn"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <span className="lat font-black me-1.5">{l.n}</span>
              {l.ar}
            </span>
          </button>
        ))}
      </div>

      {/* active lesson */}
      <AnimatePresence mode="wait">
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <div className="glass rounded-3xl p-6 sm:p-9">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <span className="lat text-5xl font-black text-gold/25">{String(lesson.n).padStart(2, "0")}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">{lesson.ar}</h2>
            </div>
            <p className="lat text-sm text-muted-foreground mb-2" dir="ltr">
              Chapter {lesson.n} — {lesson.en}
            </p>
            <p className="text-sm text-gold-soft/90 mb-8">{lesson.blurb}</p>
            <div className="space-y-1">
              {lesson.blocks.map((b, i) => (
                <BlockView key={i} b={b} idx={i} />
              ))}
            </div>
          </div>

          {/* prev / next */}
          <div className="flex items-center justify-between mt-6 gap-3">
            <button
              disabled={lesson.n === 1}
              onClick={() => setActive((n) => Math.max(1, n - 1))}
              className="glass rounded-2xl px-5 py-3 text-sm font-bold inline-flex items-center gap-2 disabled:opacity-30 hover:bg-white/10 transition"
            >
              <ArrowRight className="h-4 w-4" /> الفصل السابق
            </button>
            {lesson.n < 6 ? (
              <button
                onClick={() => setActive((n) => Math.min(6, n + 1))}
                className="gold-btn rounded-2xl px-5 py-3 text-sm font-black inline-flex items-center gap-2"
              >
                الفصل التالي <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={onGoExam}
                className="gold-btn rounded-2xl px-5 py-3 text-sm font-black inline-flex items-center gap-2"
              >
                خلصت؟ امتحن نفسك <Lightbulb className="h-4 w-4" />
              </button>
            )}
          </div>

          <details className="mt-6 glass rounded-2xl p-5">
            <summary className="flex items-center gap-2 cursor-pointer font-bold text-sm text-gold-soft">
              <ChevronDown className="h-4 w-4" /> نصيحة مذاكرة للفصل ده
            </summary>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
              اقرأ الفصل مرة بالعربي، وبعدها افتح بنك الأسئلة وفلتر على نفس الفصل — كل غلط هترجع
              للجزء اللي شرحه هنا. التكرار على الأسئلة الحقيقية هو أسرع طريق للتثبيت.
            </p>
          </details>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
