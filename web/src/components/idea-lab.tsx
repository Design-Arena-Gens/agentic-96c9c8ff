"use client";

import { useMemo, useState } from "react";

const ideaTemplates = [
  {
    category: "Reels",
    title: "ریلز Before/After",
    hook: "نمایش تغییر چشمگیر پس از استفاده از محصول",
    flow: [
      "هوک ۱ ثانیه‌ای: مشکل قبل از استفاده",
      "نمایش تایم‌لپس یا مقایسه قبل/بعد",
      "توضیح سریع ویژگی کلیدی",
      "CTA برای کلیک روی لینک بیو",
    ],
  },
  {
    category: "Stories",
    title: "استوری ۵ مرحله‌ای",
    hook: "آموزش سریع با اسلایدر حس و حال",
    flow: [
      "اسلاید ۱: سؤال یا مشکل اصلی",
      "اسلاید ۲-۴: گام‌های حل مسئله",
      "اسلاید ۵: نظرسنجی یا CTA به DM",
    ],
  },
  {
    category: "Carousel",
    title: "کاروسل آموزشی",
    hook: "۵ اشتباه رایج که باید همین امروز متوقف کنی",
    flow: [
      "کاور جذاب با عدد یا سؤال",
      "اسلایدهای ۲ تا ۵: توضیح اشتباه + راه‌حل",
      "اسلاید آخر: CTA ذخیره و اشتراک",
    ],
  },
  {
    category: "Live",
    title: "لایو آموزشی ۲۰ دقیقه‌ای",
    hook: "پرسش و پاسخ زنده با متخصص داخلی یا مشتری شاخص",
    flow: [
      "۵ دقیقه: معرفی موضوع و مهمان",
      "۱۰ دقیقه: آموزش نکات کلیدی",
      "۵ دقیقه: پاسخ به سوالات و CTA نهایی",
    ],
  },
  {
    category: "UGC",
    title: "چالش جامعه",
    hook: "دعوت از مخاطب برای تولید محتوای کوتاه و تگ برند",
    flow: [
      "پست معرفی چالش + هشتگ اختصاصی",
      "استوری ریپست نمونه‌های منتخب",
      "اعلام برنده + جایزه نمادین",
    ],
  },
];

const toneAddons: Record<
  string,
  {
    captionCloser: string;
    emojiPack: string[];
  }
> = {
  energetic: {
    captionCloser: "همین الان دست به کار شو و برام بنویس کدوم مرحله برات جذاب‌تر بود! 💬",
    emojiPack: ["⚡️", "🔥", "🚀"],
  },
  friendly: {
    captionCloser:
      "ما کنارت هستیم؛ اگر سوالی داری همینجا بنویس تا باهم حلش کنیم. 🤍",
    emojiPack: ["😊", "🌿", "💬"],
  },
  luxury: {
    captionCloser:
      "برای رزرو تجربه اختصاصی، پیام خصوصی ارسال کن تا مشاور شخصی همراهت باشد.",
    emojiPack: ["💎", "✨", "🖤"],
  },
  minimal: {
    captionCloser:
      "اگر این پست برات مفید بود، ذخیره‌اش کن تا هنگام نیاز سریع پیداش کنی.",
    emojiPack: ["🧘‍♀️", "🌫️", "📌"],
  },
  bold: {
    captionCloser:
      "وقتشه متفاوت باشی؛ نظر جسورت رو در کامنت‌ها منتظر می‌مونم!",
    emojiPack: ["🔥", "🚨", "🎯"],
  },
};

interface IdeaLabProps {
  tone: keyof typeof toneAddons;
  audience: string;
  painPoint: string;
  product: string;
}

export function IdeaLab({ tone, audience, painPoint, product }: IdeaLabProps) {
  const [keyword, setKeyword] = useState("جدیدترین ترند");

  const selectedTone = toneAddons[tone] ?? toneAddons.energetic;

  const ideaList = useMemo(
    () =>
      ideaTemplates.map((template) => {
        const emojis = selectedTone.emojiPack.join(" ");
        return {
          ...template,
          hook: template.hook.replace(
            "...",
            `${keyword} برای ${audience}`,
          ),
          caption: `اگر ${audience} هم با ${painPoint} درگیرن، این پست رو براشون تگ کن. ${selectedTone.captionCloser}`,
          emojis,
        };
      }),
    [selectedTone, audience, painPoint, keyword],
  );

  return (
    <section className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl shadow-amber-100/40 backdrop-blur-xl">
      <header className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-medium text-amber-600">
          آزمایشگاه ایده
        </span>
        <h2 className="text-2xl font-semibold text-slate-900">
          ایده‌های سریع برای پر کردن تقویم محتوا
        </h2>
        <p className="text-sm leading-6 text-slate-600">
          با وارد کردن کلمه کلیدی، هوک‌ها و کپشن‌های آماده در اختیار داشته باش.
        </p>
      </header>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-inner shadow-slate-100/60">
        <label className="text-xs font-semibold text-slate-500">
          کلمه کلیدی / ترند هفته
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value || "جدیدترین ترند")}
          placeholder="مثال: چالش ۷ روزه سلامت"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {ideaList.map((idea) => (
          <article
            key={idea.title}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-amber-50/70 to-white p-5 shadow-md shadow-amber-100/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-600">
                  {idea.category}
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {idea.title}
                </p>
              </div>
              <span className="text-lg">{idea.emojis}</span>
            </div>
            <p className="text-sm text-slate-700">{idea.hook}</p>
            <ul className="space-y-2 rounded-xl border border-amber-100 bg-white/80 px-4 py-3 text-xs text-slate-500">
              {idea.flow.map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-600">
                    {index + 1}
                  </span>
                  <span>{step.replace("...", keyword)}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs leading-6 text-slate-600">
              کپشن: {idea.caption.replace("{product}", product)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
