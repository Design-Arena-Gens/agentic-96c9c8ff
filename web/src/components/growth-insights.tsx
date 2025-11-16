"use client";

const weeklyInsights = [
  {
    title: "پایش KPI",
    description:
      "هر ۷۲ ساعت نرخ تعامل (ER) و نرخ کلیک لینک بیو را ثبت کن تا الگوی رشد مشخص شود.",
    tips: [
      "ER هدف: ۴ تا ۶ درصد برای پیج‌های میانگین",
      "تعداد ذخیره‌ها مهم‌تر از لایک است؛ در کپشن CTA ذخیره بگذار",
      "برای تحلیل بهتر، از UTM در لینک بیو استفاده کن",
    ],
  },
  {
    title: "بهینه‌سازی هشتگ",
    description:
      "برای هر پست ۳ دسته هشتگ بچین: اختصاصی برند، دسته‌بندی صنعتی، ترند روز.",
    tips: [
      "حداکثر ۱۵ هشتگ؛ ۳ تا اختصاصی، ۷ تا صنعتی، ۵ تا ترندی",
      "عملکرد هشتگ‌ها را در Insights دنبال کن و هر ۲ هفته ترکیب را تازه کن",
      "هشتگ اختصاصی برند بساز و در Highlights معرفی کن",
    ],
  },
  {
    title: "مدیریت جامعه",
    description:
      "پاسخ به DM و کامنت در ۲ ساعت اول انتشار نرخ الگوریتم را افزایش می‌دهد.",
    tips: [
      "از پاسخ‌های ذخیره شده با لحن برند استفاده کن",
      "پیام‌های صوتی کوتاه به مخاطب VIP حس اختصاصی می‌دهد",
      "هر هفته ۱۰ کامنت ارزشمند پین کن تا گفتگو فعال بماند",
    ],
  },
];

const resourceLinks = [
  {
    title: "چک‌لیست آماده برای لانچ کمپین",
    href: "https://miro.com/miroverse/social-media-launch-checklist",
  },
  {
    title: "ابزار تحلیل پیشرفته ساعات طلایی",
    href: "https://later.com/blog/best-time-to-post-on-instagram",
  },
  {
    title: "الگوی اکسل KPI اینستاگرام",
    href: "https://docs.google.com/spreadsheets/d/1A6kpi-dashboard-template",
  },
];

export function GrowthInsights() {
  return (
    <section className="rounded-3xl border border-white/40 bg-slate-900/90 p-8 text-white shadow-2xl shadow-slate-900/30 backdrop-blur-xl">
      <header className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/20 px-4 py-1 text-xs font-medium text-emerald-200">
          رشد و آنالیز
        </span>
        <h2 className="text-2xl font-semibold text-white">
          پروتکل نظارت و رشد هفته‌ای
        </h2>
        <p className="text-sm leading-6 text-slate-200/80">
          برای اینکه همیشه یک قدم جلوتر از الگوریتم باشی، این چک‌لیست‌ها را هر
          هفته مرور کن.
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {weeklyInsights.map((insight) => (
          <article
            key={insight.title}
            className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 shadow-inner shadow-black/20"
          >
            <div>
              <p className="text-sm font-semibold text-white">{insight.title}</p>
              <p className="mt-2 text-xs leading-6 text-slate-100/80">
                {insight.description}
              </p>
            </div>
            <ul className="space-y-2 text-xs leading-6 text-slate-200/90">
              {insight.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="text-emerald-300">▹</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <footer className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
          منابع
        </p>
        <ul className="mt-3 grid gap-3 text-sm text-slate-100/80 md:grid-cols-3">
          {resourceLinks.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-200 transition hover:text-white"
              >
                <span>{link.title}</span>
                <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}
