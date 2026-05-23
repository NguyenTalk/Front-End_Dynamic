'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { img } from '@/api/tmdb';
import { useMovieDetails, useTVDetails } from '@/hooks/useMovies';
import { truncate } from '@/utils/truncate';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  media_type?: string;
  release_date?: string;
  vote_average?: number;
}

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const isTV = movie.media_type === 'tv' || (!movie.title && !!movie.name);
  const { data: detailData, isLoading } = isTV
    ? useTVDetails(movie.id)
    : useMovieDetails(movie.id);

  const title = movie.title || movie.name || 'Movie Details';
  const backdropUrl = img.backdrop(movie.backdrop_path || null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#141414] text-white rounded-lg max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-zinc-700"
        >
          {/* Backdrop Banner */}
          <div className="relative w-full h-64 sm:h-96 bg-zinc-800 overflow-hidden">
            {backdropUrl && (
              <img
                src={backdropUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content Wrapper */}
          <div className="p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold">{title}</h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 flex-wrap text-sm">
              {movie.vote_average && (
                <div className="flex items-center">
                  <div className="px-2 py-0.5 border border-green-500 text-green-500 font-bold rounded text-xs">
                    {Math.round(movie.vote_average * 10)}% Match
                  </div>
                </div>
              )}
              {movie.release_date && (
                <span className="text-gray-400 font-semibold">
                  {movie.release_date.split('-')[0]}
                </span>
              )}
              {detailData?.runtime && (
                <span className="text-gray-400 font-semibold">
                  {detailData.runtime}m
                </span>
              )}
            </div>

            {/* Overview */}
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {truncate(movie.overview || '', 400)}
            </p>

            {/* Movie Genres */}
            {detailData?.genres && (
              <div className="text-xs sm:text-sm text-zinc-400">
                <span className="text-zinc-500 font-medium">Genres: </span>
                <span className="text-zinc-200">
                  {detailData.genres.map((g: any) => g.name).join(', ')}
                </span>
              </div>
            )}

            {isLoading ? (
              <div className="text-center text-zinc-500 py-6 text-sm animate-pulse">
                Loading cast & suggestions...
              </div>
            ) : (
              <>
                <hr className="border-zinc-800" />

                {/* 👥 1. KHU VỰC HIỂN THỊ DIỄN VIÊN (CAST) */}
                {detailData?.credits?.cast && detailData.credits.cast.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-zinc-400">Cast</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {detailData.credits.cast.slice(0, 5).map((actor: any) => (
                        <div key={actor.id} className="bg-zinc-900/60 p-2 rounded-md border border-zinc-800/50 text-center">
                          <img
                            src={img.profile(actor.profile_path) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'}
                            alt={actor.name}
                            className="w-full h-24 sm:h-28 object-cover rounded mb-2 bg-zinc-800"
                          />
                          <p className="text-xs font-bold truncate text-zinc-100">{actor.name}</p>
                          <p className="text-[10px] text-zinc-500 truncate mt-0.5">{actor.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <hr className="border-zinc-800" />

                {/* 🎬 2. KHU VỰC HIỂN THỊ PHIM TƯƠNG TỰ (MORE LIKE THIS) */}
                {detailData?.similar?.results && detailData.similar.results.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-zinc-400">More Like This</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {detailData.similar.results.slice(0, 6).map((simMovie: any) => {
                        const simImg = img.backdrop(simMovie.backdrop_path) || img.poster(simMovie.poster_path);
                        return (
                          <div key={simMovie.id} className="bg-zinc-900 rounded-md overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition duration-300 group cursor-pointer">
                            <div className="relative aspect-video w-full bg-zinc-800">
                              {simImg && (
                                <img
                                  src={simImg}
                                  alt={simMovie.title || simMovie.name}
                                  className="w-full h-full object-cover group-hover:opacity-80 transition duration-300"
                                />
                              )}
                            </div>
                            <div className="p-3 space-y-1">
                              <p className="text-xs font-bold text-zinc-200 truncate">
                                {simMovie.title || simMovie.name}
                              </p>
                              <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">
                                {simMovie.overview || 'No description available.'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Close Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-md transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}