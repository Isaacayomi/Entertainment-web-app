import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../services/apiAllMovies";

export function useHomeMovies() {
  const { data: allMovies, isPending } = useQuery({
    queryKey: ["allMovies"],
    queryFn: getAllMovies,
  });

  return { allMovies, isPending };
}
