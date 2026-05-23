'use client';

import { CSSProperties } from 'react';

interface Movie {
  backdrop_path?: string | null;
}

export default function BannerAmbient({ movie }: { movie?: Movie | null }) {
  return (
    <div
      className="absolute inset-0 opacity-20 blur-3xl"
      style={{
        backgroundImage: `radial-gradient(ellipse at center, rgba(229, 9, 20, 0.4) 0%, rgba(0, 0, 0, 1) 70%)`,
      } as CSSProperties}
    />
  );
}
