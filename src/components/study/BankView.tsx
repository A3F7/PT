"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, RotateCcw, Search, X } from "lucide-react";
import { allQuestions, CHAPTERS, LETTERS, TOTAL, type Question } from "@/data";
import { useProgress } from "@/hooks/use-progress";

function QuestionCard({
  q,
  index,
  solved,
  onAnswer,
}: {
  q: Question;
  index: number;
  solved?: { picked: number; correct: boolean };
  onAnswer: (qid: string, picked: number, correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(solved?.picked ?? null);
  const revealed = picked !== null;
  const isCorrect = picked === q.a;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45 }}
      className="glass rounded-3xl p-5 sm:p-7"
    >
      {/* header row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="lat rounded-lg bg-gold/15 border border-gold/25 text-gold-soft px-2 py-0.5 text-[11px] font-black">
          {q.id.startsWith("bm") || q.id.startsWith("bt") ? "كتاب" : q.src}
        </span>
        <span className="rounded-lg bg-white/6 border border-white/10 px-2 py-0.5 text-[11px] text-muted-foreground">
          فصل {q.ch} — {CHAPTERS.find((c) => c.n === q.ch)?.short}
        </span>
        <span className="rounded-lg bg-white/6 border border-white/10 px-2 py-0.5 text-[11px] text-muted-foreground">
          {q.type === "tf" ? "صح وغلط" : "اختياري"}
        </span>
        {solved && (
          <span
            className={`lat rounded-lg px-2 py-0.5 text-[11px] font-bold border ${
              solved.correct
                ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
                : "bg-rose-400/10 border-rose-400/30 text-rose-300"
            }`}
          >
            {solved.correct ? "صحبتها قبل كده ✓" : "غلطت فيها قبل كده ✗"}
          </span>
        )}
        <span className="lat ms-auto text-[11px] text-muted-foreground/60">
          #{index + 1}
        </span>
      </div>

      {/* question EN + AR */}
      <p className="lat text-[15.5px] sm:text-base font-bold leading-relaxed" dir="ltr">
        {q.en}
      </p>
      <p className="mt-1.5 text-[14.5px] font-semibold text-gold-soft/90 leading-relaxed">{q.ar}</p>

      {/* options */}
      <div className="mt-4 grid gap-2">
        {q.opts.map((opt, i) => {
          const correct = i === q.a;
          const chosen = picked === i;
          let cls = "border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15";
          if (revealed && correct) cls = "border-emerald-400/50 bg-emerald-400/[0.09]";
          else if (revealed && chosen && !correct) cls = "border-rose-400/50 bg-rose-400/[0.08]";
          else if (revealed) cls = "border-white/6 bg-white/[0.015] opacity-60";
          return (
            <motion.button
              key={i}
              disabled={revealed}
              onClick={() => {
                setPicked(i);
                onAnswer(q.id, i, i === q.a);
              }}
              whileTap={!revealed ? { scale: 0.985 } : undefined}
              animate={
                revealed && chosen && !correct
                  ? { x: [0, -7, 7, -4, 4, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`group flex items-start gap-3 rounded-2xl border px-4 py-3 text-right transition-all ${cls}`}
            >
              <span
                className={`lat mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-colors ${
                  revealed && correct
                    ? "bg-emerald-400 text-black"
                    : revealed && chosen
                      ? "bg-rose-400 text-black"
                      : "bg-white/8 text-foreground/80 group-hover:bg-gold/25"
                }`}
              >
                {revealed && correct ? <Check className="h-4 w-4" /> : revealed && chosen ? <X className="h-4 w-4" /> : LETTERS[i]}
              </span>
              <span className="min-w-0">
                <span className="lat block text-[14px] font-semibold leading-snug" dir="ltr">
                  {opt.en}
                </span>
                <span className="block text-[12.5px] text-muted-foreground mt-0.5">{opt.ar}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className={`rounded-2xl border p-4 ${
                isCorrect ? "border-emerald-400/25 bg-emerald-400/[0.05]" : "border-rose-400/25 bg-rose-400/[0.05]"
              }`}
            >
              <div className="text-xs font-black mb-1.5" style={{ color: isCorrect ? "#6ee7b7" : "#fda4af" }}>
                {isCorrect ? "ممتاز! إجابة صح — ليه دي؟" : "غلط — بص على الإجابة الصحيحة والشرح"}{" "}
                <span className="lat opacity-70">
                  {isCorrect ? "Correct — why?" : "Wrong — learn why"}
                </span>
              </div>
              <p className="text-[13.5px] leading-relaxed">{q.why.ar}</p>
              <p className="lat mt-2 text-[12.5px] leading-relaxed text-muted-foreground" dir="ltr">
                {q.why.en}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {revealed && (
        <button
          onClick={() => setPicked(null)}
          className="mt-3 text-[11px] text-muted-foreground/70 hover:text-gold-soft inline-flex items-center gap-1 transition"
        >
          <RotateCcw className="h-3 w-3" /> حاول تاني
        </button>
      )}
    </motion.article>
  );
}

type TypeFilter = "all" | "mcq" | "tf";

export function BankView() {
  const { progress, record, ready } = useProgress();
  const [ch, setCh] = useState<number | "all">("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [src, setSrc] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [hideSolved, setHideSolved] = useState(false);
  const [visible, setVisible] = useState(10);

  const sources = useMemo(() => ["all", ...Array.from(new Set(allQuestions.map((q) => q.src)))], []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return allQuestions.filter((q) => {
      if (ch !== "all" && q.ch !== ch) return false;
      if (type !== "all" && q.type !== type) return false;
      if (src !== "all" && q.src !== src) return false;
      if (hideSolved && progress.solved[q.id]) return false;
      if (
        s &&
        !q.en.toLowerCase().includes(s) &&
        !q.ar.includes(s) &&
        !q.opts.some((o) => o.en.toLowerCase().includes(s) || o.ar.includes(s))
      )
        return false;
      return true;
    });
  }, [ch, type, src, search, hideSolved, progress]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
      {/* header */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-gold-soft mb-3">
          <Search className="h-3.5 w-3.5" /> بنك الأسئلة — كل سؤال بترجمته وشرحه
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          <span className="lat text-shine">{TOTAL}</span> سؤال — حلّهم كلهم
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          اضغط على أي اختيار: هيقولك صح ولا غلط فورًا + ليه. تقدمك بيتحفظ أوتوماتيك.
        </p>
      </motion.div>

      {/* filters */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-4 sm:p-5 mb-6 space-y-3"
      >
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisible(10);
            }}
            placeholder="ابحث بالعربي أو الإنجليزي..."
            className="w-full rounded-xl bg-white/5 border border-white/10 py-2.5 pr-10 pl-4 text-sm outline-none focus:border-gold/50 transition"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCh("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${ch === "all" ? "gold-btn" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
          >
            كل الفصول
          </button>
          {CHAPTERS.map((c) => (
            <button
              key={c.n}
              onClick={() => setCh(c.n)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${ch === c.n ? "gold-btn" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
            >
              <span className="lat font-black me-1">{c.n}</span>
              {c.short}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              ["all", "الكل"],
              ["mcq", "اختياري"],
              ["tf", "صح وغلط"],
            ] as [TypeFilter, string][]
          ).map(([v, l]) => (
            <button
              key={v}
              onClick={() => setType(v)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${type === v ? "bg-gold/20 border border-gold/40 text-gold-soft" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
            >
              {l}
            </button>
          ))}
          <span className="w-px h-5 bg-white/10 mx-1" />
          <select
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-bold outline-none focus:border-gold/50 [&>option]:bg-card"
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "كل المصادر" : s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setHideSolved((v) => !v)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${hideSolved ? "bg-emerald-400/15 border border-emerald-400/40 text-emerald-300" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
          >
            {hideSolved ? "إخفاء المحلول: شغّال" : "إخفاء المحلول"}
          </button>
        </div>
        <div className="text-[11px] text-muted-foreground">
          النتيجة: <span className="lat font-bold text-gold-soft">{filtered.length}</span> سؤال
        </div>
      </motion.div>

      {/* list */}
      {!ready ? (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass rounded-3xl p-7 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {shown.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              index={i}
              solved={progress.solved[q.id]}
              onAnswer={record}
            />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisible((v) => v + 10)}
            className="glass rounded-2xl px-8 py-3.5 font-bold text-sm hover:bg-white/10 transition"
          >
            اعرض{" "}
            <span className="lat">{Math.min(10, filtered.length - visible)}</span> سؤال كمان (فاضل{" "}
            <span className="lat">{filtered.length - visible}</span>)
          </button>
        </div>
      )}
      {ready && filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
          مفيش أسئلة مطابقة للفلتر ده — جرب تغير البحث أو الفصول.
        </div>
      )}
    </div>
  );
}
