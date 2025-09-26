import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import { useMoviesContext } from "../../context/useMoviesContext";
import { useSeries } from "../../hooks/useSeries";

function Series() {
  const { series, isPending } = useSeries();

  const { baseMovies, searchQuery } = useMoviesContext();

  const displayedMovies = searchQuery
    ? baseMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : series;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}

      <Heading>Series</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(displayedMovies && displayedMovies.length) === 0 && (
          <p>No results found</p>
        )}

        {displayedMovies?.map((serie) => {
          return <MovieCard movie={serie} key={serie.id} />;
        })}
      </div>
    </div>
  );
}

export default Series;
