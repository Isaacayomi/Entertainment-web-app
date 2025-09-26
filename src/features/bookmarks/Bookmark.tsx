import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import { getBookmark } from "../../services/apiBookmark";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useMoviesContext } from "../../context/useMoviesContext";

function Bookmark() {
  const { data: isBookmarked, isPending } = useQuery({
    queryKey: ["bookmarkedMovies"],
    queryFn: getBookmark,
  });

  const { movies: contextMovies, searchQuery } = useMoviesContext();

  const displayedMovies = searchQuery
    ? contextMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : isBookmarked;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}
      <Heading>Bookmarked Series & Movies</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedMovies?.map((bookmarkedMovie) => {
          return <MovieCard movie={bookmarkedMovie} key={bookmarkedMovie.id} />;
        })}

        {!displayedMovies?.length && <p>No bookmarked movies found.</p>}
      </div>
    </div>
  );
}
export default Bookmark;
