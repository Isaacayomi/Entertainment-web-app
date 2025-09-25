import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { updateBookmark } from "../services/apiUpdateBookmark";
import toast from "react-hot-toast";

type Thumbnail = {
  trending?: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
};

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: string;
  category: string;
  thumbnail: Thumbnail;
  isBookmarked: boolean;
};

export function useBookmark(movie: Movie) {
  const { title, isBookmarked, id } = movie;

  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: (updatedMovie) => {
      // invalidate queries basically lets the entire cache be refetched after a mutation has been made so that the UI is always in sync with the server
      queryClient.invalidateQueries({ queryKey: ["trendingMovies"] });
      queryClient.invalidateQueries({ queryKey: ["allMovies"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedMovies"] });

      toast.success(
        updatedMovie.isBookmarked
          ? `${title} has been added to bookmarks`
          : `${title} has been removed from bookmarks`,
        { style: { fontSize: "0.875rem", textAlign: "center" } },
      );
    },
    onError: (err: Error) => {
      toast.error(`Something went wrong: ${err.message}`);
      setBookmarked(isBookmarked);
    },
  });

  function handleClick() {
    const newValue = !bookmarked;
    setBookmarked(newValue);

    mutate({ newValue, id });
  }

  return { bookmarked, isPending, handleClick };
}
