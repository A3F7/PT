import type { Question } from "./types";
import { bookA } from "./q-book-a";
import { bookB } from "./q-book-b";
import { bookC } from "./q-book-c";
import { bookTf } from "./q-book-tf";
import { midterm1 } from "./q-m1";
import { midterm2 } from "./q-m2";
import { midterm3 } from "./q-m3";

export * from "./types";

export const allQuestions: Question[] = [
  ...bookA,
  ...bookB,
  ...bookC,
  ...bookTf,
  ...midterm1,
  ...midterm2,
  ...midterm3,
];

export const mcqPool = allQuestions.filter((x) => x.type === "mcq");
export const tfPool = allQuestions.filter((x) => x.type === "tf");

export const TOTAL = allQuestions.length;
export const TOTAL_MCQ = mcqPool.length;
export const TOTAL_TF = tfPool.length;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Exam composition: 20 random MCQ + 10 random T/F (like the real midterm) */
export function buildExam(): Question[] {
  const mcq = shuffle(mcqPool).slice(0, 20);
  const tf = shuffle(tfPool).slice(0, 10);
  // keep MCQs first then T/F, but shuffle within each block
  return [...shuffle(mcq), ...shuffle(tf)];
}

export function chapterCount(ch: number): number {
  return allQuestions.filter((x) => x.ch === ch).length;
}
