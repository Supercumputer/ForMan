import {
  SlideBanner,
  SlideBrand,
  SlideProduct,
} from "../../components/clientComponent/Slide";

import { ProItem, SectionHeader } from "../../components/clientComponent";
import { Img } from "../../components/common";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetAllBrand, apiGetAllProductVariant } from "../../apis/axios";

const slides = [
  "https://4menshop.com/images/thumbs/slides/slide-2-trang-chu-slide-2.png?t=1716575843",
  "https://theme.hstatic.net/200000690725/1001078549/14/slide_4_img.jpg?v=422",
  "https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=418",
];

function Home() {
  const [productNews, setProductNews] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    (async () => {
      await Promise.all([
        apiGetAllProductVariant("?limit=8&category=hang-moi-ve"),
        apiGetAllBrand(),
      ])
        .then(([listProNew, listBrand]) => {
          setProductNews(listProNew.listProducts);
          setBrands(listBrand.brands);
        })
        .catch()
        .finally();
    })();
  }, []);
 
  return (
    <>
      <div className="">
        <SlideBanner data={slides} />

        <div className="lg:px-[8%] px-2">
          <SectionHeader title={"THỜI TRANG HOT NHẤT"} />
          <SlideProduct data={productNews} />
          <SectionHeader title={"SẢN PHẨM MỚI NHẤT"} />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {productNews.map((item) => (
              <ProItem item={item} />
            ))}
          </div>
          <SectionHeader title={"SẢN PHẨM MỚI NHẤT"} />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {productNews.map((item) => (
              <ProItem item={item} />
            ))}
          </div>
          <SectionHeader title={"THƯƠNG HIỆU ĐỒNG HÀNH"} />

          <SlideBrand data={brands} />

          <SectionHeader title={"TIN TỨC"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="#" class="flex flex-col border-gray-200 rounded-lg">
              <div className="lg:h-40 w-full overflow-hidden">
                <img
                  class="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
                  src="https://i.ytimg.com/vi/xWopu7e2V1I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhsIBMofzAP&rs=AOn4CLANh56-m6lsWAEaGFhNq-1r63IdNQ"
                  alt=""
                />
              </div>
              <div class="flex flex-col my-2">
                <h1 class="text-[#333333] font-semibold mb-1 line-clamp-2">
                  Noteworthy technology acquisitions 2021
                </h1>
                <div class="flex justify-between text-[#333333] text-sm">
                  <span>20/10/2021</span>
                  <div className="flex gap-3">
                    <span>
                      200 <i class="fa-regular fa-eye"></i>
                    </span>
                    <span>
                      200 <i class="fa-regular fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="#" class="flex flex-col border-gray-200 rounded-lg">
              <div className="lg:h-40 w-full overflow-hidden">
                <img
                  class="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
                  src="https://i.ytimg.com/vi/xWopu7e2V1I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhsIBMofzAP&rs=AOn4CLANh56-m6lsWAEaGFhNq-1r63IdNQ"
                  alt=""
                />
              </div>
              <div class="flex flex-col my-2">
                <h1 class="text-[#333333] font-semibold mb-1 line-clamp-2">
                  Noteworthy technology acquisitions 2021
                </h1>
                <div class="flex justify-between text-[#333333] text-sm">
                  <span>20/10/2021</span>
                  <div className="flex gap-3">
                    <span>
                      200 <i class="fa-regular fa-eye"></i>
                    </span>
                    <span>
                      200 <i class="fa-regular fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="#" class="flex flex-col border-gray-200 rounded-lg">
              <div className="lg:h-40 w-full overflow-hidden">
                <img
                  class="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
                  src="https://i.ytimg.com/vi/xWopu7e2V1I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhsIBMofzAP&rs=AOn4CLANh56-m6lsWAEaGFhNq-1r63IdNQ"
                  alt=""
                />
              </div>
              <div class="flex flex-col my-2">
                <h1 class="text-[#333333] font-semibold mb-1 line-clamp-2">
                  Noteworthy technology acquisitions 2021
                </h1>
                <div class="flex justify-between text-[#333333] text-sm">
                  <span>20/10/2021</span>
                  <div className="flex gap-3">
                    <span>
                      200 <i class="fa-regular fa-eye"></i>
                    </span>
                    <span>
                      200 <i class="fa-regular fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="#" class="flex flex-col border-gray-200 rounded-lg">
              <div className="lg:h-40 w-full overflow-hidden">
                <img
                  class="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
                  src="https://i.ytimg.com/vi/xWopu7e2V1I/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhsIBMofzAP&rs=AOn4CLANh56-m6lsWAEaGFhNq-1r63IdNQ"
                  alt=""
                />
              </div>
              <div class="flex flex-col my-2">
                <h1 class="text-[#333333] font-semibold mb-1 line-clamp-2">
                  Noteworthy technology acquisitions 2021
                </h1>
                <div class="flex justify-between text-[#333333] text-sm">
                  <span>20/10/2021</span>
                  <div className="flex gap-3">
                    <span>
                      200 <i class="fa-regular fa-eye"></i>
                    </span>
                    <span>
                      200 <i class="fa-regular fa-heart"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 md:py-10 py-3 border-t mt-10">
            <div className="flex gap-4">
              <Img
                src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_1.png?v=418"
                className="w-12 h-12"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-[#333333] font-semibold">
                  Miễn phí vận chuyển
                </h1>
                <p className="text-[#333333]">
                  Áp dụng cho mọi đơn hàng từ 500k
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Img
                src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_2.png?v=418"
                className="w-12 h-12"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-[#333333] font-semibold">
                  Miễn phí vận chuyển
                </h1>
                <p className="text-[#333333]">
                  Áp dụng cho mọi đơn hàng từ 500k
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Img
                src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_3.png?v=418"
                className="w-12 h-12"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-[#333333] font-semibold">
                  Miễn phí vận chuyển
                </h1>
                <p className="text-[#333333]">
                  Áp dụng cho mọi đơn hàng từ 500k
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Img
                src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_4.png?v=418"
                className="w-12 h-12"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-[#333333] font-semibold">
                  Miễn phí vận chuyển
                </h1>
                <p className="text-[#333333]">
                  Áp dụng cho mọi đơn hàng từ 500k
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
