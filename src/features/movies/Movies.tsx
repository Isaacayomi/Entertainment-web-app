import { useQuery } from "@tanstack/react-query";
import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import { getMovies } from "../../services/apiMovies";

function Movies() {
  const { data: movies, isPending } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  return (
    <div className="h-screen">
      <Heading>Movies</Heading>

      {isPending && <p>Loading...</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movies?.map((movie) => {
          return <MovieCard movie={movie} />;
        })}
      </div>
    </div>
  );
}
export default Movies;
