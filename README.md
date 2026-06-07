# MusicCover AI

MusicCover AI is a modern mock web application for music creators who need album artwork concepts. It includes a polished landing page and an interactive dashboard for gathering song context, selecting a visual style, choosing an aspect ratio, uploading character references, and browsing mock generated cover results.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- App Router
- Dark mode-first UI
- Responsive layout

## Features

- Character reference image uploads with local previews
- Song title, mood, and creative notes inputs
- Style choices: Anime, Illustration, Watercolor, Cinematic, and K-Pop
- Aspect ratios for album covers, YouTube thumbnails, Shorts covers, and Instagram posts
- Generate button for mock cover creation flow
- Four mock generated artwork cards with download buttons

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev       # Start local development server
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run Next.js linting
npm run typecheck # Run TypeScript checks
```

## Notes

No AI image generation API is connected yet. All artwork results are mock UI data so the project can be safely extended later with a real generation provider.
