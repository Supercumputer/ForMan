import React, { useState } from "react";
import { ButtonPro, Img, InputField } from "../../components/common";
import { Button } from "flowbite-react";

function Account() {
  const [active, setActive] = useState(1);
  return (
    <div className="flex lg:px-[8%] px-2 my-10 gap-10">
      <div className="flex flex-col gap-1 w-80">
        <ButtonPro
          name={
            <div className="flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-user"> </i>
              <span>Thông tin cá nhân</span>
            </div>
          }
          to={"/login"}
          className={`p-3 ${
            active === 1 && "bg-[#f5f5f5]"
          } rounded-md hover:bg-[#f5f5f5]`}
        />
        <ButtonPro
          name={
            <div className="flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span>Lịch sử đơn hàng</span>
            </div>
          }
          to={"/login"}
          className={`p-3 ${
            active === 2 && "bg-[#f5f5f5]"
          } rounded-md hover:bg-[#f5f5f5]`}
        />

        <ButtonPro
          name={
            <div className="flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-key"></i>
              <span>Đặt lại mật khẩu</span>
            </div>
          }
          to={"/login"}
          className={`p-3 ${
            active === 4 && "bg-[#f5f5f5]"
          } rounded-md hover:bg-[#f5f5f5]`}
        />
        <ButtonPro
          name={
            <div className="flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Đăng xuất</span>
            </div>
          }
          to={"/login"}
          className={`p-3 ${
            active === 5 && "bg-[#f5f5f5]"
          } rounded-md hover:bg-[#f5f5f5]`}
        />
      </div>
      <div className="flex-1">
        <h1 className="font-semibold text-xl mb-5">Thông tin cá nhân</h1>

        <div className="flex items-center gap-10">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold">
              <span className="min-w-[150px]">Họ: </span>
              <InputField />
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="min-w-[150px]">Tên: </span>
              <InputField />
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="min-w-[150px]">Email: </span>
              <InputField />
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="min-w-[150px]">Số điện thoại: </span>
              <InputField />
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="min-w-[150px]">Địa chỉ: </span>
              <InputField />
            </div>
          </div>
          <div className="w-36">
            <Img src={"https://via.placeholder.com/300x300"} alt="avatar" />
            <p className="flex justify-center">Avatar</p>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Button size="sm" isProcessing={false} gradientDuoTone="purpleToBlue">
            Save change
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
