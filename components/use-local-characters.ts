"use client";

import { useCallback, useEffect, useState } from "react";
import { CHARACTER_STORAGE_KEY, DEFAULT_CHARACTER } from "@/lib/characters";
import type { Character } from "@/lib/characters";

function readStoredCharacters(): Character[] {
  if (typeof window === "undefined") {
    return [DEFAULT_CHARACTER];
  }

  const storedCharacters = window.localStorage.getItem(CHARACTER_STORAGE_KEY);

  if (!storedCharacters) {
    return [DEFAULT_CHARACTER];
  }

  try {
    const parsedCharacters = JSON.parse(storedCharacters) as Character[];

    if (!Array.isArray(parsedCharacters)) {
      return [DEFAULT_CHARACTER];
    }

    return parsedCharacters;
  } catch {
    return [DEFAULT_CHARACTER];
  }
}

export function useLocalCharacters() {
  const [characters, setCharacters] = useState<Character[]>([DEFAULT_CHARACTER]);

  useEffect(() => {
    const storedCharacters = window.localStorage.getItem(CHARACTER_STORAGE_KEY);
    const nextCharacters = readStoredCharacters();

    if (!storedCharacters) {
      window.localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(nextCharacters));
    }

    setCharacters(nextCharacters);
  }, []);

  const saveCharacters = useCallback((nextCharacters: Character[] | ((current: Character[]) => Character[])) => {
    setCharacters((currentCharacters) => {
      const resolvedCharacters = typeof nextCharacters === "function" ? nextCharacters(currentCharacters) : nextCharacters;
      window.localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(resolvedCharacters));
      window.dispatchEvent(new CustomEvent("musiccover-ai:characters-updated", { detail: resolvedCharacters }));

      return resolvedCharacters;
    });
  }, []);

  useEffect(() => {
    function syncCharacters() {
      setCharacters(readStoredCharacters());
    }

    window.addEventListener("storage", syncCharacters);
    window.addEventListener("musiccover-ai:characters-updated", syncCharacters);

    return () => {
      window.removeEventListener("storage", syncCharacters);
      window.removeEventListener("musiccover-ai:characters-updated", syncCharacters);
    };
  }, []);

  return { characters, saveCharacters };
}
