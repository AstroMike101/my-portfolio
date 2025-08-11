"use client";

export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700/80">{kicker}</span>
      <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
    </div>
  );
}
