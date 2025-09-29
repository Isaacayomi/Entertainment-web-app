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

export async function signUpApi({ email, password }: AuthProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  // checks if there's currently a user (authenticated user)
  if (!session.session) return null;
  console.log(session);

  // gets the user's profile from supabase, checks to see if it exists
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);
  return data?.user;
}
