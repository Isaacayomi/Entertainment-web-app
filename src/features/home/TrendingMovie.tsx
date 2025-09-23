import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../services/apiTrendingMovies";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import TrendingMovieCard from "./TrendingMovieCard";

function TrendingMovie() {
  const { data: trendingMovies, isPending } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
  });

  if (isPending) return <p className="text-white">Loading...</p>;

  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      spaceBetween={16}
      freeMode
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: { slidesPerView: 1.2, spaceBetween: 6 },
        640: { slidesPerView: 2.2, spaceBetween: 10 },
      }}
    >
      {trendingMovies?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <TrendingMovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TrendingMovie;
