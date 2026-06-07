"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { CharacterSelect } from "@/components/character-select";
import { DEFAULT_CHARACTER } from "@/lib/characters";
import type { Character } from "@/lib/characters";
import { generatedCovers } from "@/lib/mock-results";

const styles = ["Anime", "Illustration", "Watercolor", "Cinematic", "K-Pop"];
const ratios = ["1:1 Album Cover", "16:9 YouTube Thumbnail", "9:16 Shorts Cover", "4:5 Instagram"];

type UploadPreview = {
  id: string;
  name: string;
  url: string;
};

export function Dashboard() {
  const [uploads, setUploads] = useState<UploadPreview[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [selectedRatio, setSelectedRatio] = useState("1:1 Album Cover");
  const [songTitle, setSongTitle] = useState("Midnight Frequency");
  const [mood, setMood] = useState("Dreamy, confident, neon, late-night energy");
  const [notes, setNotes] = useState("Use a bold central character, purple atmosphere, and premium editorial lighting.");
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(DEFAULT_CHARACTER);

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const previews = files.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setUploads((current) => [...current, ...previews].slice(-6));
  }

  const handleCharacterSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
  }, []);

  const promptSummary = useMemo(
    () => `${songTitle || "Untitled track"} · ${selectedCharacter.name} · ${selectedStyle} · ${selectedRatio}`,
    [selectedCharacter.name, selectedRatio, selectedStyle, songTitle],
  );

  return (
    <section id="dashboard" className="px-6 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-300">Creator dashboard</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
              Design the cover direction
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            This dashboard uses mock uploads and generated artwork only. It is ready for a future AI image API integration without connecting one today.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="section-title">Character upload</h3>
                  <p className="mt-2 text-sm text-slate-400">Add reference images for the artist, mascot, or lead character.</p>
                </div>
                <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-200">Optional</span>
              </div>

              <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-purple-300/30 bg-purple-400/5 px-6 py-10 text-center transition hover:border-purple-200/70 hover:bg-purple-400/10">
                <input className="sr-only" type="file" accept="image/*" multiple onChange={handleUpload} />
                <span className="grid size-14 place-items-center rounded-2xl bg-white text-2xl text-slate-950">+</span>
                <span className="mt-4 font-semibold text-white">Upload character references</span>
                <span className="mt-1 text-sm text-slate-400">PNG, JPG, or WEBP. Preview appears below.</span>
              </label>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {uploads.length > 0 ? (
                  uploads.map((upload) => (
                    <div key={upload.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <Image src={upload.url} alt={upload.name} width={240} height={240} className="aspect-square w-full object-cover" unoptimized />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white opacity-0 transition group-hover:opacity-100">
                        {upload.name}
                      </div>
                    </div>
                  ))
                ) : (
                  ["Lead", "Pose", "Outfit"].map((placeholder) => (
                    <div key={placeholder} className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm text-slate-500">
                      {placeholder} preview
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-6">
              <h3 className="section-title">Song information</h3>
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-300">
                  Song title
                  <input className="form-field mt-2" value={songTitle} onChange={(event) => setSongTitle(event.target.value)} placeholder="e.g. Violet Skies" />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Mood
                  <input className="form-field mt-2" value={mood} onChange={(event) => setMood(event.target.value)} placeholder="e.g. romantic, gritty, futuristic" />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Notes
                  <textarea className="form-field mt-2 min-h-32 resize-none" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Describe visual details, colors, composition, or references." />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CharacterSelect selectedCharacterId={selectedCharacter.id} onSelect={handleCharacterSelect} />

            <div className="glass-card rounded-[2rem] p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="section-title">Style selection</h3>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                    {styles.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                          selectedStyle === style
                            ? "border-purple-200 bg-purple-400/25 text-white shadow-glow"
                            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-purple-300/40 hover:bg-white/[0.07]"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="section-title">Aspect ratio</h3>
                  <div className="mt-5 space-y-3">
                    {ratios.map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setSelectedRatio(ratio)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                          selectedRatio === ratio
                            ? "border-fuchsia-200 bg-fuchsia-400/20 text-white"
                            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-fuchsia-300/40 hover:bg-white/[0.07]"
                        }`}
                      >
                        {ratio}
                        <span className="size-3 rounded-full border border-current bg-current opacity-70" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-purple-300/20 bg-black/30 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-purple-300">Prompt preview</p>
                <p className="mt-3 font-display text-2xl font-bold text-white">{promptSummary}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Character: {selectedCharacter.description || "No character description added yet."}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Traits: {selectedCharacter.hairColor || "Unknown hair"} hair, {selectedCharacter.eyeColor || "unknown"} eyes.</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Mood: {mood || "No mood added yet."}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Notes: {notes || "No notes added yet."}</p>
                <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-6 py-4 text-sm font-black uppercase tracking-[0.25em] text-white shadow-glow transition hover:-translate-y-1" type="button">
                  Generate mock covers
                </button>
              </div>
            </div>

            <div id="gallery" className="glass-card rounded-[2rem] p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="section-title">Results gallery</h3>
                  <p className="mt-2 text-sm text-slate-400">Four mock generated images with download actions.</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-300">Mock data</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {generatedCovers.map((cover) => (
                  <article key={cover.id} className="overflow-hidden rounded-3xl border border-white/10 bg-black/25">
                    <div className={`relative aspect-square bg-gradient-to-br ${cover.gradient} p-5`}>
                      <div className="absolute inset-0 bg-radial-grid bg-[length:18px_18px] opacity-25" />
                      <div className="relative flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/15 p-5 backdrop-blur-[2px]">
                        <div className="flex justify-between text-[10px] uppercase tracking-[0.24em] text-white/75">
                          <span>AI Draft</span>
                          <span>0{cover.id}</span>
                        </div>
                        <div className={`mx-auto size-24 rounded-full ${cover.accent} opacity-90 blur-[1px] shadow-[0_0_80px_rgba(255,255,255,0.35)]`} />
                        <div>
                          <h4 className="font-display text-3xl font-black tracking-[-0.06em] text-white">{cover.title}</h4>
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/75">{cover.prompt}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{cover.title}</p>
                        <p className="text-xs text-slate-500">{selectedRatio}</p>
                      </div>
                      <button type="button" className="rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-purple-100">
                        Download
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
