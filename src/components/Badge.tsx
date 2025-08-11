"use client";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-lg bg-[var(--mint-2)] px-2.5 py-1 font-medium text-slate-800 ring-1 ring-white/60 transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-emerald-100">
      {children}
    </span>
  )
}