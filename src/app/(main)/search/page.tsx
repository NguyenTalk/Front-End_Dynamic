'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/useMovies';
import { useDebounce } from '@/hooks/useDebounce';
import { img } from '@/api/tmdb';
import MovieModal from '@/components/movie/MovieModal';
import { motion } from 'framer-motion';

interface Movie {
  id: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  title?: string;
  name?: string;
  media_type?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 400);
  const { data: results = [], isLoading } = useSearch(debouncedQuery);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filteredResults = (results as Movie[])?.filter(
    (item) => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv')
  ) || [];

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen">
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies, TV shows, people..."
          autoFocus
          className="w-full px-6 py-4 bg-netflix-gray/70 border border-gray-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red transition-colors"
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-netflix-gray rounded-md animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && filteredResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredResults.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => setSelectedMovie(item)}
            >
              <img
                src={img.poster(item.poster_path ?? null) || ''}
                alt={item.title || item.name}
                className="w-full h-auto rounded-md object-cover aspect-[2/3]"
              />
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && filteredResults.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No results found for "{query}"</p>
        </div>
      )}

      {!query && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Start typing to search</p>
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
