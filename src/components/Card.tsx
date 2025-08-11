"use client";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`group rounded-2xl border border-white/70 bg-white/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/80 ${className}`}
    >
      {children}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-teal-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  )
}