import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";

function Bookmark() {
  return (
    <div>
      <Heading>Bookmarked Movies</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
export default Bookmark;
