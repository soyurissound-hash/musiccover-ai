export type CharacterReferenceImage = {
  id: string;
  name: string;
  dataUrl: string;
};

export type Character = {
  id: string;
  name: string;
  description: string;
  hairColor: string;
  eyeColor: string;
  notes: string;
  referenceImages: CharacterReferenceImage[];
  updatedAt: string;
};

export const CHARACTER_STORAGE_KEY = "musiccover-ai.characters";

export const DEFAULT_CHARACTER: Character = {
  id: "haru-default",
  name: "Haru",
  description: "A charismatic virtual artist with a moonlit pop aura and confident cover-star presence.",
  hairColor: "Violet black",
  eyeColor: "Amethyst",
  notes: "Keep Haru expressive, cinematic, and polished with luminous purple highlights and editorial album-cover styling.",
  referenceImages: [],
  updatedAt: "2026-01-01T00:00:00.000Z",
};

export const createEmptyCharacter = (): Character => ({
  id: createCharacterId(),
  name: "",
  description: "",
  hairColor: "",
  eyeColor: "",
  notes: "",
  referenceImages: [],
  updatedAt: new Date().toISOString(),
});

export function createCharacterId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `character-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
