import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { HeroMovie } from "../../hooks/useHeroMovies";
import { isUnreleased } from "../../lib/releaseStatus";

function HeroSection({ heroMovies }: { heroMovies: HeroMovie[] }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const current = heroMovies[currentIndex];

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  }, [heroMovies.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  }, [heroMovies.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  }, [heroMovies.length]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (heroMovies.length <= 1) return;
    intervalRef.current = setInterval(() => advance(), 5000);
  }, [advance, heroMovies.length]);

  useEffect(() => {
    if (heroMovies.length <= 1) return;
    intervalRef.current = setInterval(() => advance(), 5000);
    return () => clearInterval(intervalRef.current);
  }, [advance, heroMovies.length]);

  const handlePrev = useCallback(() => {
    goToPrev();
    resetTimer();
  }, [goToPrev, resetTimer]);

  const handleNext = useCallback(() => {
    goToNext();
    resetTimer();
  }, [goToNext, resetTimer]);

  if (heroMovies.length === 0) return null;

  const unreleased = isUnreleased(current.status, current.releaseDate);

  const backdrop =
    current.movie.thumbnail.trending?.large ||
    current.movie.thumbnail.regular.large;

  return (
    <div className="relative h-[60vh] w-full overflow-hidden sm:h-[80vh] lg:h-[90vh]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          key={currentIndex}
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={backdrop}
            alt={current.movie.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-darkBlue/20" />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue via-darkBlue/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-darkBlue/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-20 md:p-12">
        <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">
          {current.movie.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="rounded bg-yellow-500 px-2 py-0.5 font-bold text-black">
            {current.movie.rating}
          </span>
          <span className="text-white/80">{current.movie.year}</span>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base line-clamp-2">
          {current.overview}
        </p>

        <div className="mt-5 flex flex-wrap gap-4">
          {unreleased ? (
            <>
              <span className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {t("hero.comingSoon")}
              </span>
              <button
                onClick={() => navigate(`/movie/${current.movie.id}`)}
                className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm hover:bg-white/20"
              >
                {t("hero.moreInfo")}
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate(`/movie/${current.movie.id}`)}
              className="flex items-center gap-2 rounded-full bg-red px-6 py-3 hover:bg-red/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-sm font-medium">{t("hero.watchNow")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Prev/Next arrows */}
      {heroMovies.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-110"
            aria-label={t("hero.previous")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-110"
            aria-label={t("hero.next")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex
                ? "w-6 bg-red"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
