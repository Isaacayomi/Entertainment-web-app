import { createContext, useEffect, useState } from "react";
import { getAllMovies } from "../services/apiAllMovies";

type Movie = {
  category: string;
  isBookmarked: boolean;
};

type MovieContextType = {
  baseMovies: Movie[];
  allMovies: Movie[];
  movies: Movie[];
  series: Movie[];
  bookmarked: Movie[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setBaseMovies: (movies: Movie[]) => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

function MovieProvider({ children }: ProviderProps) {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [baseMovies, setBaseMovies] = useState<Movie[]>([]);

  const [series, setSeries] = useState<Movie[]>([]);
  const [bookmarked, setBookmarked] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchMovies() {
      const data = await getAllMovies();

      setAllMovies(data);
      setMovies(data.filter((movie: Movie) => movie.category === "Movie"));
      setSeries(data.filter((movie: Movie) => movie.category === "TV Series"));
      setBookmarked(data.filter((movie: Movie) => movie.isBookmarked));
    }

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        allMovies,
        movies,
        series,
        bookmarked,
        searchQuery,
        setSearchQuery,
        baseMovies,
        setBaseMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
