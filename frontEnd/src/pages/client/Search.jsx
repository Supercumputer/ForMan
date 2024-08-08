import { useEffect, useState } from "react";
import { ProItem } from "../../components/client";
import { Spinner } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getAllProductVariants } from "../../apis/variantApi";

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;

  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    navigate(`/search?keyword=${keyword}&page=${selectedPage}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllProductVariants(
          `?search=${keyword}&limit=4&page=${page}`
        );

        if (res && res.status) {
          setTotalRecords(res.totalRecords);
          setTotalPages(res.totalPages);
          setResult(res.listProducts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [keyword, page]);

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
                <ProItem key={item._id} item={item} />
              ))}
            </div>
            <div className="flex justify-center my-10">
              <ReactPaginate
                nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center h-[400px] flex items-center justify-center">
          <Spinner aria-label="Center-aligned spinner example" color={"gray"} />
        </div>
      )}
    </div>
  );
}

export default Search;
