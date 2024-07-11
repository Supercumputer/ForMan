import React from "react";
import { InputField } from "../../components/common";
import { Button, Label, Textarea } from "flowbite-react";

function Checkout() {
  return (
    <div className="flex lg:px-[8%] px-2 my-10 gap-10 font-roboto">
      <div className="flex-1">
        <h1 className="font-semibold text-xl border-b pb-3 mb-3">
          Thông tin nhận hàng
        </h1>
        <form action="" method="post" className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-5 mb-4">
            <InputField filed={"Họ"} placeholder="Họ" />
            <InputField filed={"Tên"} placeholder="Tên" />
            <InputField filed={"Email"} placeholder="Email" />
            <InputField filed={"Số điện thoại"} placeholder="Số điện thoại" />
          </div>
          <InputField filed={"Địa chỉ"} placeholder="Địa chỉ" />
          <div className="w-full mt-4">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Ghi chú" />
            </div>
            <Textarea
              id="comment"
              placeholder="Ghi chú"
              required
              rows={4}
            />
          </div>
        </form>
      </div>
      <div className="flex-1">
        <ul class="divide-gray-200 border-b mb-5">
          <li class="flex">
            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                class="h-full w-full object-cover object-center"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">Throwback Hip Bag fdgd fdgdf dfg dg d</a>
                  </h3>
                  <p class="ml-4">$90.00</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">Salmon</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Qty 1</p>

                <div class="flex">
                  <button
                    type="button"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>

          <li class="flex py-6">
            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                class="h-full w-full object-cover object-center"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">Medium Stuff Satchel</a>
                  </h3>
                  <p class="ml-4">$32.00</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">Blue</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Qty 1</p>

                <div class="flex">
                  <button
                    type="button"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-3 pb-5 border-b mb-5">
          <input
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Voucher code"
          />

          <Button
            size="sm"
            isProcessing={false}
            gradientDuoTone="purpleToBlue"
            className="text-nowrap"
          >
            Áp dụng
          </Button>
        </div>

        <div className="flex flex-col gap-3 pb-5 border-b mb-5">
          <div className="flex justify-between">
            <span className="font-bold">Tạm tính: </span>
            <span className="text-red-500 font-bold">$160.00</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Phi ship: </span>
            <span className="text-red-500 font-bold">$10.00</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-xl">Tổng thanh toán: </span>
          <span className="text-2xl text-red-500 font-bold">$170.00</span>
        </div>

        <Button
          size="lg"
          isProcessing={false}
          gradientDuoTone="purpleToBlue"
          className="w-full mt-5 text-nowrap"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
}

export default Checkout;
