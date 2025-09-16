import { useState } from "react";
import Playicon from "./Playicon";
import toast from "react-hot-toast";

function MovieCard() {
  const [clicked, setClicked] = useState<boolean>(false);

  function handleclick() {
    setClicked((click) => !click);

    toast.success(
      clicked === false ? "Saved to Bookmarks" : "Removed from Bookmarks",
    );
  }

  return (
    <div className="flex flex-col">
      {/* Movie Image */}
      <div className="group relative z-10 h-[8.75rem] w-full rounded-lg bg-[url('./assets/trending-movie.png')] bg-cover bg-no-repeat object-contain md:h-[10.875rem] md:cursor-pointer lg:bg-contain">
        {/* Black overlay */}
        <div className="absolute inset-0 z-0 bg-black opacity-0 transition duration-300 group-hover:opacity-50"></div>

        {/* Play Icon */}
        <div className="z-20">
          <Playicon className="transition duration-300 md:flex md:group-hover:flex" />
        </div>

        {/* Bookmark icon */}
        <div
          onClick={handleclick}
          className="opacity-[0.5006 ] absolute right-0 z-20 mr-[0.5rem] mt-[0.5rem] h-8 w-8 rounded-[2rem] bg-darkBlue md:mr-6"
        >
          <img
            src={`${clicked ? "./assets/icon-bookmark-full.svg" : "./assets/icon-bookmark-empty.svg"}`}
            alt="Bookmark icon"
            className="m-auto flex items-center justify-center py-[0.56rem]"
          />
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-normal text-white opacity-80 lg:text-[0.9375rem]">
          <p>2019</p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
            >
              <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white" />
            </svg>
          </span>
          <p className="flex items-center gap-[0.38rem]">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.9556 0H3.04444C1.36304 0 0 1.36304 0 3.04444V16.9556C0 18.637 1.36304 20 3.04444 20H16.9556C17.763 20 18.5374 19.6792 19.1083 19.1083C19.6792 18.5374 20 17.763 20 16.9556V3.04444C20 2.23701 19.6792 1.46264 19.1083 0.891697C18.5374 0.320753 17.763 0 16.9556 0ZM4 9H2V7H4V9ZM4 11H2V13H4V11ZM18 9H16V7H18V9ZM18 11H16V13H18V11ZM18 2.74V4H16V2H17.26C17.4563 2 17.6445 2.07796 17.7833 2.21674C17.922 2.35552 18 2.54374 18 2.74ZM4 2H2.74C2.54374 2 2.35552 2.07796 2.21674 2.21674C2.07796 2.35552 2 2.54374 2 2.74V4H4V2ZM2 17.26V16H4V18H2.74C2.54374 18 2.35552 17.922 2.21674 17.7833C2.07796 17.6445 2 17.4563 2 17.26ZM17.26 18C17.6687 18 18 17.6687 18 17.26V16H16V18H17.26Z"
                />
              </svg>
            </span>
            <span>Movie</span>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3"
            height="3"
            viewBox="0 0 3 3"
            fill="none"
          >
            <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white" />
          </svg>
          <p>PG</p>
        </div>

        <p className="text-[0.875rem] font-normal text-white lg:text-2xl">
          The Great Lands
        </p>
      </div>
    </div>
  );
}
export default MovieCard;
