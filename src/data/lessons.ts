import type { Lesson } from "./lesson-types";
import { lessonsA } from "./lessons-a";
import { lessonsB } from "./lessons-b";

export type { Block, Lesson } from "./lesson-types";
export const lessons: Lesson[] = [...lessonsA, ...lessonsB];

/** Quick-revision cards: numbers & shortcuts to memorize */
export interface RevCard {
  big: string;
  ar: string;
  en: string;
}

export const numberCards: RevCard[] = [
  { big: "3", ar: "مكونات النظام", en: "Inputs — Processing — Outputs" },
  { big: "3", ar: "وظائف نظام المعلومات المحاسبي", en: "Collect & Store — Process — Control" },
  { big: "2", ar: "أوجه إضافة القيمة", en: "Accurate/Timely Info — Better Decisions" },
  { big: "2", ar: "فئات الأنظمة المحاسبية", en: "Manual — Computerized" },
  { big: "7", ar: "وحدات النظام المحوسب", en: "Sales, Purchases, HR, Production, Assets, Financial, GL" },
  { big: "5", ar: "مكونات النظام المحوسب", en: "People, Procedures, Data, Software, Hardware" },
  { big: "2", ar: "حزم البرامج الشائعة", en: "Peachtree — QuickBooks" },
  { big: "1", ar: "قاعدة التكنولوجيا", en: "Benefits must EXCEED costs" },
  { big: "11", ar: "قائمة منسدلة في شريط القوائم", en: "File … Help" },
  { big: "7", ar: "مراكز تنقل على الشريط الأيسر", en: "Business Status … Company/System" },
  { big: "16", ar: "خطوة لتثبيت البرنامج", en: "Installation Steps" },
  { big: "6", ar: "خطوة لإزالة التثبيت", en: "Backup أولاً!" },
  { big: "2", ar: "طريقتان لفتح Setup Guide", en: "File — Help" },
  { big: "2", ar: "معدلان فرديان للضريبة (ولاية+مقاطعة)", en: "4% + 2% = 6%" },
];

export const shortcutRows: string[][] = [
  ["Ctrl + O", "Open Company — فتح شركة", "File"],
  ["Ctrl + N", "New Company — شركة جديدة", "File"],
  ["Ctrl + F", "Find Transactions — البحث عن معاملات", "Edit"],
  ["F1", "Peachtree Help — التعليمات", "Help"],
  ["Alt + F4", "Close window — إغلاق النافذة", "ويندوز"],
  ["Ctrl + C", "Copy — نسخ", "ويندوز"],
  ["Ctrl + V", "Paste — لصق", "ويندوز"],
];

export const tasksMenuRows: string[][] = [
  ["إنشاء أمر بيع", "Tasks ← Quotes/Sales Orders ← Sales Order"],
  ["إصدار فاتورة مبيعات (فوترة العملاء)", "Tasks ← Sales/Invoicing"],
  ["تسجيل أموال مستلمة من العملاء", "Tasks ← Receipts"],
  ["إيداع المبالغ في البنك", "Tasks ← Select for Deposit"],
  ["إدخال أمر شراء", "Tasks ← Purchase Orders"],
  ["إدخال فاتورة مورد (استلام بضاعة)", "Tasks ← Purchases/Receive Inventory"],
  ["سداد للموردين", "Tasks ← Payments"],
  ["صرف راتب موظف", "Tasks ← Payroll Entry"],
];
