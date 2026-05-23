import axios from 'axios';
import { API_KEY, IMAGE_BASE } from './config';

// 🚀 Khởi tạo instance Axios chuẩn chỉnh
export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// 🖼️ Helper xử lý đường dẫn ảnh từ TMDB
export const img = {
  backdrop: (path: string | null, size = 'original') => path ? `${IMAGE_BASE}/${size}${path}` : null,
  poster: (path: string | null, size = 'w500') => path ? `${IMAGE_BASE}/${size}${path}` : null,
  logo: (path: string | null) => path ? `${IMAGE_BASE}/original${path}` : null,
  profile: (path: string | null, size = 'w185') => path ? `${IMAGE_BASE}/${size}${path}` : null,
};

/* ==========================================================================
   📌 CÁC HÀM FETCH DỮ LIỆU PHIM (Đã bổ sung kiểu dữ liệu r.data)
   ========================================================================== */

export const fetchTrending = () =>
  tmdb.get('/trending/movie/week').then((r) => r.data.results);

export const fetchNetflixOriginals = () =>
  tmdb.get('/discover/tv', { params: { with_networks: 213 } }).then((r) => r.data.results);

export const fetchTopRated = () =>
  tmdb.get('/movie/top_rated').then((r) => r.data.results);

export const fetchByGenre = (genreId: number) =>
  tmdb.get('/discover/movie', { 
    params: { with_genres: genreId, sort_by: 'popularity.desc' } 
  }).then((r) => r.data.results);

export const fetchMovieDetails = (movieId: number) =>
  tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos,credits,similar,images', include_image_language: 'en,null' },
  }).then((r) => r.data);

export const fetchTVDetails = (id: number) =>
  tmdb.get(`/tv/${id}`, {
    params: {
      append_to_response: 'videos,credits,similar,images',
      include_image_language: 'en,null',
    },
  }).then((r) => r.data);

export const searchMulti = (query: string) =>
  tmdb.get('/search/multi', { params: { query } }).then((r) => r.data.results);

export const fetchMovieImages = (movieId: number) =>
  tmdb.get(`/movie/${movieId}/images`, { params: { include_image_language: 'en,null' } }).then((r) => r.data);

export const fetchMovieVideos = (movieId: number) =>
  tmdb.get(`/movie/${movieId}/videos`).then((r) => r.data.results);

// 🎬 Danh sách ID thể loại phim từ TMDB
export const GENRES = {
  ACTION: 28,
  COMEDY: 35,
  HORROR: 27,
  ROMANCE: 10749,
  DOCUMENTARY: 99,
  THRILLER: 53,
  ANIMATION: 16,
  SCIFI: 878,
} as const; // Thêm "as const" để TypeScript hiểu đây là object hằng số, không được thay đổi

export default tmdb;