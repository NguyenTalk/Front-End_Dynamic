'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { img } from '@/api/tmdb';
import { useMovieVideos } from '@/hooks/useMovies';
import Button from '@/components/ui/Button';
import SkeletonBanner from '@/components/ui/SkeletonBanner';
import { PlayIcon, InformationIcon } from '@/icons';
import { truncate } from '@/utils/truncate';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  media_type?: string;
}

interface BannerProps {
  movie: Movie | null;
  onMoreInfo: (movie: Movie) => void;
}

export default function Banner({ movie, onMoreInfo }: BannerProps) {
  const { data: videos } = useMovieVideos(movie?.id || null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // 🔊 Mặc định là TRUE để trình duyệt cho phép Autoplay

  const backdropUrl = img.backdrop(movie?.backdrop_path as string | null);

  useEffect(() => {
    if (!videos || videos.length === 0) {
      setTrailerKey(null);
      setIsPlaying(false);
      return;
    }

    const trailer = videos.find(
      (v: any) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
    );

    if (trailer) {
      setTrailerKey(trailer.key);
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setTrailerKey(null);
      setIsPlaying(false);
    }
  }, [videos, movie]);

  if (!movie) return <SkeletonBanner />;

  const movieTitle = movie.title || movie.name || 'Movie';

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      {/* 🎬 Render Trailer */}
      {trailerKey && isPlaying ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <iframe
            // 🚀 Thay đổi ở đây: Truyền biến trạng thái isMuted (1 là tắt tiếng, 0 là bật tiếng) vào URL
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&rel=0&loop=1&playlist=${trailerKey}&showinfo=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
            title="Trailer"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : (
        /* 🖼️ Render Ảnh nền tĩnh */
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backdropUrl})` } as CSSProperties}
        />
      )}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-netflix-black to-transparent" />

      {/* Content */}
      <div className="absolute bottom-28 left-4 md:left-12 z-10 max-w-xl space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-netflix-red font-bold text-lg">N</span>
          <span className="uppercase tracking-widest text-xs text-gray-300 font-semibold">
            {movie.media_type === 'tv' ? 'S E R I E S' : 'M O V I E'}
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          {movieTitle}
        </motion.h1>

        <p className="text-gray-300 text-sm md:text-base line-clamp-3">
          {truncate(movie.overview || '', 150)}
        </p>

        <div className="flex gap-3">
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, -2, 2, -2, 0],
            }}
            transition={{
              rotate: {
                duration: 0.4,
                ease: 'easeInOut',
              },
              scale: {
                duration: 0.2,
              },
            }}
          >
            <Button 
              variant="play" 
              size="md" 
              className="flex items-center gap-2"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <PlayIcon /> {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, -2, 2, -2, 0],
            }}
            transition={{
              rotate: {
                duration: 0.4,
                ease: 'easeInOut',
              },
              scale: {
                duration: 0.2,
              },
            }}
          >
            <Button
              variant="secondary"
              size="md"
              onClick={() => onMoreInfo(movie)}
              className="flex items-center gap-2"
            >
              <InformationIcon /> More Info
            </Button>
          </motion.div>
        </div>
      </div>

      {/* 🔊 NÚT BẬT / TẮT TIẾNG ĐẶT Ở GÓC PHẢI (GIỐNG NETFLIX REAL) */}
      {trailerKey && isPlaying && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-32 right-4 md:right-12 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-white/40 bg-black/40 text-white hover:bg-black/70 hover:scale-105 transition"
        >
          {isMuted ? (
            /* Icon Loa có gạch chéo (Đang tắt tiếng) */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
            </svg>
          ) : (
            /* Icon Loa phát sóng (Đang bật tiếng) */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}