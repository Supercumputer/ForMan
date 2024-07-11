import React, { useState } from "react";
import { Img } from "../common";
import { Link } from "react-router-dom";
import ProductModal from "./ProModel";
import { pathClient } from "../../utils/path";
import { calculateSalePrice, formatNumber } from "../../utils/helper";
function Product({ item }) {

  const [open, setOpen] = useState(false);
 
  return (
    <>
      <div className="flex flex-col">
        <div className="group block w-full h-[300px] relative overflow-hidden ">

          {item.variant.sale > 0 && (
            <p className="bg-red-500 z-10 absolute top-2 left-2 px-3 py-1 rounded-full text-[#fff] text-[12px] font-semibold">
              -{item.variant.sale}%
            </p>
          )}

          <div className="absolute right-2 top-2 z-10 flex gap-2 flex-col transform translate-x-12 group-hover:translate-x-0 transition-all">
            <div className="flex w-8 h-8 bg-[#333] text-[#fff] rounded">
              <i class="fa-solid fa-cart-plus m-auto text-[14px]"></i>
            </div>
            <div
              className="flex w-8 h-8 bg-[#333] text-[#fff] rounded"
              onClick={() => setOpen(true)}
            >
              <i class="fa-solid fa-eye m-auto text-[14px]"></i>
            </div>
            <div className="flex w-8 h-8 bg-[#333] text-[#fff] rounded">
              <i class="fa-solid fa-cart-plus m-auto text-[14px]"></i>
            </div>
          </div>

          <Link to={`${pathClient.productDetail}`}>
            <Img
              src={item.variant?.images[0]}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-all"
            />
            <Img
              src={item.variant?.images[1]}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700 absolute top-0 left-0 bottom-0 right-0 opacity-0 hover:opacity-100"
            />
          </Link>

        </div>
        <div className="font-roboto flex-1 flex flex-col justify-between gap-3 mt-3">

          <h1 className="line-clamp-2 text-[#333333] text-sm">
            {item.product.name}
          </h1>

          <div className="flex gap-3 items-center">
            <b className="text-[#ff2c26]">
              {formatNumber(
                calculateSalePrice(item.variant.price, item.variant.sale) ??
                  item.variant.price
              )}
              ₫
            </b>
            <s className="text-[#878c8f] font-normal text-sm">
              {item.variant.sale > 0 && `${formatNumber(item.variant.price)} ₫`}
            </s>
          </div>

        </div>
      </div>
      {open && <ProductModal handlerClose={() => setOpen(!open)} />}
    </>
  );
}

export default Product;
