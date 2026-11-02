"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  AlarmClock,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Flag,
  FlagOff,
  Play,
  RefreshCcw,
  ScrollText,
  X,
} from "lucide-react";
import { buildExam, LETTERS, type Question } from "@/data";
import { Signature } from "./Signature";

const EXAM_SECONDS = 45 * 60;
const PASS = 15; // 15/30 = 50%

type Phase = "intro" | "running" | "done";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function gradeOf(pct: number) {
  if (pct >= 90) return { t: "ممتاز", c: "#6ee7b7" };
  if (pct >= 80) return { t: "جيد جدًا", c: "#f4d58d" };
  if (pct >= 65) return { t: "جيد", c: "#e9c46a" };
  if (pct >= 50) return { t: "مقبول", c: "#fdba74" };
  return { t: "محتاج مراجعة", c: "#fda4af" };
}

/* ================= Timer ring ================= */
function TimerRing({ left, danger }: { left: number; danger: boolean }) {
  const R = 26;
  const C = 2 * Math.PI * R;
  const pct = left / EXAM_SECONDS;
  return (
    <div
      role="timer"
      aria-label={`الوقت المتبقي ${fmt(left)}`}
      className={`relative h-16 w-16 ${danger ? "animate-pulse-glow rounded-full" : ""}`}
    >
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke={danger ? "#fb7185" : "#e9c46a"}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct)}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.4s" }}
        />
      </svg>
      <span
        className={`lat absolute inset-0 flex items-center justify-center text-[13px] font-black ${
          danger ? "text-rose-300" : "text-gold-soft"
        }`}
      >
        {fmt(left)}
      </span>
    </div>
  );
}

