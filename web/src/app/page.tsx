"use client";

import { useMemo, useState } from "react";
import { CalendarBuilder } from "@/components/calendar-builder";
import { GrowthInsights } from "@/components/growth-insights";
import { IdeaLab } from "@/components/idea-lab";
import {
  PlannerState,
  StrategyPlanner,
} from "@/components/strategy-planner";

const initialPlannerState: PlannerState = {
  brand: "برند شما",
  tone: "friendly",
  goal: "engagement",
  audience: "مخاطبان اصلی",
  primaryPain: "نیاز یا دغدغه برجسته",
  heroProduct: "پیشنهاد ویژه هفته",
  frequency: 4,
};

const heroHighlights = [
  {
    label: "Planning",
    title: "تقویم هفتگی خودکار",
    description: "زمان‌بندی و فرمت محتوا برای هر روز هفته",
  },
  {
    label: "Content Lab",
    title: "هوک و کپشن آماده",
    description: "ایده‌های سریع برای ریلز، کاروسل و استوری",
  },
  {
    label: "Growth",
    title: "چک‌لیست رشد",
    description: "KPI و تاکتیک‌های آنالیز برای رشد پایدار",
  },
];

const goalFocusCopy: Record<PlannerState["goal"], string> = {
  awareness: "{brand} باید داستان و ارزش خود را در هر نقطه تماس تکرار کند.",
  engagement: "سؤال‌های باز و چالش‌های تعاملی موتور رشد گفتگو هستند.",
  sales: "هر محتوا باید مزیت {brand} را به سمت CTA خرید هدایت کند.",
  community: "نشان بده {brand} چگونه کنار جامعه‌اش می‌ایستد و صدای آنها را بلند می‌کند.",
  launch: "لانچ موفق یعنی هر روز یک تیزر متفاوت از {brand} به اشتراک گذاشته شود.",
};

export default function Home() {
  const [plannerState, setPlannerState] =
    useState<PlannerState>(initialPlannerState);

  const headline = useMemo(() => {
    const goalMap: Record<PlannerState["goal"], string> = {
      awareness: "آگاهی از برندت را در سه فاز بساز",
      engagement: "مخاطبانت را درگیر گفتگو کن",
      sales: "فروش ارگانیک اینستاگرام را فعال کن",
      community: "جامعه وفادار بساز و نگه‌داری کن",
      launch: "لانچ حرفه‌ای و پر سر و صدا داشته باش",
    };
    return goalMap[plannerState.goal];
  }, [plannerState.goal]);

  const highlightQuote = useMemo(() => {
    const map: Record<PlannerState["tone"], string> = {
      energetic:
        "هر محتوا باید از ثانیه اول انفجار انرژی منتقل کند تا اسکرول متوقف شود.",
      friendly:
        "زبانت شبیه دوستی باشد که تجربه شخصی‌اش را با مخاطب به اشتراک می‌گذارد.",
      luxury:
        "هوای سفید، نور نرم و مینیمال حرف اول را می‌زند؛ کمتر بگو اما حسابی تأثیرگذار.",
      minimal:
        "ساده بگو، دقیق بمان. تمرکز را روی محصول نگه دار و هر زایدی را حذف کن.",
      bold: "کافی است متفاوت باشی؛ یک ادعای جسور کن و ثابتش کن.",
    };
    return map[plannerState.tone];
  }, [plannerState.tone]);

  const focusCopy = useMemo(() => {
    return goalFocusCopy[plannerState.goal].replace(
      /\{brand\}/g,
      plannerState.brand,
    );
  }, [plannerState.goal, plannerState.brand]);

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-5 pb-20 pt-14 sm:px-10">
      <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-[540px] w-[540px] rounded-full bg-gradient-to-b from-fuchsia-200/40 via-transparent to-transparent blur-3xl" />

      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/80 p-8 shadow-2xl shadow-fuchsia-100/50 backdrop-blur-xl md:p-12">
        <div className="absolute inset-y-0 start-0 h-full w-1/2 bg-gradient-to-br from-fuchsia-200/30 via-transparent to-transparent blur-3xl" />
        <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/60 bg-fuchsia-100/50 px-4 py-1 text-xs font-semibold text-fuchsia-600">
              Social Media Operating System
            </span>
            <h1 className="text-3xl font-black leading-10 text-slate-900 md:text-4xl">
              {headline}
            </h1>
            <p className="text-sm leading-7 text-slate-600 md:text-base">
              داشبوردی که برای متخصصین سوشال مدیا طراحی شده تا بدون اتلاف وقت، پلن
              محتوایی، کپشن و تقویم انتشار را یکجا بچینند. با چند کلیک ورودی‌ها را
              شخصی‌سازی کن و هر هفته سناریوهای آماده اجرا تحویل بگیر.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/60 bg-white/60 px-4 py-3 shadow-md shadow-fuchsia-100/40"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-2xl shadow-fuchsia-100/60">
            <p className="text-xs font-semibold text-slate-500">
              یادداشت لحن انتخابی
            </p>
            <p className="text-sm leading-7 text-slate-700">{highlightQuote}</p>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold text-slate-500">
                هدف هفته ({plannerState.brand})
              </p>
              <p className="mt-2 text-sm text-slate-800">
                {focusCopy}
              </p>
              <p className="mt-3 text-[11px] text-slate-400">
                هر پیشنهاد پایین بر همین اساس به‌روزرسانی می‌شود.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-10">
        <StrategyPlanner values={plannerState} onChange={setPlannerState} />
        <CalendarBuilder
          goal={plannerState.goal}
          heroProduct={plannerState.heroProduct}
        />
        <IdeaLab
          tone={plannerState.tone}
          audience={plannerState.audience}
          painPoint={plannerState.primaryPain}
          product={plannerState.heroProduct}
        />
        <GrowthInsights />
      </div>
    </main>
  );
}
