import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import { getBookmark } from "../../services/apiBookmark";
import { useQuery } from "@tanstack/react-query";
// import Spinner from "../../ui/Spinner";
import Spinner from "../../ui/Spinner";

function Bookmark() {
  const { data: isBookmarked, isPending } = useQuery({
    queryKey: ["bookmarkedMovies"],
    queryFn: getBookmark,
  });

  return (
    <div className="h-screen">
      {isPending && <Spinner />}
      <Heading>Bookmarked Series & Movies</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isBookmarked?.map((bookmarkedMovie) => {
          return <MovieCard movie={bookmarkedMovie} />;
        })}

        {!isBookmarked?.length && <p>No bookmarked movies found.</p>}
      </div>
    </div>
  );
}
export default Bookmark;
