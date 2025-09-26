import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "../../services/apiBookmark";
import { useMoviesContext } from "../../context/useMoviesContext";
import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

function Bookmark() {
  const { data: isBookmarked, isPending } = useQuery({
    queryKey: ["bookmarkedMovies"],
    queryFn: getBookmark,
  });

  const { movies: contextMovies, searchQuery } = useMoviesContext();

  const normalizedQuery = searchQuery?.trim().toLowerCase() || "";

  const displayedMovies = normalizedQuery
    ? contextMovies.filter((movie) =>
        movie.title.toLowerCase().includes(normalizedQuery),
      )
    : isBookmarked;

  return (
    <div className="h-screen">
      {isPending && <Spinner />}
      {!searchQuery ? (
        <Heading>Bookmarked TV Series and Movies</Heading>
      ) : (
        <Heading>{`${normalizedQuery ? `Showing ${displayedMovies?.length} results for "${searchQuery}"` : "Bookmarked TV Series and Movies"}`}</Heading>
      )}
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
