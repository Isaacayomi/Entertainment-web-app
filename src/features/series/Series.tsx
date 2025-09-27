import { useSeries } from "../../hooks/useSeries";
import { useMoviesContext } from "../../context/useMoviesContext";
import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

function Series() {
  const { series, isPending } = useSeries();

  const { baseMovies, searchQuery } = useMoviesContext();
  const normalizedQuery = searchQuery?.trim().toLowerCase() || "";

  const displayedMovies = normalizedQuery
    ? baseMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : series;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}

      {!searchQuery ? (
        <Heading>TV Series</Heading>
      ) : (
        <Heading>{`${normalizedQuery ? `Found ${displayedMovies?.length} results for "${searchQuery}"` : "Series"}`}</Heading>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedMovies?.length === 0 && <p>No results found</p>}
        {displayedMovies?.map((serie) => (
          <MovieCard movie={serie} key={serie.id} />
        ))}
      </div>
    </div>
  );
}

export default Series;
