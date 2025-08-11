"use client";

import Image from "next/image";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

export default function ProfileCard() {
  const hasAvatar = true; // set to false if you haven't added /public/avatar.png yet

  return (
    <Card>
      <div className="relative overflow-hidden rounded-xl flex flex-col items-center">
        {hasAvatar ? (
          <Image
            src="/avatar.png"
            alt="Mike avatar"
            width={112}
            height={112}
            className="rounded-full border-4 border-white/60"
            priority
          />
        ) : (
          <div className="mx-auto mt-2 h-28 w-28 rounded-full border-4 border-white/60 bg-gradient-to-br from-emerald-200 via-emerald-100 to-white shadow-inner" />
        )}

        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-slate-900">Mike</div>
          <div className="text-sm text-slate-600">Software Engineer</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          <Badge>UGA CS</Badge>
          <Badge>Atlanta, GA</Badge>
          <Badge>Pastel enjoyer</Badge>
        </div>
        <div className="mt-5 rounded-xl bg-gradient-to-r from-emerald-100 via-white to-emerald-50 p-3 text-center text-sm text-slate-700">
          Crafting clean, minimal, and human-friendly software.
        </div>
      </div>
    </Card>
  );
}
