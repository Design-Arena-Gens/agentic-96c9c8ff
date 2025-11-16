"use client";

import { addDays, format } from "date-fns";
import { faIR } from "date-fns/locale";
import { useMemo, useState } from "react";

type FormatKey = "carousel" | "reel" | "story" | "live" | "static";

const formatLabels: Record<FormatKey, string> = {
  carousel: "کاروسل آموزشی",
  reel: "ریلز پویا",
  story: "استوری تعاملی",
  live: "لایو / همکاری",
  static: "پست گرافیکی",
};

const formatHighlights: Record<FormatKey, string> = {
  carousel: "نمونه محتوا: «۵ نکته طلایی برای ...» + CTA ذخیره",
  reel: "نمونه محتوا: هوک ۳ ثانیه‌ای + نمایش سریع نتیجه",
  story: "نمونه محتوا: سؤال چندگزینه‌ای + اسلایدر احساس",
  live: "نمونه محتوا: گفت‌وگو با متخصص یا مشتری منتخب",
  static: "نمونه محتوا: نقل‌قول الهام‌بخش + معرفی محصول",
};

const bestPostingTimes: Record<FormatKey, string> = {
  carousel: "ساعت ۱۱ صبح یا ۸ شب",
  reel: "ساعت ۹ شب (روزهای زوج)",
  story: "۷ صبح، ۱ بعدازظهر، ۹ شب",
  live: "چهارشنبه ساعت ۹ شب",
  static: "۱۰ صبح یا ۶ عصر",
};

const schedulePattern: FormatKey[] = [
  "carousel",
  "reel",
  "story",
  "static",
  "reel",
  "story",
  "live",
];

const hashtagBuckets = {
  awareness: ["#آگاهی_برند", "#داستان_برند", "#پشت_صحنه", "#BrandStory"],
  engagement: ["#چالش_اینستاگرام", "#پرسش_و_پاسخ", "#TalkToUs", "#CommunityLove"],
  sales: ["#پیشنهاد_ویژه", "#خرید_هوشمند", "#LimitedOffer", "#ShopNow"],
  community: ["#خانواده_برند", "#ClubMembers", "#باهم_قویتریم", "#CommunityCare"],
  launch: ["#لانچ_جدید", "#اولین_نگاه", "#ComingSoon", "#ProductDrop"],
};

interface CalendarBuilderProps {
  goal: keyof typeof hashtagBuckets;
  heroProduct: string;
}

export function CalendarBuilder({ goal, heroProduct }: CalendarBuilderProps) {
  const [startDate, setStartDate] = useState<string>(() =>
    format(new Date(), "yyyy-MM-dd"),
  );

  const weeklySchedule = useMemo(() => {
    const baseDate = new Date(startDate);
    return schedulePattern.map((formatKey, index) => {
      const date = addDays(baseDate, index);
      return {
        dayLabel: format(date, "EEEE", { locale: faIR }),
        dateLabel: format(date, "d MMMM", { locale: faIR }),
        formatKey,
        focus: formatHighlights[formatKey],
        timing: bestPostingTimes[formatKey],
      };
    });
  }, [startDate]);

  const hashtags = hashtagBuckets[goal] ?? hashtagBuckets.awareness;

  return (
    <section className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl shadow-sky-100/30 backdrop-blur-xl">
      <header className="mb-6 flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-medium text-sky-600">
          تقویم هوشمند
        </span>
        <h2 className="text-2xl font-semibold text-slate-900">
          برنامه هفتگی محتوا
        </h2>
        <p className="text-sm leading-6 text-slate-600">
          با انتخاب تاریخ شروع، برنامه هفتگی اتوماتیک تهیه می‌شود. زمان‌های پیشنهادی
          بر اساس میانگین عملکرد پیج‌های فارسی‌زبان تنظیم شده است.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-inner shadow-slate-100/70 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">تاریخ شروع</p>
          <p className="text-sm text-slate-600">
            {format(new Date(startDate), "EEEE d MMMM", { locale: faIR })}
          </p>
        </div>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 md:w-56"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {weeklySchedule.map((item) => (
          <article
            key={item.dayLabel}
            className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-sky-50/60 p-5 shadow-md shadow-slate-100/60"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-sky-600">
                  {item.dayLabel}
                </p>
                <p className="text-sm text-slate-500">{item.dateLabel}</p>
              </div>
              <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-600">
                {formatLabels[item.formatKey]}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">{item.focus}</p>
            <div className="mt-4 rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-slate-500">
              بهترین زمان انتشار: {item.timing}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              CTA پیشنهاد شده: دعوت به تجربه {heroProduct} یا ارسال پیام برای دریافت
              مشاوره.
            </p>
          </article>
        ))}
      </div>

      <footer className="mt-6 rounded-2xl border border-sky-200/60 bg-sky-50/60 p-5 text-sm text-sky-700">
        <p className="font-semibold text-sky-800">هشتگ‌های آماده استفاده:</p>
        <p className="mt-2 flex flex-wrap gap-2 text-xs text-sky-700">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sky-200 bg-white px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </p>
      </footer>
    </section>
  );
}
