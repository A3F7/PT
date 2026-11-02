import type { Metadata, Viewport } from "next";
import { Cairo, Outfit, Noto_Naskh_Arabic } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Display serif for Arabic headings (UI UX Pro Max — "Arabic Elegant" pairing)
const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Peachtree Master — من الصفر للامتحان | نظام المحاسبة المحوسب",
  description:
    "موقع تعليمي تفاعلي ياخدك من صفر في مادة حزم البرامج المحاسبية (Peachtree / Sage 50) لحد ما تحل أي سؤال: شرح كامل بالعربي والإنجليزي، بنك 214 سؤال بترجمة وشرح، ومود امتحان حقيقي 30 سؤال.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#060a14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${outfit.variable} ${naskh.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <MotionConfig reducedMotion="user">
          {children}
          <Toaster />
        </MotionConfig>
      </body>
    </html>
  );
}
