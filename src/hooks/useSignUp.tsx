import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
  });

  return { signUp, isPending };
}
