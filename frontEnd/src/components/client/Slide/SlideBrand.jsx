
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Img } from "../../common";
function SlideBrand({ data }) {
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
        className=""
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Img
              src={item.logo}
              className="h-24 w-full object-cover"
              alt={""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideBrand;
