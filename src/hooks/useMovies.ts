import { useQuery } from '@tanstack/react-query';
import {
  fetchTrending,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchByGenre,
  fetchMovieDetails,
  fetchTVDetails,
  fetchMovieImages,
  fetchMovieVideos,
  searchMulti,
  GENRES,
} from '@/api/tmdb';
import tmdb from '@/api/tmdb';

/* ================= HOME ================= */

export function useTrending() {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 10,
  });
}

export function useNetflixOriginals() {
  return useQuery({
    queryKey: ['movies', 'netflix-originals'],
    queryFn: fetchNetflixOriginals,
    staleTime: 1000 * 60 * 10,
  });
}

export function useTopRated() {
  return useQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: fetchTopRated,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGenreMovies(genreId: number) {
  return useQuery({
    queryKey: ['movies', 'genre', genreId],
    queryFn: () => fetchByGenre(genreId),
    staleTime: 1000 * 60 * 10,
    enabled: !!genreId,
  });
}

/* ================= DETAILS ================= */

export function useMovieDetails(movieId: number | null) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId!),
    enabled: !!movieId,
  });
}

export function useTVDetails(tvId: number | null) {
  return useQuery({
    queryKey: ['tv', tvId],
    queryFn: () => fetchTVDetails(tvId!),
    enabled: !!tvId,
  });
}

/* ================= EXTRA ================= */

export function useMovieImages(movieId: number | null) {
  return useQuery({
    queryKey: ['movie', movieId, 'images'],
    queryFn: () => fetchMovieImages(movieId!),
    enabled: !!movieId,
  });
}

export function useMovieVideos(movieId: number | null) {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => fetchMovieVideos(movieId!),
    enabled: !!movieId,
  });
}

/* ================= SEARCH ================= */

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMulti(query),
    enabled: !!query && query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}

/* ================= HOME ROWS ================= */

interface Row {
  title: string;
  data?: unknown[];
  isLoading: boolean;
  isLargeRow?: boolean;
}

export function useHomeRows() {
  const trending = useTrending();
  const originals = useNetflixOriginals();
  const topRated = useTopRated();
  const action = useGenreMovies(GENRES.ACTION);
  const comedy = useGenreMovies(GENRES.COMEDY);
  const horror = useGenreMovies(GENRES.HORROR);
  const romance = useGenreMovies(GENRES.ROMANCE);
  const documentary = useGenreMovies(GENRES.DOCUMENTARY);

  const rows: Row[] = [
    { title: 'Trending Now', data: trending.data, isLoading: trending.isLoading },
    {
      title: 'Netflix Originals',
      data: originals.data,
      isLoading: originals.isLoading,
      isLargeRow: true,
    },
    { title: 'Top Rated', data: topRated.data, isLoading: topRated.isLoading },
    { title: 'Action Movies', data: action.data, isLoading: action.isLoading },
    { title: 'Comedy Movies', data: comedy.data, isLoading: comedy.isLoading },
    { title: 'Horror Movies', data: horror.data, isLoading: horror.isLoading },
    { title: 'Romance Movies', data: romance.data, isLoading: romance.isLoading },
    { title: 'Documentaries', data: documentary.data, isLoading: documentary.isLoading },
  ];

  return {
    rows,
    isAnyLoading: trending.isLoading,
  };
}

/* ================= MOVIE PAGE ================= */

export function useMovieRows() {
  const trending = useQuery({
    queryKey: ['movies', 'trending-movie'],
    queryFn: fetchTrending,
  });

  const popular = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => tmdb.get('/movie/popular').then((res) => res.data.results),
  });

  const topRated = useQuery({
    queryKey: ['movies', 'top-rated-movie'],
    queryFn: fetchTopRated,
  });

  const rows: Row[] = [
    { title: 'Trending Movies', data: trending.data, isLoading: trending.isLoading },
    {
      title: 'Popular Movies',
      data: popular.data,
      isLoading: popular.isLoading,
      isLargeRow: true,
    },
    {
      title: 'Top Rated Movies',
      data: topRated.data,
      isLoading: topRated.isLoading,
    },
  ];

  return { rows };
}
