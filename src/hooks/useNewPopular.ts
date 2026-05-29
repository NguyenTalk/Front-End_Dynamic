import { useQuery } from "@tanstack/react-query";
import tmdb from "@/api/tmdb";

interface Movie {
  id: number;
  title: string;
  [key: string]: any;
}

interface MovieRow {
  title: string;
  data?: Movie[];
  isLoading: boolean;
  isLargeRow?: boolean;
  type?: string;
}

export function useNewPopularRows() {
  const trending = useQuery({
    queryKey: ["new", "trending"],
    queryFn: () =>
      tmdb.get("/trending/all/week").then(res => res.data.results),
  });

  const nowPlaying = useQuery({
    queryKey: ["new", "now-playing"],
    queryFn: () =>
      tmdb.get("/movie/now_playing").then(res => res.data.results),
  });

  const upcoming = useQuery({
    queryKey: ["new", "upcoming"],
    queryFn: () =>
      tmdb.get("/movie/upcoming").then(res => res.data.results),
  });

  const top10 = useQuery({
    queryKey: ["new", "top10"],
    queryFn: () =>
      tmdb.get("/trending/movie/week").then(res => res.data.results.slice(0, 10)),
  });

  return {
    rows: [
      { title: "Trending Now", data: trending.data, isLoading: trending.isLoading },
      { title: "Now Playing", data: nowPlaying.data, isLoading: nowPlaying.isLoading, isLargeRow: true },
      { title: "Coming Soon", data: upcoming.data, isLoading: upcoming.isLoading, type: "coming" },
      { title: "Top 10 Movies Today", data: top10.data, isLoading: top10.isLoading, type: "top10" },
    ] as MovieRow[],
  };
}
