import { Breadcrumb, Button, Rating } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { BtnVariant, SectionHeader } from "../../components/clientComponent";
import {
  SlideImgPro,
  SlideProduct,
} from "../../components/clientComponent/Slide";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Img } from "../../components/common";

function ProductDetail() {
  const [Quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(1);

  return (
    <div className="lg:px-[8%] px-2 my-5 font-roboto">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item to={""} icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item to={""}>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex mt-3 flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[500px] md:pr-3 mb-3 md:mb-0">
          <SlideImgPro />
        </div>
        <div className="flex-1 flex flex-col gap-5 md:pl-3">
          <div>
            <h1 className="text-2xl font-bold text-[#333333] mb-1">
              Áo phông Wey in nổi chất cotton su form rộng túi zip form rộng túi
              zip
            </h1>
            <div className="flex items-center text-[#ACB2B0]">
              <span>
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </span>
              <span className="px-3 border-l border-r mx-3">36 Đánh giá</span>
              <span>25.5k Đã bán</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#FAFAFA] p-4 rounded">
            <s className="text-[#ACB2B0]">₫58.000</s>
            <span className="font-bold text-[#ACB2B0] text-xl"> - </span>
            <span className="font-bold text-[#E70505] text-2xl">₫49.000</span>
            <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              - 10%
            </span>
          </div>

          <div className="flex items-center">
            <p className="font-semibold text-sm text-[#333333] min-w-28">
              Color:
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <BtnVariant title={"Vàng"} />
              <BtnVariant title={"Đen nhạt"} />
              <BtnVariant title={"Xanh ngọc"} />
              <BtnVariant title={"Trắng"} />
            </div>
          </div>

          <div className="flex items-center">
            <p className="font-semibold text-sm text-[#333333] min-w-28">
              Size:
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <BtnVariant title={"S"} />
              <BtnVariant title={"M"} />
              <BtnVariant title={"L"} />
              <BtnVariant title={"XL"} />
              <BtnVariant title={"XXL"} />
            </div>
          </div>

          <div className="flex items-center">
            <p className="font-semibold text-sm text-[#333333] min-w-28">
              Quantity:
            </p>
            <div className="flex items-center">
              <span className="py-2 px-3 border">
                <i class="fa-solid fa-plus"></i>
              </span>
              <span className="py-2 px-3 border min-w-20 text-center">
                {Quantity}
              </span>
              <span className="py-2 px-3 border">
                <i class="fa-solid fa-minus"></i>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-semibold">
            <div
              className="border min-w-44 p-4 text-center flex items-center justify-center gap-2 cursor-pointer rounded text-[#E70505] transition duration-500 hover:text-[#fff] border-[#E70505] relative 
            before:content-[''] before:absolute before:bg-[#E70505] before:h-full before:w-0 before:z-0 before:left-0 before:hover:w-full before:transition-all before:duration-500"
            >
              <i class="fa-solid fa-cart-plus relative z-10"></i>
              <span className="relative z-10">Add To Cart</span>
            </div>

            <div className="min-w-44 p-4 text-center items-center gap-2 rounded text-[#fff] bg-[#E70505] cursor-pointer">
              <span>MUA NGAY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <SectionHeader
          title={
            <ul class="flex text-sm font-medium text-center items-center ">
              <li class="me-2">
                <button
                  class={`inline-block p-4 rounded-t-lg ${
                    tab === 2 && "font-bold text-xl"
                  }`}
                  onClick={() => setTab(2)}
                >
                  ĐÁNH GIÁ SẢN PHẨM
                </button>
              </li>

              <li class="me-2">
                <button
                  class={`inline-block p-4 rounded-t-lg ${
                    tab === 1 && "font-bold text-xl"
                  }`}
                  onClick={() => setTab(1)}
                >
                  THÔNG TIN SẢN PHẨM
                </button>
              </li>

              <li class="me-2">
                <button
                  class={`inline-block p-4 rounded-t-lg ${
                    tab === 3 && "font-bold text-xl"
                  }`}
                  onClick={() => setTab(3)}
                >
                  CHÍNH SÁCH ĐỔI TRẢ
                </button>
              </li>
            </ul>
          }
        />
        {tab === 1 && (
          <div class="product-description my-5">
            <h2 class="text-2xl font-bold text-gray-800">
              Áo Khoác Dạ Nam Hiddle
            </h2>
            <p class="mt-3 text-gray-700">
              Mùa đông đang đến gần, bạn đang tìm kiếm một chiếc áo khoác dạ vừa
              ấm áp, vừa thời trang để giữ ấm cho mình? Vậy thì áo khoác dạ nam
              Hiddle chính là lựa chọn hoàn hảo dành cho bạn. Áo khoác dạ nam
              cao cấp không chỉ mang lại cảm giác ấm áp, thời trang mà còn tạo
              nên vẻ bề ngoài sang trọng.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mt-4">
              Áo khoác dạ nam cao cấp HIDDLE có gì khác biệt so với các thiết kế
              áo dạ khác?
            </h3>
            <p class="mt-2 text-gray-700">
              Thiết kế áo khoác dạ nam cao cấp HIDDLE được thiết kế theo phong
              cách lịch lãm và thời thượng, với kiểu dáng suông dài dễ dàng che
              bụng. Áo có 2 màu be và xám để anh em có thêm lựa chọn về màu sắc.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mt-4">
              Những chi tiết khác của áo khoác dạ nam cao cấp chính hãng HIDDLE
            </h3>
            <p class="mt-2 text-gray-700">
              Bảng size áo khoác dạ nam cao cấp hàng hiệu HIDDLE:
              <ul class="list-disc list-inside mt-2">
                <li>Áo khoác dạ nam cao cấp Hiddle khuy cài H13-AK4</li>
              </ul>
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mt-4">
              Chất liệu vải được HIDDLE trau chuốt kĩ lưỡng
            </h3>
            <p class="mt-2 text-gray-700">
              Áo khoác HIDDLE được tạo nên từ 2 chất liệu khác nhau. Bên ngoài
              được may từ chất liệu dạ ép cao cấp, có khả năng giữ ấm tốt, giúp
              bạn luôn ấm áp trong những ngày đông lạnh giá. Chất liệu dạ ép
              cũng rất mềm mại, mịn màng, tạo cảm giác thoải mái khi mặc.
              <br />
              Lớp lót trong sử dụng vải dù thoáng khí, mềm mịn cho người mặc
              thoải mái hoạt động trong mọi điều kiện thời tiết của mùa đông.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mt-4">
              Mang lại sự trải nghiệm tốt nhất cho khách hàng khi sử dụng sản
              phẩm
            </h3>
            <p class="mt-2 text-gray-700">
              Phụ liệu chắc chắn có độ bền cao:
              <br />
              Không chỉ chú trọng trong thiết kế, đội ngũ sản xuất của Hiddle
              còn tập trung tìm kiếm và sử dụng các phụ liệu chắc chắn có độ bền
              cao vào sản xuất áo khoác.
              <br />
              Thiết kế logo thương hiệu bằng inox ngay ngực trái tạo điểm nhấn
              giúp bật lên sự nam tính cuốn hút trong từng khoảnh khắc khi khoác
              áo lên.
              <br />
              Khuy áo giúp giữ áo được cố định và không bị bung ra, giúp người
              mặc cảm thấy thoải mái và tự tin hơn. Khuy áo màu nâu với áo be,
              màu đen với áo xám tạo nên sự hài hòa về màu sắc.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mt-4">
              Đem các giải pháp vào thiết kế
            </h3>
            <p class="mt-2 text-gray-700">
              Túi trong giúp bạn cất giữ đồ đạc nhỏ gọn, tiện lợi. Hai túi ngoài
              giúp bạn đựng đồ dùng cá nhân cần thiết.
              <br />
              Hai nắp túi giả ở ngực áo giúp áo thêm phần sang trọng, thời
              thượng hơn.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mt-4">
              Hàng chính hãng
            </h3>
            <p class="mt-2 text-gray-700">
              Để xác nhận hàng chính hãng, Hiddle tự tay thiết kế và sản xuất đã
              may nhãn da logo thương hiệu ở mặt sau áo.
              <br />
              Áo khoác dạ nam cao cấp Hiddle khuy cài H13-AK4
            </p>
          </div>
        )}
        {tab === 2 && (
          <div className="px-10">
            <div className="flex md:flex-row flex-col items-center gap-10 border-b pb-5">
              <div class="flex flex-col items-center mb-2">
                <span className="text-6xl font-bold p-10">5.0</span>
                <Rating size="lg">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
              <div className="flex flex-col w-full">
                <div class="flex items-center mt-4">
                  <Link
                    to={""}
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-nowrap"
                  >
                    5 star
                  </Link>
                  <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      class="h-5 bg-yellow-300 rounded"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    70%
                  </span>
                </div>
                <div class="flex items-center mt-4">
                  <Link
                    to={""}
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-nowrap"
                  >
                    4 star
                  </Link>
                  <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      class="h-5 bg-yellow-300 rounded"
                      style={{ width: "17%" }}
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    17%
                  </span>
                </div>
                <div class="flex items-center mt-4">
                  <Link
                    to={""}
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-nowrap"
                  >
                    3 star
                  </Link>
                  <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      class="h-5 bg-yellow-300 rounded"
                      style={{ width: "8%" }}
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    8%
                  </span>
                </div>
                <div class="flex items-center mt-4">
                  <Link
                    to={""}
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-nowrap"
                  >
                    2 star
                  </Link>
                  <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      class="h-5 bg-yellow-300 rounded"
                      style={{ width: "4%" }}
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    4%
                  </span>
                </div>
                <div class="flex items-center mt-4">
                  <Link
                    to={""}
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-nowrap"
                  >
                    1 star
                  </Link>
                  <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      class="h-5 bg-yellow-300 rounded"
                      style={{ width: "1%" }}
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    1%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-3">
              <Img
                src={""}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="font-bold text-lg">Quang cover</h2>
                <Rating size="sm">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <span className="text-gray-500">20/10/2021</span>
                <p>
                  Sản phẩm rất tốt, Shop tư vấn tận tình, nên mua nha mọi người,
                  bảo vệ hạ bộ khi thi đấu.
                </p>
              </div>
            </div>
            <div className="flex gap-5 mt-3">
              <Img
                src={""}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="font-bold text-lg">Quang cover</h2>
                <Rating size="sm">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <span className="text-gray-500">20/10/2021</span>
                <p>
                  Sản phẩm rất tốt, Shop tư vấn tận tình, nên mua nha mọi người,
                  bảo vệ hạ bộ khi thi đấu.
                </p>
              </div>
            </div>
            <div className="flex gap-5 mt-3">
              <Img
                src={""}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="font-bold text-lg">Quang cover</h2>
                <Rating size="sm">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
                <span className="text-gray-500">20/10/2021</span>
                <p>
                  Sản phẩm rất tốt, Shop tư vấn tận tình, nên mua nha mọi người,
                  bảo vệ hạ bộ khi thi đấu.
                </p>
              </div>
            </div>
          </div>
        )}
        {tab === 3 && (
          <div
            id="alert-additional-content-5"
            class="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
            role="alert"
          >
            <div class="flex items-center">
              <svg
                class="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <h3 class="text-lg font-medium text-gray-800 dark:text-gray-300">
                This is a dark alert
              </h3>
            </div>
            <div class="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
              More info about this info dark goes here. This example text is
              going to run a bit longer so that you can see how spacing within
              an alert works with this kind of content.
            </div>
            <div class="flex">
              <button
                type="button"
                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800"
              >
                <svg
                  class="me-2 h-3 w-3 dark:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                View more
              </button>
              <button
                type="button"
                class="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white"
                data-dismiss-target="#alert-additional-content-5"
                aria-label="Close"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="">
        <SectionHeader title={"SẢN PHẨM CÙNG DANH MỤC"} />
        <SlideProduct />
      </div>
    </div>
  );
}

export default ProductDetail;
