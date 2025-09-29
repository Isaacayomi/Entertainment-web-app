import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import Movies from "./features/movies/Movies";
import Series from "./features/series/Series";
import Bookmark from "./features/bookmarks/Bookmark";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./ui/PageNotFound";
import Login from "./features/authentication/Login";
import SignUp from "./features/authentication/SignUp";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<Home />} path="/" />
            <Route element={<Movies />} path="movies" />
            <Route element={<Series />} path="series" />
            <Route element={<Bookmark />} path="bookmarks" />
          </Route>
          <Route element={<Login />} path="login" />
          <Route element={<SignUp />} path="sign-up" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
