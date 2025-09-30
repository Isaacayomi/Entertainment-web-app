import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../services/apiAuth";
import { AuthProps } from "types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // console.log(navigate);
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: AuthProps) =>
      loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);

      navigate("/", { replace: true });
      toast.success("Logged in successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Login failed, please try again");
    },
  });

  return { login, isPending, error };
}
