const stats = [
  { value: "4", label: "Mock concepts per generation" },
  { value: "5", label: "Curated visual styles" },
  { value: "4", label: "Release-ready aspect ratios" },
];

const features = [
  "Upload artist or character references",
  "Shape the cover with mood and creative notes",
  "Preview album, social, and video formats",
];

export function LandingPage() {
  return (
    <section className="relative overflow-hidden px-6 py-8 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-radial-grid bg-[length:28px_28px] opacity-30" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-3" aria-label="MusicCover AI home">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-glow">
            <span className="text-lg font-black">M</span>
          </span>
          <span className="font-display text-lg font-bold tracking-tight">MusicCover AI</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#features">Features</a>
          <a className="transition hover:text-white" href="#dashboard">Dashboard</a>
          <a className="transition hover:text-white" href="#gallery">Gallery</a>
        </div>
        <a
          href="#dashboard"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-purple-100"
        >
          Start creating
        </a>
      </nav>

      <div id="top" className="mx-auto grid max-w-7xl items-center gap-14 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-100">
            <span className="size-2 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(244,114,182,0.9)]" />
            Mock AI artwork studio for music creators
          </div>
          <h1 className="font-display text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Turn your next single into a visual universe.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            MusicCover AI helps artists, producers, and labels explore premium album artwork directions with character references, mood prompts, curated styles, and release-ready ratios.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#dashboard"
              className="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white shadow-glow transition hover:-translate-y-1"
            >
              Open dashboard
            </a>
            <a
              href="#features"
              className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              Explore features
            </a>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-3xl p-5">
                <p className="font-display text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-3xl" />
          <div className="glass-card relative rounded-[2.5rem] p-4">
            <div className="aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-fuchsia-500 via-violet-700 to-slate-950 p-6">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/20 bg-black/20 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-purple-100">
                  <span>Cover draft</span>
                  <span>01</span>
                </div>
                <div className="mx-auto grid size-44 place-items-center rounded-full bg-white/10 shadow-[0_0_90px_rgba(255,255,255,0.25)] ring-1 ring-white/20">
                  <div className="size-28 rounded-full bg-gradient-to-br from-white via-purple-100 to-fuchsia-300 opacity-90" />
                </div>
                <div>
                  <p className="font-display text-5xl font-black tracking-[-0.08em]">NOCTURNE</p>
                  <p className="mt-2 text-sm text-purple-100">Synthwave / cinematic / violet aura</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-slate-300">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
