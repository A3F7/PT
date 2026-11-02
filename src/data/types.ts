export type QType = "mcq" | "tf";

export interface Biopt {
  en: string;
  ar: string;
}

export interface Question {
  id: string;
  type: QType;
  ch: number; // 1..6
  src: string; // e.g. "كتاب المقرر" | "ميدترم 1"
  en: string;
  ar: string;
  opts: Biopt[];
  a: number; // index of correct option
  why: Biopt; // explanation
}

export const TF_OPTS: Biopt[] = [
  { en: "True", ar: "صحيح ✓" },
  { en: "False", ar: "خطأ ✗" },
];

/** MCQ helper */
export const q = (
  id: string,
  ch: number,
  en: string,
  ar: string,
  opts: [string, string][],
  a: number,
  whyEn: string,
  whyAr: string,
  src = "كتاب المقرر",
): Question => ({
  id,
  type: "mcq",
  ch,
  src,
  en,
  ar,
  opts: opts.map(([e, r]) => ({ en: e, ar: r })),
  a,
  why: { en: whyEn, ar: whyAr },
});

/** True/False helper */
export const tf = (
  id: string,
  ch: number,
  en: string,
  ar: string,
  a: number,
  whyEn: string,
  whyAr: string,
  src = "كتاب المقرر",
): Question => ({
  id,
  type: "tf",
  ch,
  src,
  en,
  ar,
  opts: TF_OPTS,
  a,
  why: { en: whyEn, ar: whyAr },
});

export const CHAPTERS: { n: number; ar: string; en: string; short: string }[] = [
  { n: 1, ar: "نظام المحاسبة المحوسب: نظرة عامة", en: "Computerized Accounting System — Overview", short: "نظرة عامة" },
  { n: 2, ar: "تثبيت واستكشاف Peachtree", en: "Installing & Exploring Peachtree", short: "التثبيت والاستكشاف" },
  { n: 3, ar: "المهام اليومية: البيع والشراء والرواتب", en: "Daily Tasks: Selling, Buying & Payroll", short: "المهام اليومية" },
  { n: 4, ar: "إنشاء شركة جديدة", en: "Creating a New Business", short: "إنشاء شركة" },
  { n: 5, ar: "دفتر الأستاذ العام وشجرة الحسابات", en: "General Ledger & Chart of Accounts", short: "الأستاذ العام" },
  { n: 6, ar: "إعداد العملاء وضرائب المبيعات", en: "Setting up Customers & Sales Taxes", short: "العملاء والضرائب" },
];

export const LETTERS = ["A", "B", "C", "D", "E", "F"];
