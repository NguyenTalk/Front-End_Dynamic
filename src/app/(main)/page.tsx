'use client';

import { useState, useMemo } from 'react';
import { useHomeRows, useTrending } from '@/hooks/useMovies';
import Banner from '@/components/movie/Banner';
import BannerAmbient from '@/components/movie/BannerAmbient';
import MovieRow from '@/components/movie/MovieRow';
import MovieModal from '@/components/movie/MovieModal';
import SkeletonBanner from '@/components/ui/SkeletonBanner';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  media_type?: string;
}

export default function Home() {
  const { data: trending, isLoading: trendingLoading } = useTrending();
  const { rows } = useHomeRows();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const featuredMovie = useMemo(() => {
    if (!trending?.length) return null;
    return trending[Math.floor(Math.random() * trending.length)];
  }, [trending]);

  return (
    <div className="relative bg-black text-white">
      <BannerAmbient movie={featuredMovie} />

      <div className="relative z-10">
        {trendingLoading ? (
          <SkeletonBanner />
        ) : (
          <Banner
            movie={featuredMovie}
            onMoreInfo={(movie) => setSelectedMovie(movie as Movie)}
          />
        )}

        {/* Movie rows */}
        <div className="mt-[-100px] space-y-8 px-4 md:px-12">
          {rows.map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              movies={row.data as Movie[]}
              isLoading={row.isLoading}
              isLargeRow={row.isLargeRow}
              onMovieClick={(movie) => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
