import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetAllProductVariant } from "../../apis/axios";
import { FilterSideBar, ProItem } from "../../components/clientComponent";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Select, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { Breadcrumb } from "../../components/common";

function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sort, setSort] = useState("latest");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchParams] = useSearchParams();
  const [categoryName, setCategoryName] = useState([]);
  const { slug: category } = useParams();

  const data = useSelector((state) => state.filter);

  const page = searchParams.get("page") || 1;

  const navigate = useNavigate();

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    const url = `?page=${selectedPage}`;
    navigate(url);
  };

  useEffect(() => {
    
    (async () => {
      try {
        setLoading(true);
        const res = await apiGetAllProductVariant(
          `?category=${category}&limit=4&minPrice=${
            data.price.minPrice
          }&maxPrice=${data.price.maxPrice}&size=${data.size.join(
            ","
          )}&color=${data.color.join(",")}&page=${page}&sort=${sort}`
        );

        if (res && res.status) {
          setCategoryName(res.categoryName);
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
  }, [data, page, sort, category]);

  return (
    <>
      <Breadcrumb categoryName={categoryName[0]?.categoryName}/>
      <div className="font-roboto w-full h-full flex mt-5 mb-10 lg:px-[8%] px-2">
        <FilterSideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-5">
            <div className="flex gap-2 items-center">
              <p className="text-[#333333] font-bold text-xl">{categoryName[0]?.categoryName}</p>
              <span>/</span>
              <div class="text-[16px]">
                <b>{totalRecords}</b> sản phẩm
              </div>
            </div>
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
                <Select
                  id="countries"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="nameAsc">A - Z</option>
                  <option value="nameDesc">Z - A</option>
                  <option value="priceDesc">Giá: Giảm dần</option>
                  <option value="priceAsc">Giá: Tăng dần</option>
                  <option value="latest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </Select>
              </div>
            </div>
          </div>

          {!loading ? (
            result.length > 0 ? (
              <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                {result.map((item) => (
                  <ProItem item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center py-[10%]">
                Không tìm thấy sản phẩm nào.
              </p>
            )
          ) : (
            <div className="flex justify-center items-center h-96">
              <Spinner
                aria-label="Center-aligned spinner example"
                color={"gray"}
                size={"lg"}
              />
            </div>
          )}

          <div className="flex justify-center mt-5">
            <ReactPaginate
              nextLabel={<i class="fa-solid fa-chevron-right"></i>}
              previousLabel={<i class="fa-solid fa-chevron-left"></i>}
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
    </>
  );
}

export default Product;
