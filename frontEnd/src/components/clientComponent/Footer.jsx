import React from "react";
import { Img } from "../common";

function Footer() {
  return (
    <footer className="lg:px-[8%] px-2 bg-[#F5F5F5] font-roboto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-5">
        <div className="flex flex-col">
          <h1 className="font-semibold text-[18px] mb-3">
            Thời trang nam TORANO
          </h1>
          <p className="mb-3 text-[#666666] text-sm">
            Hệ thống thời trang cho phái mạnh hàng đầu Việt Nam, hướng tới phong
            cách nam tính, lịch lãm và trẻ trung.
          </p>
          <div className="flex space-x-2 items-center mb-3">
            <div className="w-8 h-8 border rounded flex text-[#666666]">
              <i class="fa-brands fa-facebook-f m-auto"></i>
            </div>
            <div className="w-8 h-8 border rounded flex text-[#666666]">
              <i class="fa-brands fa-twitter m-auto"></i>
            </div>
            <div className="w-8 h-8 border rounded flex text-[#666666]">
              <i class="fa-brands fa-instagram m-auto"></i>
            </div>
            <div className="w-8 h-8 border rounded flex text-[#666666] ">
              <i class="fa-brands fa-tiktok m-auto"></i>
            </div>
            <div className="w-8 h-8 border rounded flex text-[#666666] ">
              <i class="fa-brands fa-youtube m-auto"></i>
            </div>
          </div>
          <p className="mb-3 text-[#666666] font-semibold">
            Phương thức thanh toán
          </p>
          <div className="flex gap-2 flex-wrap">
            <Img
              src="https://theme.hstatic.net/200000690725/1001078549/14/payment_1_img.png?v=418"
              alt=""
              className="h-10 w-14"
            />
            <Img
              src="https://theme.hstatic.net/200000690725/1001078549/14/payment_2_img.png?v=418"
              alt=""
              className="h-10 w-14"
            />
            <Img
              src="https://theme.hstatic.net/200000690725/1001078549/14/payment_3_img.png?v=418"
              alt=""
              className="h-10 w-14"
            />
            <Img
              src="https://theme.hstatic.net/200000690725/1001078549/14/payment_4_img.png?v=418"
              alt=""
              className="h-10 w-14"
            />
            <Img
              src="https://theme.hstatic.net/200000690725/1001078549/14/payment_5_img.png?v=418"
              alt=""
              className="h-10 w-14"
            />
            <Img
              src="https://theme.hstatic.net/200000690725/1001078549/14/payment_6_img.png?v=418"
              alt=""
              className="h-10 w-14"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-semibold text-[18px] mb-3">Thông tin liên hệ</h1>
          <ul className="flex flex-col space-y-3 text-sm ">
            <li>
              <b>Địa chỉ:</b>
              <span className="text-[#666666] ml-1">
                Tầng 8, tòa nhà Ford, số 313 Trường Chinh, quận Thanh Xuân, Hà
                Nội
              </span>
            </li>
            <li>
              <b>Điện thoại:</b>
              <span className="text-[#666666] ml-1">
                Tầng 8, tòa nhà Ford, số 313 Trường Chinh, quận Thanh Xuân, Hà
                Nội
              </span>
            </li>
            <li>
              <b>Fax:</b>
              <span className="text-[#666666] ml-1">
                Tầng 8, tòa nhà Ford, số 313 Trường Chinh, quận Thanh Xuân, Hà
                Nội
              </span>
            </li>
            <li>
              <b>Email:</b>
              <span className="text-[#666666] ml-1">
                Tầng 8, tòa nhà Ford, số 313 Trường Chinh, quận Thanh Xuân, Hà
                Nội
              </span>
            </li>
            <li>
              <p className="text-[#666666] font-semibold mb-3">
                Phương thức vận chuyển
              </p>
              <div className="flex gap-2 flex-wrap">
                <Img
                  src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_1_img.png?v=418"
                  alt=""
                  className="h-10 w-14"
                />
                <Img
                  src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_2_img.png?v=418"
                  alt=""
                  className="h-10 w-14"
                />
                <Img
                  src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_3_img.png?v=418"
                  alt=""
                  className="h-10 w-14"
                />
                <Img
                  src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_4_img.png?v=418"
                  alt=""
                  className="h-10 w-14"
                />
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h1 className="font-semibold text-[18px] mb-3">Nhóm liên kết</h1>
          <ul className="flex flex-col space-y-2 text-sm">
            <li className="text-[#666666]">
              <i class="fa-solid fa-angles-right"></i> Tìm kiếm
            </li>
            <li className="text-[#666666]">
              <i class="fa-solid fa-angles-right"></i> Giới thiệu
            </li>
            <li className="text-[#666666]">
              <i class="fa-solid fa-angles-right"></i> Chính sách đổi trả
            </li>
            <li className="text-[#666666]">
              <i class="fa-solid fa-angles-right"></i> Chính sách bảo mật
            </li>
            <li className="text-[#666666]">
              <i class="fa-solid fa-angles-right"></i> Tuyển dụng
            </li>
            <li className="text-[#666666]">
              <i class="fa-solid fa-angles-right"></i> Liên hệ
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h1 className="font-semibold text-[18px] mb-3">
            Vị trí cửa hàng trên bản đồ
          </h1>
          <div className="w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10043.525975809182!2d105.72816313082332!3d21.049036178595735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345459c08fbfb9%3A0x47fb207d9906f9f9!2zMzUgUC5UdSBIb8OgbmcsIFR1IEhvw6BuZywgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1719843678020!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-500">
        <p className="text-center p-3 text-[#666666]">
          Copyright © 2024 Torano. Powered by Haravan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
