import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Img } from "../../common";
function SlideBrand() {
  return (
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        // modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Img
            src={
              "https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_532.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://file.hstatic.net/200000503583/file/logo-cac-thuong-hieu-thoi-trang-noi-tieng-7_265c84a82af1456a9676f5f6c5a23255.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://file.hstatic.net/200000503583/file/logo-cac-thuong-hieu-thoi-trang-noi-tieng-15_e8ad2022abc647a5a2c6bcd7bf678b1d.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_532.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_298.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_532.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_298.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src={
              "https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_532.jpg"
            }
            className="h-24 w-full object-cover"
            alt={""}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SlideBrand;
