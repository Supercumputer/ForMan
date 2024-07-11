import { useRef, useState } from "react";
import { Img } from "../../common";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
function SlideBanner({ data = [] }) {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
      >
        {data.map((slide, index) => (
          <SwiperSlide key={index}>
            <Img src={slide} alt="" className="lg:h-[690px] md:h-[400px] sm:h-[300px] h-[200px] w-full object-cover"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideBanner;
