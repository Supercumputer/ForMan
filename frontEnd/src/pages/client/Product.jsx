import { Pagination } from "flowbite-react";
import {
  FilterSideBar,
  ProItem,
} from "../../components/clientComponent";
import { useState } from "react";

function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className="font-roboto w-full h-full flex lg:px-[8%] px-2 lg:my-10 my-5">
        <FilterSideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-5">
            <p className="text-[#333333] font-bold text-xl">Sơ mi ngắn tay</p>
            <div className="flex justify-between items-center">
              <div
                className="p-3 border rounded inline-block text-sm text-[#333333] items-center mt-3 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="pr-2 ">Bộ lọc</span>
                <i class="fa-solid fa-filter"></i>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-nowrap font-normal text-[15px] text-[#333333]">
                  Sắp xếp theo
                </span>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>A - Z</option>
                  <option value="US">Z-A</option>
                  <option value="CA">Giá: Giảm dần</option>
                  <option value="FR">Giá: Tăng dần</option>
                  <option value="DE">Cũ nhất</option>
                  <option value="DE">Mới nhất</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            <ProItem />
            <ProItem />
            <ProItem />
            <ProItem />
            <ProItem />
            <ProItem />
            <ProItem />
            <ProItem />
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
