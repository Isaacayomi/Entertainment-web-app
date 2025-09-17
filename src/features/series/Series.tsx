import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../../services/apiSeries";
import Spinner from "../../ui/Spinner";

function Series() {
  const { data: series, isPending } = useQuery({
    queryKey: ["movies"],
    queryFn: getSeries,
  });
  return (
    <div className="h-screen">
      <Heading>Series</Heading>

      {isPending && <Spinner />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {series?.map((serie) => {
          return <MovieCard movie={serie} />;
        })}
      </div>
    </div>
  );
}

export default Series;
