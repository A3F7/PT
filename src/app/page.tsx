"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Home, ListChecks, Timer } from "lucide-react";
import { useState } from "react";
import { Aurora } from "@/components/study/Aurora";
import { HomeView } from "@/components/study/HomeView";
import { LessonsView } from "@/components/study/LessonsView";
import { BankView } from "@/components/study/BankView";
import { ExamView } from "@/components/study/ExamView";
import { Signature } from "@/components/study/Signature";
import { useProgress } from "@/hooks/use-progress";
import { TOTAL } from "@/data";

type View = "home" | "lessons" | "bank" | "exam";

const NAV: { id: View; label: string; icon: typeof Home }[] = [
  { id: "home", label: "الرئيسية", icon: Home },
  { id: "lessons", label: "الدروس", icon: BookOpen },
  { id: "bank", label: "الأسئلة", icon: ListChecks },
  { id: "exam", label: "الامتحان", icon: Timer },
];

export default function Page() {
  const [view, setView] = useState<View>("home");
  const { solvedCount, correctCount, record } = useProgress();

  const go = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Aurora />

      {/* ===== Header ===== */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-white/6 bg-[#060a14]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-[68px] flex items-center gap-3">
          <button onClick={() => go("home")} className="flex items-center gap-2.5 shrink-0 group">
            <span className="h-9 w-9 rounded-xl gold-btn flex items-center justify-center font-black lat text-lg transition-transform group-hover:scale-105">
              P
            </span>
            <span className="hidden sm:block text-start leading-none">
              <span className="block font-black text-sm">Peachtree Master</span>
              <span className="block text-[10px] text-muted-foreground mt-1">من الصفر للامتحان</span>
            </span>
          </button>

          <nav className="flex-1 flex items-center justify-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`relative rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-colors ${
                  view === n.id ? "text-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {view === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl gold-btn"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <n.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{n.label}</span>
                </span>
              </button>
            ))}
          </nav>

          <div className="hidden md:block shrink-0 opacity-90">
            <Signature size={22} delay={0} />
          </div>
        </div>
      </header>

      {/* ===== Views ===== */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {view === "home" && (
              <HomeView
                onGo={(v) => go(v)}
                solvedCount={solvedCount}
                correctCount={correctCount}
              />
            )}
            {view === "lessons" && <LessonsView onGoExam={() => go("exam")} />}
            {view === "bank" && <BankView />}
            {view === "exam" && <ExamView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ===== Footer (sticky) ===== */}
      <footer className="mt-auto border-t border-white/6 bg-[#060a14]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Signature size={26} delay={0} />
            <div className="leading-tight">
              <div className="text-xs font-bold">Peachtree Master — موقع تعليمي تفاعلي</div>
              <div className="text-[10px] text-muted-foreground">
                {TOTAL} سؤال مترجم ومشروح · 6 فصول · مود امتحان حقيقي
              </div>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground/70 lat" dir="ltr">
            Software Packages · BIS · Peachtree / Sage 50
          </div>
        </div>
      </footer>

      {/* ===== Mobile bottom tabs ===== */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/8 bg-[#060a14]/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                view === n.id ? "text-gold-soft" : "text-muted-foreground"
              }`}
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </button>
          ))}
        </div>
      </nav>
      {/* bottom padding for mobile tab bar */}
      <div className="sm:hidden h-16" />
    </div>
  );
}
