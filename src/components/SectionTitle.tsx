"use client";

export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="relative text-xs font-bold uppercase tracking-wider text-emerald-700/80 transition-colors duration-200 hover:text-emerald-600">
        {kicker}
        <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-emerald-400 transition-all duration-300 hover:w-full rounded-full" />
      </span>
      <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl transition-all duration-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500">
        {title}
      </h2>
    </div>
  );
}