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

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const SlideImgPro = ({ data = [] }) => {
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
        {data.map((item) => (
          <SwiperSlide key={item}>
            <img src={item} alt="" className="h-full w-full object-contain" />
          </SwiperSlide>
        ))}
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
        {data.map((item) => (
          <SwiperSlide key={item} style={{ width: "25%", paddingTop: "10px" }}>
            <Zoom>
              <img src={item} alt="" className="h-full w-full object-cover" />
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideImgPro;
