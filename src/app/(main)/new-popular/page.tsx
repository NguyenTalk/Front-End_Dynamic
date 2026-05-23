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

interface ContentRow {
  title: string;
  data?: Movie[];
  isLoading: boolean;
  isLargeRow?: boolean;
}

export default function NewPopularPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const trending = useQuery({
    queryKey: ['discover', 'trending'],
    queryFn: () =>
      tmdb.get('/trending/all/week').then((res) => res.data.results),
  });

  const upcomingMovies = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () =>
      tmdb.get('/movie/upcoming').then((res) => res.data.results),
  });

  const newTV = useQuery({
    queryKey: ['tv', 'on-air'],
    queryFn: () => tmdb.get('/tv/on_the_air').then((res) => res.data.results),
  });

  const rows: ContentRow[] = [
    {
      title: 'Trending Now',
      data: trending.data,
      isLoading: trending.isLoading,
    },
    {
      title: 'Upcoming Movies',
      data: upcomingMovies.data,
      isLoading: upcomingMovies.isLoading,
      isLargeRow: true,
    },
    {
      title: 'New TV Shows',
      data: newTV.data,
      isLoading: newTV.isLoading,
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
