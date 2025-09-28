import { Link } from "react-router-dom";
import AuthPrompt from "../../ui/AuthPrompt";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import { AuthProps } from "types";
import SpinnerMini from "../../ui/SpinnerMini";

function Login() {
  const { handleSubmit, register, formState, reset } = useForm<AuthProps>();
  // console.log(formState);
  const { errors } = formState;
  const { login, isPending, error: loginError } = useLogin();

  function onSubmit({ email, password }: AuthProps) {
    // console.log(data);
    if (!email || !password) return;

    login(
      { email, password },
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
          Login
        </h2>
        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
            aria-invalid={errors.email ? "true" : "false"}
            // defaultValue="test@example.com"
            {...register("email", {
              required: "This field cannot be empty",
              setValueAs: (value) => value.trim(), // to trim spaces

              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {/* {loginError && (
            <ErrorMessage>{(loginError as Error).message}</ErrorMessage>
          )} */}

          {errors?.email && (
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
            aria-invalid={errors.password ? "true" : "false"}
            // defaultValue="test@123"
            {...register("password", {
              required: "This field cannot be empty",
              setValueAs: (value) => value.trim(),
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
          />
          {errors?.password && (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          )}
        </div>

        <Button>{isPending ? <SpinnerMini /> : "Login to your account"}</Button>
        <AuthPrompt>
          Don't have an account?
          <Link to="/signup">
            <span className="cursor-pointer text-red">Sign up</span>
          </Link>
        </AuthPrompt>
      </form>
    </div>
  );
}
export default Login;
