import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../services/apiSeries";
import { Movie } from "types";

export function useSeries() {
  const { data: series, isPending } = useQuery<Movie[]>({
    queryKey: ["series"],
    queryFn: getSeries,
  });

  return { series, isPending };
}
