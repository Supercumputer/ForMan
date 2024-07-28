import React, { useEffect, useState } from "react";
import { Img } from "../common";
import { Link } from "react-router-dom";
import {
  calculateSalePrice,
  formatNumber,
  calculateDaysFrom,
} from "../../utils/helper";

import { Modal } from "flowbite-react";
import ProductInfo from "./ProductInfo";
import { apiGetAverageRating, apiGetProductBySlug } from "../../apis/axios";
import BtnAddToCart from "./BtnAddToCart";

function Product({ item }) {
  const [openModal, setOpenModal] = useState(false);
  const [defaultVariant, setDefaultVariant] = useState({});
  const [variants, setVariants] = useState([]);
  const [ratings, setRatings] = useState({
    averageRatings: 0,
    percentageRatings: [],
    totalReviews: 0,
  });

  const callApiGetProductBySlug = async () => {
    await apiGetProductBySlug(item.product_id.slug)
      .then((variant) => {
        setVariants(variant.variants);
        setDefaultVariant(variant.defaultVariant);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("done"));
  };

  const handlerShowProductInfo = async () => {
    callApiGetProductBySlug();
    setOpenModal(true);
  };

  const callApiGetAverageRating = async (variantId) => {
    try {
      const rating = await apiGetAverageRating(variantId);

      if (rating && rating.status === true) {
        setRatings({
          averageRatings: rating.averageRatings || 0,
          percentageRatings: rating.percentageRatings || [],
          totalReviews: rating.totalReviews || 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (defaultVariant._id) {
      callApiGetAverageRating(defaultVariant._id);
    }
  }, [defaultVariant]);

  const handlerSetDefaultVariant = (variant) => {
    setDefaultVariant(variant);
  };

  return (
    <>
      <div className="flex flex-col relative">
        {calculateDaysFrom(item.product_id.createdAt, 12) && (
          <p className="bg-red-500 z-10 absolute top-2 -left-2 px-3 py-1 rounded-e text-[#fff] text-[12px] font-semibold before:absolute before:-bottom-[7px] before:left-0 before:content-[''] before:border-l-[7px] before:border-t-[7px] before:border-l-transparent before:border-t-[#4e4e4e] ">
            New
          </p>
        )}
        <div className="group block w-full h-[300px] relative overflow-hidden ">
          {item.sale > 0 && (
            <p className="bg-[#333] w-[50px] z-10 absolute text-center top-0 right-2 px-2 py-2 text-[#fff] text-[12px] font-semibold before:absolute before:-bottom-2 before:left-0 before:right-0 before:content-[''] before:border-l-[25px] before:border-r-[25px] before:border-t-8 before:border-l-transparent before:border-r-transparent before:border-t-[#333]">
              -{item.sale}%
            </p>
          )}

          <div className="absolute bottom-2 left-2 right-2 z-10 flex gap-2 transform translate-y-20 group-hover:translate-y-0 transition-all ">

            <BtnAddToCart className="overflow-hidden flex-1 p-2 bg-[#333] text-[#fff] hover:text-[#fff]" quantity={1} variant={item} />

            <div
              className="flex w-10 h-10 bg-[#333] text-[#fff] rounded"
              onClick={handlerShowProductInfo}
            >
              <i class="fa-solid fa-eye m-auto text-[14px]"></i>
            </div>
          </div>

          <Link to={`/products/${item.product_id.slug}`}>
            <Img
              src={item.images[0]}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-all"
            />
            <Img
              src={item.images[1]}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700 absolute top-0 left-0 bottom-0 right-0 opacity-0 hover:opacity-100"
            />
          </Link>
        </div>

        <div className="font-roboto flex-1 flex flex-col justify-between gap-3 mt-3">
          <h1 className="line-clamp-2 text-[#333333] text-sm">
            {item.product_id.name}
          </h1>

          <div className="flex gap-3 items-center">
            <b className="text-[#ff2c26]">
              {formatNumber(
                calculateSalePrice(item.price, item.sale) ?? item.price
              )}
              ₫
            </b>
            <s className="text-[#878c8f] font-normal text-sm">
              {item.sale > 0 && `${formatNumber(item.price)} ₫`}
            </s>
          </div>
        </div>
      </div>

      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="5xl"
      >
        <Modal.Header>Quick viewing products</Modal.Header>
        <Modal.Body className="custom-scroll">
          <ProductInfo
            variants={variants}
            defaultVariant={defaultVariant}
            setDefaultVariant={handlerSetDefaultVariant}
            ratings={ratings}
            onClose={() => setOpenModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Product;