/* ================= Exam view ================= */
export function ExamView() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);
  const [left, setLeft] = useState(EXAM_SECONDS);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);

  const start = useCallback(() => {
    setQuestions(buildExam());
    setAnswers({});
    setFlags({});
    setCurrent(0);
    setLeft(EXAM_SECONDS);
    setTimeUsed(0);
    setPhase("running");
    window.scrollTo({ top: 0 });
  }, []);

  const finish = useCallback(() => {
    setPhase((p) => (p === "running" ? "done" : p));
    window.scrollTo({ top: 0 });
  }, []);

  // countdown + auto-submit when time is up
  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => {
      setTimeUsed((t) => t + 1);
      setLeft((s) => {
        const next = Math.max(0, s - 1);
        if (next === 0) {
          clearInterval(id);
          // defer out of the state updater
          setTimeout(finish, 0);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, finish]);

  const danger = left <= 5 * 60 && phase === "running";
  const answeredCount = Object.keys(answers).length;
  const q = questions[current];

  const score = useMemo(() => {
    if (phase !== "done") return 0;
    return questions.reduce((acc, qq) => acc + (answers[qq.id] === qq.a ? 1 : 0), 0);
  }, [phase, questions, answers]);

  const wrongOnes = useMemo(
    () => (phase === "done" ? questions.filter((qq) => answers[qq.id] !== qq.a) : []),
    [phase, questions, answers]
  );

  // pass celebration
  useEffect(() => {
    if (phase === "done" && score >= PASS) {
      const fire = (ratio: number, opts: confetti.Options) =>
        confetti({ ...opts, origin: { y: 0.6 }, particleCount: Math.floor(220 * ratio), spread: 90, startVelocity: 42 });
      fire(0.3, { colors: ["#e9c46a", "#f4d58d", "#ffffff"] });
      setTimeout(() => fire(0.25, { angle: 60, colors: ["#34d399", "#6ee7b7"] }), 220);
      setTimeout(() => fire(0.25, { angle: 120, colors: ["#e9c46a", "#fbbf24"] }), 380);
    }
  }, [phase, score]);

  /* ---------- INTRO ---------- */
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] p-8 sm:p-10 text-center relative overflow-hidden"
        >
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.8 0.12 85/0.22), transparent 70%)" }}
          />
          <div className="h-16 w-16 mx-auto rounded-3xl gold-btn flex items-center justify-center mb-5">
            <AlarmClock className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">مود الامتحان</h1>
          <p className="mt-2 text-sm text-muted-foreground">كأنك قاعد في قاعة الامتحان بجد</p>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { n: "30", l: "سؤال", s: "أسئلة حقيقية من الورقة" },
              { n: "20+10", l: "اختياري + صح/غلط", s: "نفس تركيبة الامتحان" },
              { n: "45", l: "دقيقة", s: "مؤقت ينازلي" },
            ].map((x, i) => (
              <motion.div
                key={x.l}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl bg-white/[0.04] border border-white/8 p-4"
              >
                <div className="lat text-2xl font-black text-gold-soft">{x.n}</div>
                <div className="text-xs font-bold mt-1">{x.l}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{x.s}</div>
              </motion.div>
            ))}
          </div>

          <ul className="mt-7 space-y-2 text-start text-[13px] text-muted-foreground">
            {[
              "الأسئلة بتتختار عشوائيًا من بنك الأسئلة كله — كل محاولة مختلفة عن التانية.",
              "الأسئلة بالإنجليزي وترجمتها العربي تحتها، زي الورقة بتاعتك بالظبط.",
              "مينفعش تشوف الإجابات الصحيحة قبل التسليم — بس تقدر تعلّم سؤال للمراجعة.",
              "لو الوقت خلص، الامتحان يتسلم لوحده أوتوماتيك.",
              "في الآخر: شهادة بدرجتك وتوقيعك + مراجعة كل غلط بالشرح.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>

          <button
            onClick={start}
            className="gold-btn rounded-2xl px-10 py-4 font-black text-lg mt-8 inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Play className="h-5 w-5" />
            ابدأ الامتحان دلوقتي
          </button>
        </motion.div>
      </div>
    );
  }

  /* ---------- DONE: certificate + review ---------- */
  if (phase === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const g = gradeOf(pct);
    const passed = score >= PASS;
    return (
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
        {/* ===== Certificate ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="relative rounded-[2rem] p-[1.5px]"
          data-testid="certificate"
          style={{ background: "linear-gradient(135deg, #e9c46a55, #ffffff14 30%, #e9c46a55)" }}
        >
          <div className="glass rounded-[calc(2rem-1.5px)] p-7 sm:p-12 text-center relative overflow-hidden">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
                className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center border-4 ${
                  passed ? "border-emerald-400/60 bg-emerald-400/10" : "border-rose-400/60 bg-rose-400/10"
                }`}
              >
                {passed ? <Award className="h-10 w-10 text-emerald-300" /> : <X className="h-10 w-10 text-rose-300" />}
              </motion.div>

              <p className="glow-gold mt-4 text-xs tracking-[0.3em] text-gold-soft/80 font-bold uppercase lat">
                Certificate of Achievement
              </p>
              <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold">شهادة نتيجة الامتحان</h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Peachtree / Sage 50 — حزم البرامج المحاسبية · 30 سؤال
              </p>

              {/* score ring */}
              <div className="mt-7 flex items-center justify-center">
                <div className="relative h-40 w-40">
                  <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(1 0 0/0.08)" strokeWidth="9" />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={g.c}
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / questions.length) }}
                      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                      className="lat text-4xl font-black"
                      style={{ color: g.c }}
                    >
                      {score}
                      <span className="text-lg text-muted-foreground">/{questions.length}</span>
                    </motion.span>
                    <span className="lat text-sm font-bold text-gold-soft">{pct}%</span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-4"
              >
                <span
                  className="inline-block rounded-full px-6 py-2 font-black text-lg border"
                  style={{ color: g.c, borderColor: `${g.c}55`, background: `${g.c}14` }}
                >
                  {g.t}
                </span>
                <p className="mt-3 text-xs text-muted-foreground">
                  {passed
                    ? `نجحت! جبت ${score} من 30 — لف الحد الأدنى (${PASS}).`
                    : `الناجح من ${PASS} — رجّع على الغلطات تحت وحاول تاني، أنت أقرب مما تتخيل.`}
                  <span className="lat block mt-0.5 opacity-70">Time used: {fmt(timeUsed)}</span>
                </p>
              </motion.div>

              {/* signature */}
              <div className="mt-8 flex flex-col items-center">
                <Signature size={64} delay={1.4} />
                <div className="h-px w-44 bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-1" />
                <span className="mt-1.5 text-[10px] text-muted-foreground/70">توقيع المُعد</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            onClick={start}
            className="gold-btn rounded-2xl px-7 py-3.5 font-black text-sm inline-flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" /> امتحان جديد (أسئلة تانية)
          </button>
          <button
            onClick={() => {
              setPhase("intro");
              window.scrollTo({ top: 0 });
            }}
            className="glass rounded-2xl px-7 py-3.5 font-bold text-sm hover:bg-white/10"
          >
            رجوع لشاشة البداية
          </button>
        </div>

        {/* ===== Review ===== */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2 mb-1">
            <ScrollText className="h-6 w-6 text-gold-soft" /> مراجعة الغلطات
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {wrongOnes.length === 0
              ? "مفيش غلطات خالص — برافو عليك! 🏆"
              : `${wrongOnes.length} سؤال محتاج مراجعة — اقرأ الشرح تحت كل سؤال.`}
          </p>
          <div className="space-y-4">
            {wrongOnes.map((qq, i) => {
              const picked = answers[qq.id];
              return (
                <motion.div
                  key={qq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  className="glass rounded-2xl p-5 border-r-4 !border-r-rose-400/60"
                >
                  <p className="lat text-sm font-bold" dir="ltr">
                    {qq.en}
                  </p>
                  <p className="text-[13px] text-gold-soft/90 mt-1">{qq.ar}</p>
                  <div className="mt-3 space-y-1.5 text-[12.5px]">
                    <div className="flex items-start gap-2 text-rose-300">
                      <X className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>
                        إجابتك:{" "}
                        <span className="lat font-bold" dir="ltr">
                          {picked === undefined ? "— (مجوبتش)" : `${LETTERS[picked]}. ${qq.opts[picked]?.en}`}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-emerald-300">
                      <Check className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>
                        الصحيح:{" "}
                        <span className="lat font-bold" dir="ltr">
                          {LETTERS[qq.a]}. {qq.opts[qq.a]?.en}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-white/[0.04] border border-white/8 p-3">
                    <p className="text-[12.5px] leading-relaxed">{qq.why.ar}</p>
                    <p className="lat mt-1 text-[11.5px] text-muted-foreground" dir="ltr">
                      {qq.why.en}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- RUNNING ---------- */
  const flagged = flags[q?.id ?? ""];
  return (
    <div className="max-w-3xl mx-auto px-4 pt-20 pb-28">
      {/* exam header */}
      <div className="glass rounded-3xl p-4 sm:px-6 sticky top-[68px] z-30 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-rose-300 flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full bg-rose-400 ${danger ? "animate-ping" : ""}`} />
            Exam
          </span>
        </div>
        <div className="flex-1 min-w-0">
          {danger && (
            <span className="sr-only" role="alert">
              تنبيه: بقيت خمس دقائق أو أقل على انتهاء الامتحان
            </span>
          )}
          <div className="h-2 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-l from-gold to-gold-soft rounded-full"
              animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">
            سؤال <span className="lat font-bold text-gold-soft">{current + 1}</span> من{" "}
            <span className="lat">{questions.length}</span> · جاوبت{" "}
            <span className="lat">{answeredCount}</span>
          </div>
        </div>
        <TimerRing left={left} danger={danger} />
      </div>

      {/* navigator grid */}
      <div className="mt-4 grid grid-cols-10 gap-1.5">
        {questions.map((qq, i) => {
          const isCur = i === current;
          const isAns = answers[qq.id] !== undefined;
          const isFlag = flags[qq.id];
          return (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              className={`lat relative h-8 rounded-lg text-[11px] font-bold transition-all ${
                isCur
                  ? "bg-gold text-black scale-110 shadow-lg"
                  : isAns
                    ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                    : "bg-white/6 text-muted-foreground border border-white/8 hover:bg-white/12"
              }`}
            >
              {i + 1}
              {isFlag && (
                <span className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-full bg-amber-400 border border-black/40" />
              )}
            </button>
          );
        })}
      </div>

      {/* question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id + current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.28 }}
          className="glass rounded-3xl p-6 sm:p-8 mt-4"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-gold/15 border border-gold/25 text-gold-soft px-2 py-0.5 text-[11px] font-black">
                {q.type === "tf" ? "صح وغلط" : "اختياري"}
              </span>
              <span className="rounded-lg bg-white/6 border border-white/10 px-2 py-0.5 text-[11px] text-muted-foreground">
                فصل {q.ch}
              </span>
            </div>
            <button
              onClick={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold inline-flex items-center gap-1.5 border transition ${
                flagged
                  ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {flagged ? <FlagOff className="h-3.5 w-3.5" /> : <Flag className="h-3.5 w-3.5" />}
              {flagged ? "معلم للمراجعة" : "علّم للمراجعة"}
            </button>
          </div>

          <p className="lat text-lg font-bold leading-relaxed" dir="ltr" data-testid="exam-q-en">
            {q.en}
          </p>
          <p className="mt-2 text-[15px] font-semibold text-gold-soft/90">{q.ar}</p>

          <div className="mt-5 grid gap-2">
            {q.opts.map((opt, i) => {
              const chosen = answers[q.id] === i;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  data-testid={`exam-opt-${i}`}
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-right transition-all ${
                    chosen
                      ? "border-gold/60 bg-gold/[0.1] shadow-[0_0_24px_-6px_oklch(0.82_0.12_85/0.35)]"
                      : "border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15"
                  }`}
                >
                  <span
                    className={`lat mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                      chosen ? "bg-gold text-black" : "bg-white/8 text-foreground/80"
                    }`}
                  >
                    {LETTERS[i]}
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
        </motion.div>
      </AnimatePresence>

      {/* nav buttons */}
      <div className="flex items-center justify-between gap-3 mt-5">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          data-testid="exam-prev"
          className="glass rounded-2xl px-6 py-3 font-bold text-sm inline-flex items-center gap-1.5 disabled:opacity-30 hover:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" /> السابق
        </button>
        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            data-testid="exam-next"
            className="gold-btn rounded-2xl px-8 py-3 font-black text-sm inline-flex items-center gap-1.5"
          >
            التالي <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setConfirmOpen(true)}
            data-testid="exam-submit"
            className="gold-btn rounded-2xl px-8 py-3 font-black text-sm inline-flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" /> سلّم الامتحان
          </button>
        )}
      </div>

      {/* submit button always visible (corner, away from content) */}
      <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40">
        <button
          onClick={() => setConfirmOpen(true)}
          className="rounded-2xl px-5 py-3 font-black text-sm bg-rose-400/90 hover:bg-rose-400 text-black shadow-2xl border border-white/20 transition inline-flex items-center gap-2"
        >
          <Check className="h-4 w-4" /> تسليم ({answeredCount}/{questions.length})
        </button>
      </div>

      {/* confirm dialog */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setConfirmOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-7 max-w-sm w-full text-center border-gold/30"
            >
              <AlarmClock className="h-10 w-10 text-gold-soft mx-auto mb-3" />
              <h3 className="font-black text-xl">تسلّم دلوقتي؟</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                جاوبت على <span className="lat font-bold text-gold-soft">{answeredCount}</span> من{" "}
                <span className="lat">{questions.length}</span>
                {answeredCount < questions.length && " — الأسئلة اللي فاضلية هتتحسب غلط."}
              </p>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 glass rounded-xl py-3 font-bold text-sm hover:bg-white/10"
                >
                  كمّل حل
                </button>
                <button onClick={finish} data-testid="exam-confirm-yes" className="flex-1 gold-btn rounded-xl py-3 font-black text-sm">
                  أيوه، سلّم
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
