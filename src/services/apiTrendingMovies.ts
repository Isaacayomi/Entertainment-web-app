import supabase from "./supabase";

export async function getTrendingMovies() {
  const { data: trendingMovies, error } = await supabase
    .from("catalog")
    .select("*")
    .eq("isTrending", true);

  if (error) {
    throw new Error(error.message);
  }
  return trendingMovies;
}
