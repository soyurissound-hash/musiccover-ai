export type GeneratedCover = {
  id: number;
  title: string;
  prompt: string;
  gradient: string;
  accent: string;
};

export const generatedCovers: GeneratedCover[] = [
  {
    id: 1,
    title: "Neon Reverie",
    prompt: "A cinematic purple city glow wrapped around the lead character.",
    gradient: "from-fuchsia-500 via-violet-600 to-indigo-950",
    accent: "bg-fuchsia-300",
  },
  {
    id: 2,
    title: "Moonlit Chorus",
    prompt: "Dreamlike album art with a silver moon and painted clouds.",
    gradient: "from-sky-400 via-purple-600 to-slate-950",
    accent: "bg-sky-200",
  },
  {
    id: 3,
    title: "Velvet Signal",
    prompt: "Editorial cover with glossy shadows and a bold pop silhouette.",
    gradient: "from-rose-500 via-purple-700 to-black",
    accent: "bg-rose-200",
  },
  {
    id: 4,
    title: "Afterhours Bloom",
    prompt: "Watercolor textures meeting futuristic stage lighting.",
    gradient: "from-emerald-300 via-violet-600 to-zinc-950",
    accent: "bg-emerald-200",
  },
];
