import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const [holder, setHolder] = useState<string>("");
  const location = useLocation();
  const navigation = location.pathname;

  useEffect(
    function () {
      if (navigation === "/") {
        setHolder("Search for movies or TV series");
      } else if (navigation === "/movies") {
        setHolder("Search for movies");
      } else if (navigation === "/series") {
        setHolder("Search for TV series");
      } else {
        setHolder("Search for Bookmarked Movies/Tv Shows");
      }
    },
    [navigation],
  );

  return (
    <div className="flex items-center gap-4">
      <img
        src="./assets/icon-search.svg"
        alt="Search icon"
        className="h-5 w-5 object-contain sm:h-6 sm:w-6 lg:h-8 lg:w-8"
      />
      <input
        type="text"
        placeholder={holder}
        className="w-full max-w-[74rem] border-b border-b-darkBlue bg-darkBlue pb-2 font-light tracking-wide outline-none hover:cursor-pointer focus:border-b-grayishBlue sm:text-base lg:text-2xl"
      />
    </div>
  );
}

export default Search;
