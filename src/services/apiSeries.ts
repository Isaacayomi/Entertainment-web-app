import supabase from "./supabase";

export async function getSeries() {
  const { data: series, error } = await supabase
    .from("catalog")
    .select("*")
    .eq("category", "tv series");

  if (error) {
    throw new Error(error.message);
  }
  return series;
}
