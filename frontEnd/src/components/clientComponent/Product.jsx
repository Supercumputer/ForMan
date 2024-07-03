import React from "react";
import { Img } from "../common";
import { Link } from "react-router-dom";
function Product() {
  return (
    <div>
      <Link
        to={"/"}
        className="block w-full h-[300px] relative overflow-hidden before:bg-red-500 before:content-['-30%'] before:z-10 before:absolute before:top-2 before:left-2 before:px-3 before:py-1 before:rounded-full before:text-[#fff] before:text-[12px] before:font-semibold"
      >
        <Img
          src="https://theme.hstatic.net/200000690725/1001078549/14/home_category_2_img.jpg?v=418"
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition-all"
        />
        <Img
          src="https://theme.hstatic.net/200000690725/1001078549/14/home_category_1_img.jpg?v=418"
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition-all duration-700 absolute top-0 left-0 bottom-0 right-0 opacity-0 hover:opacity-100"
        />
      </Link>
      <div className="font-roboto flex flex-col gap-3 mt-3">
        <h1 className="line-clamp-2 text-[#333333] text-sm">
          Áo Polo thể thao can phối thân ngắn tay FSTP024
        </h1>
        <div className="flex gap-3 items-center">
          <b className="text-[#ff2c26]">299,000₫</b>
          <s className="text-[#878c8f] font-normal text-sm">450,000₫</s>
        </div>
      </div>
    </div>
  );
}

export default Product;
