import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
  const {
    data: user,
    error,
    isPending,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  if (error) throw new Error(error.message);

  return { isPending, error, isAuthenticated: user?.role === "authenticated" };
}
