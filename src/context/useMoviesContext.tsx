import { useContext } from "react";
import { MovieContext } from "./MovieContext";

function useMoviesContext() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
}

export { useMoviesContext };
