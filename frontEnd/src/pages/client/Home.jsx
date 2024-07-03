import React, { useEffect } from "react";
import {
  SlideBanner,
  SlideProduct,
} from "../../components/clientComponent/Slide";
import { apicate } from "../../apis/axios";
import { Product, SectionHeader } from "../../components/clientComponent";

const slides = [
  "https://4menshop.com/images/thumbs/slides/slide-2-trang-chu-slide-2.png?t=1716575843",
  "https://4menshop.com/images/thumbs/slides/banner-top-trang-chu-2-slide-20.jpg?t=1716573264",
  "https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=418",
];
function Home() {
  useEffect(() => {
    (async () => {
      await apicate();
    })();
  }, []);
  return (
    <>
      <div className="">
        <SlideBanner data={slides} />
        <div className="lg:px-[8%] px-2">
          <SectionHeader title={"THỜI TRANG HOT NHẤT"} />
          <SlideProduct />
          <SectionHeader title={"SẢN PHẨM MỚI NHẤT"} />
          <div className="grid grid-cols-4 gap-4">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
          <SectionHeader title={"SẢN PHẨM MỚI NHẤT"} />
          <div className="grid grid-cols-4 gap-4">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Home;
