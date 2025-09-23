import supabase from "./supabase";

export async function getBookmark() {
  const { data: isBookmarked, error } = await supabase
    .from("catalog")
    .select("*")
    .eq("isBookmarked", true);

  if (error) {
    throw new Error(error.message);
  }
  return isBookmarked;
}
