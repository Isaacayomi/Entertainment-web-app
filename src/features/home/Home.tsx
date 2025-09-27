import { useMoviesContext } from "../../context/useMoviesContext";
import { useHomeMovies } from "../../hooks/useHomeMovies";
import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import TrendingMovies from "./TrendingMovie";
import Spinner from "../../ui/Spinner";

function Home() {
  const { allMovies, isPending } = useHomeMovies();
  const { baseMovies, searchQuery } = useMoviesContext();

  const normalizedQuery = searchQuery?.trim().toLowerCase() || "";

  const displayedMovies = normalizedQuery
    ? baseMovies.filter((movie) =>
        movie.title.toLowerCase().includes(normalizedQuery),
      )
    : allMovies;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}

      {!searchQuery?.trim() && (
        <>
          <Heading>Trending</Heading>
          <div className="flex pb-6">
            <TrendingMovies />
          </div>
        </>
      )}

      <Heading>{`${normalizedQuery ? `Found ${displayedMovies?.length} results for "${searchQuery}"` : "Recommended for you"}`}</Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedMovies?.length === 0 && <p>No results found</p>}
        {displayedMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
