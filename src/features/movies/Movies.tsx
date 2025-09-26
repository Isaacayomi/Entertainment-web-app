import { useMovies } from "../../hooks/useMovies";
import { useMoviesContext } from "../../context/useMoviesContext";
import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import Spinner from "../../ui/Spinner";

function Movies() {
  const { movies, isPending } = useMovies();
  const { movies: contextMovies, searchQuery } = useMoviesContext();

  const normalizedQuery = searchQuery?.trim().toLowerCase() || "";

  const displayedMovies = normalizedQuery
    ? contextMovies.filter((movie) =>
        movie.title.toLowerCase().includes(normalizedQuery),
      )
    : movies;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}

      {!searchQuery ? (
        <Heading>Movies</Heading>
      ) : (
        <Heading>{`${normalizedQuery ? `Showing ${displayedMovies?.length} results for "${searchQuery}"` : "Movies"}`}</Heading>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedMovies?.length === 0 && <p>No results found</p>}
        {displayedMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
