import React, { useEffect, useState } from "react";
import { ProItem } from "../../components/clientComponent";
import { Pagination, Spinner } from "flowbite-react";
import { apiGetAllProductVariant } from "../../apis/axios";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
 
  const [result, setResult] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const onPageChange = (page) => setCurrentPage(page);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiGetAllProductVariant(`?search=${keyword}&limit=8`);

        if (res && res.status) {
          setTotalRecords(res.totalRecords);
          setResult(res.listProducts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [keyword]);

  return (
    <div className="lg:px-[8%] px-2">
      {!loading ? (
        <div>
          <div className="font-roboto text-[#333333] flex flex-col gap-3 items-center mt-5 mb-10">
            <h1 className="font-bold text-3xl">Tìm kiếm</h1>
            <p>
              Có <strong>{totalRecords} sản phẩm</strong> cho tìm kiếm
            </p>
            <div className="w-20 h-1 bg-[#333333]"></div>
          </div>

          <div className="mb-5">
            <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {result.map((item) => (
                <ProItem item={item} />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
    </div>
  );
}

export default Search;
