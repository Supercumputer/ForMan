import { noCart } from "../../assets/images";
import { BtnCheckout, CartItem } from "../../components/clientComponent";
import { Breadcrumb, Img } from "../../components/common";
import React, { useMemo } from "react";
import { calculateSalePrice, formatNumber } from "../../utils/helper";
import { useSelector } from "react-redux";


function Cart() {
  const { carts } = useSelector((state) => state.cart);

  const total = useMemo(() => {
    return carts.reduce((acc, item) => {
      return (
        acc +
        (calculateSalePrice(item.variant_id.price, item.variant_id.sale) ||
          item.variant_id.price) *
        item.quantity
      );
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  return (
    <>
      <Breadcrumb className="lg:px-[8%] px-2 bg-gray-50 py-3 dark:bg-gray-800" />

      <div className="lg:px-[8%] px-2">
        <div className="flex flex-col lg:flex-row font-roboto mb-3">
          <div className="flex-1">

            <div className="flex lg:flex-row flex-col items-center justify-between py-3 border-b">
              <h1 className="text-2xl font-semibold">Giỏ hàng của bạn</h1>
              <p>
                Bạn đang có<strong> {carts.length} sản phẩm </strong>trong giỏ hàng
              </p>
            </div>

            <div class="flex-1 border p-3 rounded-md mt-3">
              <ul class="">
                {carts.length > 0 ? (
                  carts?.map((item) => (
                    <CartItem item={item} isBtnQuantity={true} sizeBtnQuantity="md" />
                  ))
                ) : (
                  <Img
                    src={noCart}
                    className="w-56 m-auto"
                  />
                )}
              </ul>
            </div>
          </div>

          <div className="lg:w-96 w-full pl-0 lg:pl-5">
            <div className="flex-1 border p-3 rounded-md mt-3">
              <h1 className="py-3 border-b text-xl font-medium">Thông tin đơn hàng</h1>

              <div className="flex justify-between py-5 items-center border-b">
                <span className="font-semibold">Tổng tiền:</span>
                <span className="font-semibold text-red-500 text-2xl">{formatNumber(total)} đ</span>
              </div>

              <ul className="list-disc px-4 py-5">
                <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
              </ul>

              <BtnCheckout />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
