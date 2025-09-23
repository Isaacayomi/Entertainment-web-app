import MovieCard from "../../ui/MovieCard";
import Heading from "../../ui/Heading";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { getSeries } from "../../services/apiSeries";

function Series() {
  const { data: series, isPending } = useQuery({
    queryKey: ["series"],
    queryFn: getSeries,
  });

  const log = isPending;
  console.log(log);

  return (
    <div className="h-screen">
      {isPending && <Spinner />}

      <Heading>Series</Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {series?.map((serie) => {
          return <MovieCard movie={serie} />;
        })}
      </div>
    </div>
  );
}

export default Series;
