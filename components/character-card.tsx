"use client";

import Image from "next/image";
import type { Character } from "@/lib/characters";

type CharacterCardProps = {
  character: Character;
  isSelected?: boolean;
  onEdit?: (character: Character) => void;
  onDelete?: (character: Character) => void;
};

export function CharacterCard({ character, isSelected = false, onEdit, onDelete }: CharacterCardProps) {
  const heroImage = character.referenceImages[0];

  return (
    <article className={`group overflow-hidden rounded-[2rem] border bg-black/25 transition hover:-translate-y-1 hover:border-purple-200/50 ${isSelected ? "border-fuchsia-200 shadow-glow" : "border-white/10"}`}>
      <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-500/40 via-fuchsia-500/20 to-slate-950 p-4">
        <div className="absolute inset-0 bg-radial-grid bg-[length:18px_18px] opacity-25" />
        {heroImage ? (
          <Image src={heroImage.dataUrl} alt={`${character.name} reference`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-90" unoptimized />
        ) : (
          <div className="relative grid h-full place-items-center rounded-[1.5rem] border border-white/15 bg-black/20 text-center backdrop-blur-sm">
            <div>
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-white/10 text-3xl font-black text-white ring-1 ring-white/20">
                {character.name.charAt(0).toUpperCase() || "?"}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-purple-100">Character profile</p>
            </div>
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {character.referenceImages.length} refs
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-black tracking-[-0.05em] text-white">{character.name || "Untitled character"}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{character.description || "No character description added yet."}</p>
          </div>
          {isSelected ? <span className="rounded-full bg-fuchsia-400/20 px-3 py-1 text-xs font-bold text-fuchsia-100">Selected</span> : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-300">Hair</p>
            <p className="mt-1 font-semibold text-white">{character.hairColor || "Not set"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-300">Eyes</p>
            <p className="mt-1 font-semibold text-white">{character.eyeColor || "Not set"}</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">{character.notes || "No character notes added yet."}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => onEdit?.(character)} className="flex-1 rounded-2xl border border-purple-300/25 bg-purple-400/10 px-4 py-3 text-sm font-bold text-purple-100 transition hover:bg-purple-400/20">
            Edit
          </button>
          <button type="button" onClick={() => onDelete?.(character)} className="flex-1 rounded-2xl border border-pink-300/20 bg-pink-500/10 px-4 py-3 text-sm font-bold text-pink-100 transition hover:bg-pink-500/20">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
