"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CharacterCard } from "@/components/character-card";
import { useLocalCharacters } from "@/components/use-local-characters";
import { createCharacterId, createEmptyCharacter, DEFAULT_CHARACTER } from "@/lib/characters";
import type { Character, CharacterReferenceImage } from "@/lib/characters";

type CharacterFormState = Character;

const fileToReferenceImage = (file: File) =>
  new Promise<CharacterReferenceImage>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        id: createCharacterId(),
        name: file.name,
        dataUrl: String(reader.result),
      });
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export function CharacterLibrary() {
  const { characters, saveCharacters } = useLocalCharacters();
  const [selectedCharacterId, setSelectedCharacterId] = useState(DEFAULT_CHARACTER.id);
  const [formCharacter, setFormCharacter] = useState<CharacterFormState>(() => createEmptyCharacter());
  const [isEditing, setIsEditing] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const sortedCharacters = useMemo(
    () => [...characters].sort((first, second) => first.name.localeCompare(second.name)),
    [characters],
  );

  function updateFormField(field: keyof Pick<Character, "name" | "description" | "hairColor" | "eyeColor" | "notes">, value: string) {
    setFormCharacter((currentCharacter) => ({ ...currentCharacter, [field]: value }));
  }

  async function handleReferenceUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    setUploadError("");

    try {
      const uploadedImages = await Promise.all(files.map(fileToReferenceImage));
      setFormCharacter((currentCharacter) => ({
        ...currentCharacter,
        referenceImages: [...currentCharacter.referenceImages, ...uploadedImages],
      }));
    } catch {
      setUploadError("One or more images could not be loaded. Please try a different file.");
    }

    event.target.value = "";
  }

  function removeReferenceImage(imageId: string) {
    setFormCharacter((currentCharacter) => ({
      ...currentCharacter,
      referenceImages: currentCharacter.referenceImages.filter((image) => image.id !== imageId),
    }));
  }

  function resetForm() {
    setFormCharacter(createEmptyCharacter());
    setIsEditing(false);
    setUploadError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const savedCharacter: Character = {
      ...formCharacter,
      name: formCharacter.name.trim() || "Untitled character",
      description: formCharacter.description.trim(),
      hairColor: formCharacter.hairColor.trim(),
      eyeColor: formCharacter.eyeColor.trim(),
      notes: formCharacter.notes.trim(),
      updatedAt: new Date().toISOString(),
    };

    saveCharacters((currentCharacters) => {
      if (isEditing) {
        return currentCharacters.map((character) => (character.id === savedCharacter.id ? savedCharacter : character));
      }

      return [savedCharacter, ...currentCharacters];
    });

    setSelectedCharacterId(savedCharacter.id);
    resetForm();
  }

  function handleEdit(character: Character) {
    setFormCharacter(character);
    setIsEditing(true);
    setSelectedCharacterId(character.id);
    setUploadError("");
    document.getElementById("character-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDelete(characterToDelete: Character) {
    saveCharacters((currentCharacters) => currentCharacters.filter((character) => character.id !== characterToDelete.id));

    if (selectedCharacterId === characterToDelete.id) {
      setSelectedCharacterId(DEFAULT_CHARACTER.id);
    }

    if (formCharacter.id === characterToDelete.id) {
      resetForm();
    }
  }

  return (
    <section id="characters" className="px-6 pb-20 pt-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-col justify-between gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl sm:flex-row sm:items-center">
          <a href="/" className="flex items-center gap-3" aria-label="MusicCover AI home">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-glow">
              <span className="text-lg font-black">M</span>
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">MusicCover AI</span>
          </a>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <a className="transition hover:text-white" href="/#dashboard">Dashboard</a>
            <a className="transition hover:text-white" href="/#gallery">Gallery</a>
          </div>
        </nav>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-300">Character library</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
              Manage your cover cast
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            Create reusable character profiles with traits, notes, and image references. Profiles are saved locally in your browser until a backend is connected.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <form id="character-form" onSubmit={handleSubmit} className="glass-card rounded-[2rem] p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="section-title">{isEditing ? "Edit character" : "Create character"}</h2>
                <p className="mt-2 text-sm text-slate-400">Build a consistent visual identity for future covers.</p>
              </div>
              <button type="button" onClick={resetForm} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-300 transition hover:bg-white/10">
                New profile
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Name
                <input className="form-field mt-2" value={formCharacter.name} onChange={(event) => updateFormField("name", event.target.value)} placeholder="e.g. Haru" />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Description
                <textarea className="form-field mt-2 min-h-28 resize-none" value={formCharacter.description} onChange={(event) => updateFormField("description", event.target.value)} placeholder="Describe personality, role, pose language, or genre." />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-300">
                  Hair color
                  <input className="form-field mt-2" value={formCharacter.hairColor} onChange={(event) => updateFormField("hairColor", event.target.value)} placeholder="e.g. Violet black" />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Eye color
                  <input className="form-field mt-2" value={formCharacter.eyeColor} onChange={(event) => updateFormField("eyeColor", event.target.value)} placeholder="e.g. Amethyst" />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-300">
                Character notes
                <textarea className="form-field mt-2 min-h-32 resize-none" value={formCharacter.notes} onChange={(event) => updateFormField("notes", event.target.value)} placeholder="Add styling rules, must-have details, and consistency notes." />
              </label>
            </div>

            <div className="mt-6">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-purple-300/30 bg-purple-400/5 px-6 py-8 text-center transition hover:border-purple-200/70 hover:bg-purple-400/10">
                <input className="sr-only" type="file" accept="image/*" multiple onChange={handleReferenceUpload} />
                <span className="grid size-14 place-items-center rounded-2xl bg-white text-2xl text-slate-950">+</span>
                <span className="mt-4 font-semibold text-white">Upload reference images</span>
                <span className="mt-1 text-sm text-slate-400">Add multiple PNG, JPG, WEBP, or GIF files.</span>
              </label>
              {uploadError ? <p className="mt-3 text-sm text-pink-200">{uploadError}</p> : null}

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {formCharacter.referenceImages.length > 0 ? (
                  formCharacter.referenceImages.map((image) => (
                    <div key={image.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <Image src={image.dataUrl} alt={image.name} width={220} height={220} className="aspect-square w-full object-cover" unoptimized />
                      <button type="button" onClick={() => removeReferenceImage(image.id)} className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
                        Remove
                      </button>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-white">
                        {image.name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center text-sm text-slate-500">
                    No reference images yet.
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-6 py-4 text-sm font-black uppercase tracking-[0.25em] text-white shadow-glow transition hover:-translate-y-1">
              {isEditing ? "Save character" : "Create character"}
            </button>
          </form>

          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="section-title">Saved characters</h2>
                  <p className="mt-2 text-sm text-slate-400">{characters.length} local profile{characters.length === 1 ? "" : "s"} available for dashboard prompts.</p>
                </div>
                <select value={sortedCharacters.length > 0 ? selectedCharacterId : "empty"} onChange={(event) => setSelectedCharacterId(event.target.value)} className="form-field max-w-full md:max-w-xs">
                  {sortedCharacters.length > 0 ? (
                    sortedCharacters.map((character) => (
                      <option key={character.id} value={character.id} className="bg-slate-950">
                        {character.name}
                      </option>
                    ))
                  ) : (
                    <option value="empty" className="bg-slate-950">
                      No saved characters
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {sortedCharacters.length > 0 ? (
                sortedCharacters.map((character) => (
                  <CharacterCard key={character.id} character={character} isSelected={character.id === selectedCharacterId} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              ) : (
                <div className="glass-card rounded-[2rem] p-8 text-center text-sm text-slate-400 lg:col-span-2">
                  Your library is empty. Create a character to make it available in the dashboard.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
