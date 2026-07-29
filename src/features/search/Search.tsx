import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSearchHistory from "../../hooks/useSearchHistory";

function Search() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(searchParams.get("q") || "");
  const [holder, setHolder] = useState("");
  const [focused, setFocused] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSavedRef = useRef(searchParams.get("q") || "");
  const { history, addHistory, removeHistory, clearHistory } = useSearchHistory();
  const isDetailRoute = location.pathname.match(/^\/(movie|tv)\/\d+$|^\/history$/);
  const isBrowsePage = location.pathname.match(/^\/(categories\/\d+|browse\/|platform\/|collection\/)/);

  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setHolder(t("search.allPlaceholder"));
    else if (path === "/movies") setHolder(t("search.moviesPlaceholder"));
    else if (path === "/series") setHolder(t("search.seriesPlaceholder"));
    else if (path.match(/^\/(categories\/\d+|browse\/|platform\/|collection\/)/))
      setHolder(t("search.browsePlaceholder"));
    else setHolder(t("search.bookmarksPlaceholder"));
  }, [location.pathname, t]);

  const commitSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      lastSavedRef.current = trimmed;
      addHistory(trimmed);
      if (isBrowsePage) {
        navigate(`/?q=${encodeURIComponent(trimmed)}`);
      } else {
        setSearchParams((prev) => {
          prev.set("q", trimmed);
          return prev;
        });
      }
    },
    [addHistory, isBrowsePage, navigate, setSearchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setValue(raw);
    if (isBrowsePage) {
      navigate(raw.trim() ? `/?q=${encodeURIComponent(raw.trim())}` : "/");
    } else {
      setSearchParams((prev) => {
        if (raw.trim()) prev.set("q", raw);
        else prev.delete("q");
        return prev;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitSearch(value);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    setFocused(true);
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setFocused(false), 150);
    const trimmed = value.trim();
    if (trimmed && trimmed !== lastSavedRef.current) {
      lastSavedRef.current = trimmed;
      addHistory(trimmed);
    }
  };

  const selectHistory = (q: string) => {
    setValue(q);
    commitSearch(q);
    setFocused(false);
  };

  if (isDetailRoute) return null;

  const showDropdown = focused && history.length > 0 && !value.trim();

  return (
    <div className="relative flex w-full items-center gap-4">
      <img
        src="/assets/icon-search.svg"
        alt={t("search.iconAlt")}
        className="h-5 w-5 object-contain sm:h-6 sm:w-6 lg:h-8 lg:w-8"
      />
      <input
        ref={inputRef}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={value}
        type="text"
        placeholder={holder}
        className="w-full min-w-0 border-b border-b-darkBlue bg-darkBlue pb-2 font-light tracking-wide outline-none hover:cursor-pointer focus:border-b-grayishBlue focus:ring-0 focus-visible:ring-0 sm:text-base lg:text-2xl"
      />
      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-white/10 bg-semiDarkBlue shadow-lg">
          <div className="px-3 pt-2 pb-1 text-xs font-medium text-grayishBlue">
            {t("search.recentSearches")}
          </div>
          {history.map((q) => (
            <div
              key={q}
              className="flex items-center justify-between px-3 py-2 hover:bg-white/5"
            >
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectHistory(q);
                }}
                className="min-w-0 flex-1 truncate text-left text-sm text-white/80"
              >
                {q}
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  removeHistory(q);
                }}
                className="ml-2 shrink-0 text-white/40 hover:text-white/80"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              clearHistory();
              setFocused(false);
            }}
            className="w-full border-t border-white/10 px-3 py-2 text-center text-xs text-grayishBlue hover:text-white/80"
          >
            {t("search.clearHistory")}
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
