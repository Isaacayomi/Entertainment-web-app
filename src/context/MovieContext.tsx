import { createContext, useEffect, useState } from "react";
import { getAllMovies } from "../services/apiAllMovies";
import { useLocation } from "react-router-dom";
import { getMovies } from "../services/apiMovies";
import { getSeries } from "../services/apiSeries";
import { getBookmark } from "../services/apiBookmark";
import { Movie } from "types";

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
  const location = useLocation();
  const navigation = location.pathname;

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [baseMovies, setBaseMovies] = useState<Movie[]>([]);

  const [series, setSeries] = useState<Movie[]>([]);
  const [bookmarked, setBookmarked] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchMovies() {
      const data =
        navigation === "/"
          ? await getAllMovies()
          : navigation === "/movies"
            ? await getMovies()
            : navigation === "/series"
              ? await getSeries()
              : await getBookmark();

      setAllMovies(data);
      setSeries(data);
      setMovies(data);
      setBookmarked(data);
    }

    fetchMovies();
  }, [navigation]);

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
