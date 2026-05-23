'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import tmdb from '@/api/tmdb';
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

interface TVShowRow {
  title: string;
  data?: Movie[];
  isLoading: boolean;
  isLargeRow?: boolean;
}

export default function TVShowsPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const trending = useQuery({
    queryKey: ['tv', 'trending'],
    queryFn: () =>
      tmdb.get('/trending/tv/week').then((res) => res.data.results),
  });

  const popular = useQuery({
    queryKey: ['tv', 'popular'],
    queryFn: () => tmdb.get('/tv/popular').then((res) => res.data.results),
  });

  const topRated = useQuery({
    queryKey: ['tv', 'top-rated'],
    queryFn: () => tmdb.get('/tv/top_rated').then((res) => res.data.results),
  });

  const airingToday = useQuery({
    queryKey: ['tv', 'airing-today'],
    queryFn: () => tmdb.get('/tv/airing_today').then((res) => res.data.results),
  });

  const rows: TVShowRow[] = [
    {
      title: 'Trending Now',
      data: trending.data,
      isLoading: trending.isLoading,
    },
    {
      title: 'Popular',
      data: popular.data,
      isLoading: popular.isLoading,
      isLargeRow: true,
    },
    {
      title: 'Top Rated',
      data: topRated.data,
      isLoading: topRated.isLoading,
    },
    {
      title: 'Airing Today',
      data: airingToday.data,
      isLoading: airingToday.isLoading,
    },
  ];

  const featuredMovie = useMemo(() => {
    if (!trending.data?.length) return null;
    return trending.data[Math.floor(Math.random() * trending.data.length)];
  }, [trending.data]);

  return (
    <div className="relative bg-black text-white">
      <BannerAmbient movie={featuredMovie} />

      <div className="relative z-10">
        {trending.isLoading ? (
          <SkeletonBanner />
        ) : (
          <Banner
            movie={featuredMovie as Movie}
            onMoreInfo={(movie) => setSelectedMovie(movie as Movie)}
          />
        )}

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
