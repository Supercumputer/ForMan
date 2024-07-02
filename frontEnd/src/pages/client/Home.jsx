import React from "react";
import { Slide } from "../../components/clientComponent/Slide";

const slides = [
  "https://4menshop.com/images/thumbs/slides/slide-2-trang-chu-slide-2.png?t=1716575843",
  "https://4menshop.com/images/thumbs/slides/banner-top-trang-chu-2-slide-20.jpg?t=1716573264",
  "https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=418",
];
function Home() {
  return (
    <>
      <div className="">
        <Slide data={slides} />
      </div>
    </>
  );
}

export default Home;
