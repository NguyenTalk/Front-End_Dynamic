import { useEffect, useState } from "react";

const API_KEY = "966741e6a93b974626716efc718d939e";
const BASE_URL = "https://api.themoviedb.org/3";

interface TVShow {
  id: number;
  name: string;
  [key: string]: any;
}

interface TVRow {
  title: string;
  data: TVShow[];
  isLoading: boolean;
  isLargeRow?: boolean;
}

// 🔥 Trending TV
export const useTVTrending = () => {
  const [data, setData] = useState<TVShow[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => {
        setData(res.results || []);
        setLoading(false);
      });
  }, []);

  return { data, isLoading };
};


// 🔥 Rows TV
export const useTVRows = () => {
  const [rows, setRows] = useState<TVRow[]>([]);

  useEffect(() => {
    const fetchRows = async () => {
      const endpoints = [
        {
          title: "Popular TV Shows",
          url: `/tv/popular`
        },
        {
          title: "Top Rated TV",
          url: `/tv/top_rated`
        },
        {
          title: "Airing Today",
          url: `/tv/airing_today`
        },
        {
          title: "On The Air",
          url: `/tv/on_the_air`
        }
      ];

      const results = await Promise.all(
        endpoints.map(async (row) => {
          const res = await fetch(
            `${BASE_URL}${row.url}?api_key=${API_KEY}`
          );
          const data = await res.json();

          return {
            title: row.title,
            data: data.results || [],
            isLoading: false,
            isLargeRow: row.title === "Popular TV Shows"
          };
        })
      );

      setRows(results);
    };

    fetchRows();
  }, []);

  return { rows };
};
