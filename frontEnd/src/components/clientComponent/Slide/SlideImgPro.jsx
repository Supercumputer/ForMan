import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const SlideImgPro = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[80%]"
      >
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-10.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[20%]"
      >
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "25%", paddingTop: "10px" }}>
          <img
            src="https://swiperjs.com/demos/images/nature-10.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SlideImgPro;
