// import MySwiper from "../../ui/MySwiper";
import Heading from "../../ui/Heading";
import MovieCard from "../../ui/MovieCard";
import TrendingMovies from "./TrendingMovie";

function Home() {
  return (
    <div className="h-screen">
      <Heading>Trending</Heading>
      <div className="flex pb-6">
        {/* <MySwiper /> */}

        <TrendingMovies />
      </div>

      <Heading>Recommended for you</Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}

export default Home;
