import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";

function Movies() {
  return (
    <div>
      <Heading>Movies</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
export default Movies;
