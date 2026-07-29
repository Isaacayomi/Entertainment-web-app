import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../hooks/useLogin";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { AuthProps } from "types";

import AuthLayout from "./AuthLayout";
import AuthPrompt from "../../ui/AuthPrompt";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import GoogleButton from "../../ui/GoogleButton";
import SEO from "../../ui/SEO";
import toast from "react-hot-toast";
import { handleRedirectResult } from "../../services/apiAuth";
import { trackUserCountry } from "../../services/apiGeolocation";
import { getGoogleAuthErrorMessage } from "../../hooks/useGoogleLogin";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, isPending: authPending } = useUser();

  useEffect(() => {
    handleRedirectResult()
      .then((result) => {
        if (result) {
          trackUserCountry();
          navigate("/", { replace: true });
          toast.success("Logged in successfully");
        }
      })
      .catch((error) => {
        toast.error(getGoogleAuthErrorMessage(error));
      });
  }, [navigate]);

  useEffect(() => {
    if (!authPending && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, authPending, navigate]);

  const { handleSubmit, register, formState, setError } = useForm<AuthProps>();
  const { errors } = formState;
  const { login, isPending } = useLogin();
  const { googleLogin, isPending: googlePending } = useGoogleLogin();

  const isLoading = isPending || googlePending;

  function onSubmit({ email, password }: AuthProps) {
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          trackUserCountry();
          navigate("/", { replace: true });
          toast.success("Logged in successfully");
        },
        onError: () => {
          setError("email", {
            message: "Incorrect email. Please try again.",
          });
          setError("password", {
            message: "Incorrect password. Please try again.",
          });
        },
      },
    );
  }

  return (
    <AuthLayout>
      <SEO title="Log In" description="Sign in to your WòFlix account to continue watching." />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <h2 className="tracking-[ -0.03125rem] pb-10 font-outfit text-[2rem] font-normal text-white">
          {t("auth.login")}
        </h2>

        <div className="mb-6">
          <div className={`flex w-full items-start justify-between border-b ${errors?.email ? 'border-b-red' : 'hover:border-b-red focus-within:border-b-red'}`}>
            <input
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: t("auth.fieldRequired"),
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("auth.invalidEmail"),
                },
              })}
            />
          </div>
          {errors?.email && (
            <p className="pt-1 text-xs text-red">{errors?.email?.message}</p>
          )}
        </div>

        <div className="mb-6">
          <div className={`flex w-full items-start justify-between border-b ${errors?.password ? 'border-b-red' : 'hover:border-b-red focus-within:border-b-red'}`}>
            <input
              type="password"
              placeholder={t("auth.passwordPlaceholder")}
              className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: t("auth.fieldRequired"),
                setValueAs: (value) => value.trim(),
                minLength: {
                  value: 8,
                  message: t("auth.passwordLength"),
                },
              })}
            />
          </div>
          {errors?.password && (
            <p className="pt-1 text-xs text-red">{errors?.password?.message}</p>
          )}
        </div>

        <Button disabled={isLoading}>{isLoading ? <SpinnerMini /> : t("auth.loginToAccount")}</Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-darkBlue px-2 text-white/40">{t("auth.or")}</span>
          </div>
        </div>

        <div className="mb-4">
          <GoogleButton
            onClick={() => googleLogin()}
            isPending={isLoading}
            label={t("auth.continueWithGoogle")}
          />
        </div>

        <AuthPrompt>
          {t("auth.dontHaveAccount")}{" "}
          <Link to="/sign-up">
            <span className="cursor-pointer text-red">{t("auth.signUpLink")}</span>
          </Link>
        </AuthPrompt>
      </form>
    </AuthLayout>
  );
}
export default Login;
