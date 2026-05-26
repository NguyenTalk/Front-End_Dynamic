'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { img } from '@/api/tmdb';
import { useMovieVideos } from '@/hooks/useMovies';

interface Movie {
  id: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  title?: string;
  name?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
}

interface MovieCardProps {
  movie: Movie;
  isLargeRow?: boolean;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({
  movie,
  isLargeRow = false,
  onClick,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: videos } = useMovieVideos(movie?.id);

  const trailerKey = videos?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  )?.key;

  const posterUrl = isLargeRow
    ? img.poster(movie.poster_path ?? null)
    : img.backdrop(movie.backdrop_path ?? null, 'w780') || img.poster(movie.poster_path ?? null);

  if (!posterUrl) return null;

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
      whileHover={{ scale: 1.15, y: -15, zIndex: 30 }}
      transition={{ duration: 0.3 }}
    >
      {/* IMAGE */}
      {!isHovered && (
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          className={`rounded-md object-cover ${
            isLargeRow ? 'h-[250px] w-[170px]' : 'h-[160px] w-[280px]'
          }`}
        />
      )}

      {/* TRAILER PREVIEW */}
      {isHovered && trailerKey && (
        <iframe
          className={`rounded-md ${
            isLargeRow ? 'h-[250px] w-[170px]' : 'h-[160px] w-[280px]'
          }`}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0`}
          allow="autoplay"
          title="trailer"
        />
      )}

      {/* FALLBACK nếu không có trailer */}
      {isHovered && !trailerKey && (
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          className={`rounded-md ${
            isLargeRow ? 'h-[250px] w-[170px]' : 'h-[160px] w-[280px]'
          }`}
        />
      )}

      {/* OVERLAY */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-md"
        >
          <p className="text-white text-sm font-semibold truncate">
            {movie.title || movie.name}
          </p>

          <div className="flex items-center gap-2 mt-1 text-xs">
            {(movie.vote_average || 0) > 0 && (
              <span className="text-green-400 font-semibold">
                {Math.round(movie.vote_average! * 10)}% Match
              </span>
            )}

            <span className="text-gray-300">
              {movie.release_date?.split('-')[0] ||
                movie.first_air_date?.split('-')[0]}
            </span>

            <span className="text-gray-400">
              {movie.media_type === 'tv' ? 'TV' : 'Movie'}
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 mt-2">
            <button className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
              ▶
            </button>

            <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center text-white text-sm font-bold">
              +
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(movie);
              }}
              className="w-8 h-8 border border-white rounded-full flex items-center justify-center text-white text-sm font-bold"
            >
              ⓘ
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
