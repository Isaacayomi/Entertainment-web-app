// import MySwiper from "../../ui/MySwiper";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import TrendingMovies from "./TrendingMovie";
import { getAllMovies } from "../../services/apiAllMovies";
import Spinner from "../../ui/Spinner";

function Home() {
  const { data: allMovies, isPending } = useQuery({
    queryKey: ["allMovies"],
    queryFn: getAllMovies,
  });

  return (
    <div className="h-screen">
      <Heading>Trending</Heading>
      <div className="flex pb-6">
        <TrendingMovies />
      </div>

      <Heading>Recommended for you</Heading>

      {/* Spinner */}
      {isPending && <Spinner />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allMovies?.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}

export default Home;
