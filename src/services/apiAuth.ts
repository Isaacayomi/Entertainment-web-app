import { AuthProps } from "types";
import supabase from "./supabase";

export async function loginApi({ email, password }: AuthProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);

  return data;
}
