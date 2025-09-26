import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import Spinner from "../../ui/Spinner";
import { useMoviesContext } from "../../context/useMoviesContext";
import { useMovies } from "../../hooks/useMovies";

function Movies() {
  const { movies, isPending } = useMovies();

  const { movies: contextMovies, searchQuery } = useMoviesContext();

  const displayedMovies = searchQuery
    ? contextMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : movies;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}

      <Heading>Movies</Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(displayedMovies && displayedMovies.length) === 0 && (
          <p>No results found</p>
        )}

        {displayedMovies?.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}
export default Movies;
