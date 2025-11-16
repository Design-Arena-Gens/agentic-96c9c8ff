"use client";

import { useMemo } from "react";

type GoalKey =
  | "awareness"
  | "engagement"
  | "sales"
  | "community"
  | "launch";

type ToneKey = "energetic" | "friendly" | "luxury" | "minimal" | "bold";

const tonePresets: Record<ToneKey, { descriptors: string[]; emoji: string }> = {
  energetic: {
    descriptors: ["ریتم تند", "واژگان مثبت", "هیجان لحظه‌ای"],
    emoji: "⚡️",
  },
  friendly: {
    descriptors: ["صمیمی", "صادق", "اعتمادساز"],
    emoji: "🤝",
  },
  luxury: {
    descriptors: ["مینیمال", "ظرافت لوکس", "ساختار یکدست"],
    emoji: "💎",
  },
  minimal: {
    descriptors: ["مینیمال", "تصاویر خلوت", "تمرکز روی محصول"],
    emoji: "🧘‍♀️",
  },
  bold: {
    descriptors: ["زبان جسور", "تضادهای شدید", "کنتراست رنگی"],
    emoji: "🔥",
  },
};

const goalPresets: Record<
  GoalKey,
  {
    tagline: string;
    primaryCalls: string[];
    captionTemplate: string;
    reelHook: string;
  }
> = {
  awareness: {
    tagline: "نمایش ارزش برند و خلق آگاهی گسترده",
    primaryCalls: [
      "استفاده از ریلزهای پشت صحنه برای معرفی ارزش منحصربه‌فرد برند",
      "همکاری با صفحات مکمل برای معرفی متقابل",
      "طراحی اسلایدهای آموزنده کوتاه درباره مسئله‌ای که حل می‌کنید",
    ],
    captionTemplate:
      "آیا می‌دانستی {pain_point}؟ ما اینجا هستیم تا با {solution} یک تغییر جدی ایجاد کنیم. 👇",
    reelHook: "۳ دلیل که چرا {audience} همین امروز باید {action} را شروع کند",
  },
  engagement: {
    tagline: "بالا بردن تعامل ارگانیک و گفتگو با مخاطب",
    primaryCalls: [
      "راه‌اندازی استوری‌های چندگزینه‌ای و اسلایدرهای حس و حال",
      "چالش هفتگی UGC با هشتگ اختصاصی",
      "تولید پست‌های کاروسل با سؤالات چالشی و کاربردی",
    ],
    captionTemplate:
      "ماجرا اینجاست که {audience} همیشه درباره {topic} کنجکاو است! نظر تو چیست؟ 👇",
    reelHook:
      "Hot take! آیا واقعاً {myth} حقیقت دارد؟ تا آخر ویدیو بمون تا جواب رو بگیری",
  },
  sales: {
    tagline: "تبدیل علاقه‌مندها به مشتری و هدایت به خرید",
    primaryCalls: [
      "اشتراک‌گذاری تجربه مشتریان واقعی در قالب UGC",
      "طراحی بسته‌های تخفیف/باندل با CTA مشخص",
      "کاروسل‌های آموزشی با CTA نهایی برای خرید",
    ],
    captionTemplate:
      "{audience} آماده یک ارتقای جدی است؟ با {offer} تا {benefit} فقط یک قدم فاصله داری.",
    reelHook:
      "{number} ثانیه با من همراه باش تا ببینی چطور {product} زندگی تو را ساده می‌کند",
  },
  community: {
    tagline: "ساخت جامعه وفادار و ایجاد حس تعلق",
    primaryCalls: [
      "معرفی مشتریان/کاربران برجسته هر هفته",
      "گفت‌وگوهای لایو با متخصصان یا مشتریان منتخب",
      "برگزاری جلسات پرسش و پاسخ در استوری",
    ],
    captionTemplate:
      "این فضا برای {audience} ساخته شده؛ بگو ببینیم بزرگ‌ترین دغدغه‌ات در {topic} چیه؟ 💬",
    reelHook:
      "یک روز با {persona}، ببین جامعه ما چطور کنار هم قوی‌تر می‌شود!",
  },
  launch: {
    tagline: "ایجاد موج اولیه و لانچ موفق محصول جدید",
    primaryCalls: [
      "تیزرهای شمارش معکوس با نمایش ویژگی‌های کلیدی",
      "استوری‌های پشت‌صحنه از روند تولید/آماده‌سازی",
      "دعوت از میکرواینفلئنسرها برای تست پیش از لانچ",
    ],
    captionTemplate:
      "لانچ رسمی {product} نزدیکه! عضو لیست انتظار شو تا اولین نفری باشی که {benefit}.",
    reelHook: "اولین نگاه به {product}: آماده‌ای برای تجربه‌ای متفاوت؟",
  },
};

