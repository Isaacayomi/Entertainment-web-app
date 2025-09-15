function Search() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="./assets/icon-search.svg"
        alt="Search icon"
        className="h-5 w-5 object-contain sm:h-6 sm:w-6 lg:h-8 lg:w-8"
      />
      <input
        type="text"
        placeholder="Search for movies or TV series"
        className="w-full max-w-[74rem] border-b border-b-darkBlue bg-darkBlue pb-2 font-light tracking-wide outline-none hover:cursor-pointer focus:border-b-grayishBlue sm:text-base lg:text-2xl"
      />
    </div>
  );
}

export default Search;
