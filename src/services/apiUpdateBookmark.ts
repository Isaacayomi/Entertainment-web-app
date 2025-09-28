import supabase from "./supabase";

export async function updateBookmark({
  newValue,
  id,
}: {
  newValue: boolean;
  id: number;
}) {
  const { data, error } = await supabase
    .from("catalog")
    .update({ isBookmarked: newValue })
    .eq("id", id)
    .select("id, isBookmarked");
  if (error) throw new Error(error.message);

  if (!data || data.length === 0) {
    throw new Error("No row updated (check id / RLS / permissions)");
  }

  return data[0];
}