const frequencyOptions = [
  { value: 3, label: "۳ پست در هفته" },
  { value: 4, label: "۴ پست در هفته" },
  { value: 5, label: "۵ پست در هفته" },
  { value: 7, label: "پست روزانه" },
];

const basePillars = [
  { title: "آموزش کاربردی", description: "نکات سریع، مینی دوره‌ها و چگونه‌ها" },
  { title: "سبک زندگی/پشت‌صحنه", description: "پشت صحنه تیم، فرهنگ و روند تولید" },
  { title: "تجربه مشتری", description: "UGC، نظرات و اثبات اجتماعی" },
  { title: "پیشنهاد ویژه", description: "آفرها، باندل‌ها و مزایای رقابتی" },
  { title: "تعامل مستقیم", description: "سؤالات، چالش‌ها و مسابقات" },
];

const toneTitles: Record<ToneKey, string> = {
  energetic: "پر انرژی و هیجان‌انگیز",
  friendly: "صمیمی و قابل اعتماد",
  luxury: "لوکس و مینیمال",
  minimal: "آرام و مینیمال",
  bold: "جسور و متفاوت",
};

const goalLabels: Record<GoalKey, string> = {
  awareness: "آگاهی از برند",
  engagement: "تعامل و گفتگو",
  sales: "افزایش فروش/لید",
  community: "ساخت جامعه وفادار",
  launch: "لانچ و معرفی محصول",
};

export interface PlannerState {
  brand: string;
  tone: ToneKey;
  goal: GoalKey;
  audience: string;
  primaryPain: string;
  heroProduct: string;
  frequency: number;
}

interface StrategyPlannerProps {
  values: PlannerState;
  onChange: (values: PlannerState) => void;
}

