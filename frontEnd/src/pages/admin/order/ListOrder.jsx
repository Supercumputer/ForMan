import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Pagination,
  Select,
  Table,
  Breadcrumb,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";
import { ButtonPro } from "../../../components/common";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { apiDeleteSoftOrder, apiDeleteSoftsOrder, apiGetAllOrders, apiUpdateOrder } from "../../../apis/axios";
import { formatDate, formatNumber } from "../../../utils/helper";
import { toast } from "react-toastify";

function ListOrder() {

  const { t } = useTranslation("admin");
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [dataCheck, setDataCheck] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckbox = (id) => {
    setDataCheck((prev) => {
      if (prev.includes(id)) {
        setCheckAll(false);
        return prev.filter((item) => item !== id);
      } else {
        const newDataCheck = [...prev, id];

        if (newDataCheck.length === data.length) {
          setCheckAll(true);
        }

        return newDataCheck;
      }
    });
  };

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setDataCheck(data.map((item) => item._id));
    } else {
      setDataCheck([]);
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

          const res = await apiDeleteSoftsOrder(dataCheck);

          if (res && res.status) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            callApiGetAllOrders(currentPage, limit);
          } else {
            toast.error(res?.message);
          }
        } catch (error) {
          toast.error(error);
        }
      }
    });
  };

  const handlerDelete = async (id) => {
    try {
      const res = await apiDeleteSoftOrder(id);

      if (res && res.status) {
        Swal.fire("Deleted!", res.message, "success");
        callApiGetAllOrders(currentPage, limit);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerUpdateStatus = async (id, status) => {
    try {
      const res = await apiUpdateOrder(id, { status: status })

      if (res && res.status) {
        callApiGetAllOrders(currentPage, limit);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const callApiGetAllOrders = async (currentPage, limit) => {
    try {
      const res = await apiGetAllOrders(currentPage, limit)

      if (res && res.status) {
        console.log(res);
        setData(res.orders);
        setCurrentPage(res?.currentPage);
        setTotalPages(res?.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiGetAllOrders(currentPage, limit)
  }, [currentPage, limit]);

  return (
    <>
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            Accounts
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="rounded-md p-2 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Dropdown
              label="Actions"
              dismissOnClick={false}
              renderTrigger={() => <Button color="light">Actions</Button>}
            >
              <Dropdown.Item>
                <Link to={`${pathAdmin.category}/create`}>Create</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={handlerDeletes}>Delete</Dropdown.Item>
              <Dropdown.Item>Activated</Dropdown.Item>
            </Dropdown>
            <Link to={pathAdmin.ordersTrash} className="text-blue-500 underline">Thùng rác</Link>

          </div>

          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <div className="overflow-x-auto border-y border-[#ccc] py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox checked={checkAll} onChange={handleCheckAll} />
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.orderId")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.createdAt")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.discountCode")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.totalPrice")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.payments")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.status")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.actions")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.map((item) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox checked={dataCheck.includes(item?._id)}
                      onChange={() => handleCheckbox(item?._id)} />
                  </Table.Cell>
                  <Table.Cell>{item?._id}</Table.Cell>
                  <Table.Cell>{formatDate(item?.createdAt)}</Table.Cell>
                  <Table.Cell>{item?.discount || "Không có"}</Table.Cell>
                  <Table.Cell>{formatNumber(+item?.total_payment)}</Table.Cell>
                  <Table.Cell>{item?.delivery}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      label=""
                      dismissOnClick={true}
                      renderTrigger={() => (
                        <span className={`text-[#fff] p-1 ${item?.status === "Pending" ? "bg-[#f1c40f]" :
                          item?.status === "Confirmed" ? "bg-[#3498db]" :
                            item?.status === "Preparing" ? "bg-[#e67e22]" :
                              item?.status === "Shipping" ? "bg-[#9b59b6]" :
                                item?.status === "Delivered" ? "bg-[#2ecc71]" :
                                  item?.status === "Cancelled" ? "bg-[#e74c3c]" :
                                    item?.status === "Completed" ? "bg-[#1abc9c]" :
                                      item?.status === "Failure" ? "bg-[#95a5a6]" : ""} 
                          rounded-lg cursor-pointer text-nowrap`}>
                          {item?.status}
                        </span>
                      )}
                    >
                      {(item?.status !== "Failure" && item?.status !== "Completed") &&
                        <>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Pending")}>Pending</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Confirmed")}>Confirmed</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Preparing")}>Preparing</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Shipping")}>Shipping</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Delivered")}>Delivered</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Cancelled")}>Cancelled</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Completed")}>Completed</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlerUpdateStatus(item._id, "Failure")}>Failure</Dropdown.Item>
                        </>}
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <ButtonPro
                        type="button"
                        name={<i class="fa-solid fa-trash"></i>}
                        dataId={item?._id}
                        actionDelete={handlerDelete}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      />

                      <ButtonPro
                        to={`${pathAdmin.orders}/detail/${item?._id}`}
                        name={<i class="fa-solid fa-eye"></i>}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}

            </Table.Body>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="max-w-md">
            <Select
              onChange={(e) => setLimit(Number(e.target.value))}
              value={limit}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </Select>
          </div>
          <div className="flex overflow-x-auto sm:justify-center">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListOrder;
