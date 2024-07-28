import React, { useEffect } from "react";
import { Img } from "../../components/common";
import { inventory } from "../../assets/images";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../../components/clientComponent";

function Inventory() {

  const { carts } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (carts.length <= 0) navigate("/carts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts])

  return (
    <div className="flex flex-col lg:px-[8%] px-2 my-10 font-roboto">
      <h1 className="text-3xl font-medium text-center">Inventory</h1>
      <Img src={inventory} className="w-60 mx-auto" alt="" />
      <h1 className="text-2xl font-medium text-center text-[#444444]">
        Vấn đề tồn kho
      </h1>
      <p className="text-center text-[#6B7280]">
        Một số sản phẩm trong giỏ hàng của bạn đã không còn hợp lệ trong quá
        trình thanh toán.
      </p>
      <p className="text-center text-green-500">
        Dưới đây là giỏ hàng hợp lệ sau khi update
      </p>

      <div class="flex-1 border p-3 rounded-md mt-10">
        <ul class="">
          {carts?.map((item) => (
            <CartItem item={item} isBtnQuantity={false} />
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Link to="/carts" className="text-blue-500"><i class="fa-solid fa-chevron-left"></i> Quay lại giỏ hàng</Link>
        <Link to="/checkouts" className="p-3 bg-[#333] rounded-md text-white">Thanh toán</Link>
      </div>
    </div>
  );
}

export default Inventory;
