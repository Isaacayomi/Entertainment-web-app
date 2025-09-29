import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import TrendingMovie from "../features/home/TrendingMovie";

function MySwiper() {
  return (
    <Swiper
      className="!w-auto" // prevent Swiper from forcing full width
      spaceBetween={20} // adjust gap between slides
      slidesPerView="auto" // important: lets slides keep their own width
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: SwiperClass) => console.log(swiper)}
    >
      <SwiperSlide className="w-auto">
        <TrendingMovie />
      </SwiperSlide>
      <SwiperSlide className="w-auto">
        <TrendingMovie />
      </SwiperSlide>
    </Swiper>
  );
}

export default MySwiper;
