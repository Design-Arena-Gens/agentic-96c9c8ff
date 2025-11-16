import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "دستیار متخصص اینستاگرام",
  description:
    "یک داشبورد هوشمند برای برنامه‌ریزی محتوا، تقویم انتشار و رشد ارگانیک در اینستاگرام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} antialiased bg-gradient-to-br from-[#f8f5ff] via-[#fefefe] to-[#f1f9ff]`}
      >
        {children}
      </body>
    </html>
  );
}
