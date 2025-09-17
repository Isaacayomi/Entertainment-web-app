import supabase from "./supabase";

export async function getMovies() {
  const { data: movies, error } = await supabase
    .from("catalog")
    .select("*")
    .eq("category", "movie");

  if (error) {
    throw new Error(error.message);
  }
  return movies;
}
