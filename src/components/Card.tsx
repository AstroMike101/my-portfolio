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
      className={`rounded-2xl border border-white/70 bg-white/70 p-5 shadow-lg backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  )
}
