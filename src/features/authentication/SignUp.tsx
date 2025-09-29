import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";
import { useForm } from "react-hook-form";
import { AuthProps } from "types";

import AuthPrompt from "../../ui/AuthPrompt";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUp() {
  const { mutate, isPending } = useSignUp();

  const { handleSubmit, register, formState, getValues, reset } =
    useForm<AuthProps>();
  const { errors } = formState;

  function onSubmit({ email, password }: AuthProps) {
    if (!email || !password) return;

    mutate(
      {
        email,
        password,
      },

      {
        onSettled: () => {
          reset();
        },
      },
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-darkBlue font-outfit">
      <img src="/favicon-32x32.svg" alt="App Logo" className="mb-8" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[20.4375rem] flex-col rounded-[0.625rem] bg-semiDarkBlue p-4 pl-6 md:max-w-[25rem]"
      >
        <h2 className="tracking-[ -0.03125rem] pb-10 font-outfit text-[2rem] font-normal text-white">
          Sign Up
        </h2>
        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: "This field cannot be empty",
              setValueAs: (value) => value.trim(),

              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", {
              required: "This field cannot be empty",
              setValueAs: (value) => value.trim(),
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            id="passwordConfirm"
            type="password"
            placeholder="Repeat password"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
            {...register("confirmPassword", {
              required: "This field cannot be empty",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>
        <Button>{isPending ? <SpinnerMini /> : "Create your account"}</Button>
        <AuthPrompt>
          Already have an account?{" "}
          <Link to="/login">
            <span className="cursor-pointer text-red">Login</span>
          </Link>
        </AuthPrompt>
      </form>
    </div>
  );
}
export default SignUp;
