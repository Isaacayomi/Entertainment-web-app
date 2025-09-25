import { useQuery } from "@tanstack/react-query";
import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import TrendingMovies from "./TrendingMovie";
import { getAllMovies } from "../../services/apiAllMovies";
import Spinner from "../../ui/Spinner";
import { useMovies } from "../../context/useMovies";

function Home() {
  const { data: allMovies, isPending } = useQuery({
    queryKey: ["allMovies"],
    queryFn: getAllMovies,
  });
  const { baseMovies, searchQuery } = useMovies();

  const displayedMovies = searchQuery
    ? baseMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allMovies;

  return (
    <div className="h-screen">
      {/* Spinner */}
      {isPending && <Spinner />}

      <Heading>Trending</Heading>
      <div className="flex pb-6">
        <TrendingMovies />
      </div>

      <Heading>Recommended for you</Heading>

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

export default Home;
