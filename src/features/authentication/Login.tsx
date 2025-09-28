import { Link } from "react-router-dom";
import AuthPrompt from "../../ui/AuthPrompt";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";

function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-darkBlue font-outfit">
      <img src="/favicon-32x32.svg" alt="App Logo" className="mb-8" />
      <form className="flex w-full max-w-[20.4375rem] flex-col rounded-[0.625rem] bg-semiDarkBlue p-4 pl-6 md:max-w-[25rem]">
        <h2 className="tracking-[ -0.03125rem] pb-10 font-outfit text-[2rem] font-normal text-white">
          Login
        </h2>
        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
          />
          <ErrorMessage>Invalid email address</ErrorMessage>
        </div>

        <div className="mb-6 flex w-full max-w-[17.4375rem] items-start justify-between border-b border-b-grayishBlue focus-within:border-b-white md:max-w-[21rem] md:text-nowrap">
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent pb-[1.13rem] text-white focus:outline-none"
          />
          <ErrorMessage>Can't be empty</ErrorMessage>
        </div>
        <Button>Login to your account</Button>
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
