import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import Movies from "./features/movies/Movies";
import Series from "./features/series/Series";
import Bookmark from "./features/bookmarks/Bookmark";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<Movies />} path="movies" />
          <Route element={<Series />} path="series" />
          <Route element={<Bookmark />} path="bookmarked" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
