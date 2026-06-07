import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MusicCover AI | Album artwork for music creators",
  description:
    "A modern mockup web application for generating beautiful album covers, thumbnails, and social artwork for music creators.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-ink font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
