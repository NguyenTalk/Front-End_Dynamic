import { useRef } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

interface Top10RowProps {
  movies: Movie[];
  onClick: (movie: Movie) => void;
}

const Top10Row = ({ movies, onClick }: Top10RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (rowRef.current) {
      const scrollAmount = 300;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">

      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-0 bottom-0 z-20 w-10 bg-black/60 hover:bg-black/80 hidden group-hover:flex items-center justify-center"
      >
        ◀
      </button>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-0 bottom-0 z-20 w-10 bg-black/60 hover:bg-black/80 hidden group-hover:flex items-center justify-center"
      >
        ▶
      </button>

      {/* Row */}
      <div
        ref={rowRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {movies?.map((movie, index) => (
          <div
            key={movie.id}
            className="relative flex-shrink-0 w-48 cursor-pointer group"
            onClick={() => onClick(movie)}
          >
            {/* Number */}
            <span className="absolute -left-6 bottom-0 text-[100px] font-black text-white/10 group-hover:text-white/20 transition">
              {index + 1}
            </span>

            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-lg relative z-10 hover:scale-110 transition duration-300"
            />

            {/* Title */}
            <p className="mt-2 text-sm text-white line-clamp-2">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Row;
