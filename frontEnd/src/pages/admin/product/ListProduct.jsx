import { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { Filter, TableProduct } from "../../../components/admin/product";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAllProducts, softDeleteProducts } from "../../../apis/productApi";

const ListProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [dataCheck, setDataCheck] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    keyword: "",
    category: "",
    brand: "",
    createdAt: "",
  });

  const newFilter = useDebounce(filter, 1000)

  const onPageChange = (page) => setCurrentPage(page);

  const callApiGetAllProduct = async (currentPage, limit, newFilter) => {
    try {
      const res = await getAllProducts(
        `?name=${newFilter.keyword}&category=${newFilter.category}&brand=${newFilter.brand}&createdAt=${newFilter.createdAt}&status=${newFilter.status}&limit=${limit}&page=${currentPage}&sort=latest`);

      if (res && res.status) {
        setTotalPages(res.totalPages);
        setData(res.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlerDeletes = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (dataCheck.length === 0) {
            toast.error("Please select user to delete");
            return;
          }

          const res = await softDeleteProducts(dataCheck);

          if (res && res.status) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            callApiGetAllProduct(currentPage, limit);
          } else {
            toast.error(res?.message);
          }
        } catch (error) {
          toast.error(error);
        }
      }
    });
  };

  useEffect(() => {
    callApiGetAllProduct(currentPage, limit, newFilter);
  }, [currentPage, limit, newFilter]);

  return (
    <>

      <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">

        <Filter handlerDeletes={handlerDeletes} setFilter={setFilter} filter={filter} data={data} />

        <TableProduct
          data={data}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
          currentPage={currentPage}
          onPageChange={onPageChange}
          setDataCheck={setDataCheck}
          dataCheck={dataCheck}
          callApiGetAllProduct={() => callApiGetAllProduct(currentPage, limit, newFilter)}
        />

      </div>
    </>
  );
};

export default ListProduct;