export function StrategyPlanner({ values, onChange }: StrategyPlannerProps) {
  const { brand, tone, goal, audience, primaryPain, heroProduct, frequency } =
    values;

  const update = (next: Partial<PlannerState>) =>
    onChange({ ...values, ...next });

  const selectedTone = tonePresets[tone];
  const selectedGoal = goalPresets[goal];

  const contentPillars = useMemo(() => {
    const enhanced = [...basePillars];
    if (goal === "sales") {
      enhanced.push({
        title: "اثبات عملکرد",
        description: "تشریح نتایج، قبل/بعد و مقایسه‌ها",
      });
    }
    if (goal === "launch") {
      enhanced.push({
        title: "تیزرهای لانچ",
        description: "افشای تدریجی ویژگی‌ها و داستان تولید",
      });
    }
    return enhanced.slice(0, Math.min(enhanced.length, frequency));
  }, [goal, frequency]);

  const weeklyMix = useMemo(() => {
    const templates = [
      "کاروسل آموزشی درباره {topic}",
      "ریلز داستانی با محوریت {hook}",
      "استوری تعاملی برای پرسیدن نظر مخاطب",
      "UGC یا نظر مشتری مرتبط با {product}",
      "پست انگیزشی/الهام‌بخش هماهنگ با هویت برند",
      "پیشنهاد ویژه یا CTA مستقیم",
      "Live یا Q&A کوتاه با تمرکز بر {audience}",
    ];

    return templates.slice(0, frequency).map((item) => {
      return item
        .replace("{topic}", primaryPain)
        .replace("{hook}", selectedGoal.reelHook)
        .replace("{product}", heroProduct)
        .replace("{audience}", audience)
        .replace("{brand}", brand)
        .replace("{action}", "اقدام اصلی")
        .replace("{number}", "۳۰");
    });
  }, [frequency, primaryPain, selectedGoal.reelHook, heroProduct, audience, brand]);

  const caption = useMemo(() => {
    return selectedGoal.captionTemplate
      .replace("{pain_point}", primaryPain)
      .replace("{solution}", heroProduct)
      .replace("{audience}", audience)
      .replace("{topic}", primaryPain)
      .replace("{offer}", heroProduct)
      .replace("{benefit}", "نتیجه‌ای که وعده می‌دهید")
      .replace("{product}", heroProduct);
  }, [selectedGoal.captionTemplate, primaryPain, heroProduct, audience]);

  const toneHighlights = useMemo(() => {
    return selectedTone.descriptors.join(" • ");
  }, [selectedTone]);

  return (
    <section className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl shadow-fuchsia-100/40 backdrop-blur-xl">
      <header className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-1 text-xs font-medium text-fuchsia-600">
          دستیار استراتژی
        </span>
        <h2 className="text-2xl font-semibold text-slate-900">
          پلن محتوایی اختصاصی برای اینستاگرام {brand}
        </h2>
        <p className="text-sm leading-6 text-slate-600">
          تنظیم ورودی‌ها برای دریافت پیشنهادهای هدفمند و قابل اجرا در کمپین‌های
          هفته جاری.
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-inner shadow-slate-200/30">
          <div>
            <label className="block text-xs font-semibold text-slate-500">
              نام برند یا پروژه
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
              value={brand}
              onChange={(event) =>
                update({ brand: event.target.value || "برند" })
              }
              placeholder="مثال: برند لباس ورزشی ولنس"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500">
              مخاطب اصلی
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
              value={audience}
              onChange={(event) =>
                update({ audience: event.target.value || "مخاطبان شما" })
              }
              placeholder="مثال: بانوان ۲۵-۳۵ سال علاقه‌مند به سبک زندگی سالم"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500">
              اصلی‌ترین دغدغه مخاطب
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
              value={primaryPain}
              onChange={(event) =>
                update({ primaryPain: event.target.value || "چالش اصلی مخاطب" })
              }
              placeholder="مثال: پیدا کردن برنامه تمرین خانگی بدون تجهیزات"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500">
              محصول یا پیشنهاد محوری هفته
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
              value={heroProduct}
              onChange={(event) =>
                update({ heroProduct: event.target.value || "محصول/خدمت کلیدی" })
              }
              placeholder="مثال: پکیج تمرین ۲۸ روزه + تغذیه اختصاصی"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500">
                لحن برند
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
                value={tone}
                onChange={(event) => update({ tone: event.target.value as ToneKey })}
              >
                {Object.entries(toneTitles).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500">
                هدف اصلی این هفته
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
                value={goal}
                onChange={(event) => update({ goal: event.target.value as GoalKey })}
              >
                {Object.entries(goalLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500">
              تعداد پست برنامه‌ریزی‌شده
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  className={`rounded-full border px-4 py-1 text-xs font-medium transition ${
                    frequency === option.value
                      ? "border-fuchsia-500 bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-200"
                      : "border-slate-200 bg-white text-slate-500 hover:border-fuchsia-400 hover:text-fuchsia-600"
                  }`}
                  onClick={() => update({ frequency: option.value })}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <article className="rounded-2xl border border-fuchsia-200/60 bg-gradient-to-br from-fuchsia-50 via-white to-rose-50 p-6 shadow-md shadow-fuchsia-100/60">
            <h3 className="text-sm font-semibold text-fuchsia-600">
              امضای لحن برند {selectedTone.emoji}
            </h3>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {toneTitles[tone]}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              کلیدواژه‌های اصلی: {toneHighlights}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-md shadow-slate-200/40">
            <h3 className="text-sm font-semibold text-slate-500">
              استراتژی محوری ({goalLabels[goal]})
            </h3>
            <p className="mt-3 text-base font-semibold text-slate-800">
              {selectedGoal.tagline}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {selectedGoal.primaryCalls.map((call, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                    {index + 1}
                  </span>
                  <span>{call}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-md shadow-slate-200/40">
            <h3 className="text-sm font-semibold text-slate-500">
              کپشن پیشنهادی برای پست اصلی هفته
            </h3>
            <p className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm leading-7 text-slate-700">
              {caption}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              CTA پیشنهادی: کلیک روی لینک بیو، ارسال پیام برای دریافت جزئیات یا
              ذخیره‌سازی پست برای دسترسی بعدی.
            </p>
          </article>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-inner shadow-slate-100/60">
          <h3 className="text-sm font-semibold text-slate-500">
            پیلارهای هفته
          </h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-700">
            {contentPillars.map((pillar, index) => (
              <li
                key={index}
                className="rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-3"
              >
                <p className="font-semibold text-slate-800">
                  {index + 1}. {pillar.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{pillar.description}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-inner shadow-slate-100/60">
          <h3 className="text-sm font-semibold text-slate-500">
            ترکیب پیشنهادی محتوا ({frequency} پست)
          </h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-700">
            {weeklyMix.map((item, index) => (
              <li
                key={index}
                className="rounded-xl border border-slate-100 bg-gradient-to-r from-fuchsia-50/60 via-white to-fuchsia-50/60 px-4 py-3"
              >
                <p className="font-semibold text-slate-800">
                  روز {index + 1} — {item}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
