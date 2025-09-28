import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/apiAuth";
import { AuthProps } from "types";

export function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: AuthProps) =>
      loginApi({ email, password }),
  });

  return { login, isPending };
}
