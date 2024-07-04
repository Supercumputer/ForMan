
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
// import { Pagination } from 'swiper/modules';
import Product from '../Product';
function SlideProduct() {
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
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        // modules={[Pagination]}
        className="initial mySwiper z-10"
      >
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SlideProduct
