import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-semiDarkBlue text-center font-outfit text-grayishBlue">
      <h1 className="text-8xl font-bold text-white">404</h1>
      <p className="mt-4 text-xl">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-red px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-semiDarkBlue"
      >
        Go back home
      </Link>
    </div>
  );
}

export default PageNotFound;
