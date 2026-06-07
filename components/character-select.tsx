"use client";

import { useEffect } from "react";
import { useLocalCharacters } from "@/components/use-local-characters";
import { DEFAULT_CHARACTER } from "@/lib/characters";
import type { Character } from "@/lib/characters";

type CharacterSelectProps = {
  selectedCharacterId: string;
  onSelect: (character: Character) => void;
};

export function CharacterSelect({ selectedCharacterId, onSelect }: CharacterSelectProps) {
  const { characters } = useLocalCharacters();
  const selectedCharacter = characters.find((character) => character.id === selectedCharacterId) ?? characters[0] ?? DEFAULT_CHARACTER;

  useEffect(() => {
    if (!characters.some((character) => character.id === selectedCharacterId)) {
      onSelect(characters[0] ?? DEFAULT_CHARACTER);
    }
  }, [characters, onSelect, selectedCharacterId]);

  return (
    <div className="glass-card rounded-[2rem] p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="section-title">Character selection</h3>
          <p className="mt-2 text-sm text-slate-400">Choose a saved character profile to guide this cover prompt.</p>
        </div>
        <a href="/characters" className="rounded-full border border-purple-300/25 bg-purple-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-100 transition hover:bg-purple-400/20">
          Manage library
        </a>
      </div>

      <label className="mt-5 block text-sm font-medium text-slate-300">
        Active character
        <select
          className="form-field mt-2"
          value={selectedCharacter.id}
          onChange={(event) => {
            const nextCharacter = characters.find((character) => character.id === event.target.value) ?? DEFAULT_CHARACTER;
            onSelect(nextCharacter);
          }}
        >
          {characters.length > 0 ? (
            characters.map((character) => (
              <option key={character.id} value={character.id} className="bg-slate-950">
                {character.name}
              </option>
            ))
          ) : (
            <option value={DEFAULT_CHARACTER.id} className="bg-slate-950">
              {DEFAULT_CHARACTER.name} (default preview)
            </option>
          )}
        </select>
      </label>

      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-4">
        <p className="font-display text-2xl font-black tracking-[-0.05em] text-white">{selectedCharacter.name}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">{selectedCharacter.description}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-300">Hair</p>
            <p className="mt-1 text-sm font-semibold text-white">{selectedCharacter.hairColor || "Not set"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-300">Eyes</p>
            <p className="mt-1 text-sm font-semibold text-white">{selectedCharacter.eyeColor || "Not set"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-300">Refs</p>
            <p className="mt-1 text-sm font-semibold text-white">{selectedCharacter.referenceImages.length} images</p>
          </div>
        </div>
      </div>
    </div>
  );
}
