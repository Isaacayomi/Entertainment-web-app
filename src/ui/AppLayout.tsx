import { Outlet } from "react-router-dom";
import Search from "../features/search/Search";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { MovieProvider } from "../context/MovieContext";

function AppLayout() {
  return (
    <div className="min-h-screen bg-darkBlue font-outfit text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto grid max-w-[1300px] gap-9 p-8 sm:grid-cols-[1fr] sm:grid-rows-[1fr] lg:grid-cols-[6rem_1fr] lg:grid-rows-[auto_1fr]">
        <Navbar />
        <MovieProvider>
          <Search />
          <main className="overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Outlet />
          </main>
        </MovieProvider>
      </div>
    </div>
  );
}
export default AppLayout;
