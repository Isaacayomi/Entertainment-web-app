import supabase from "./supabase";

export async function getAllMovies() {
  // fetches all movies and tv series
  const { data: catalog, error } = await supabase.from("catalog").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return catalog;
}
