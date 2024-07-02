import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import {
  Checkbox,
  Table,
  Button,
  Dropdown,
  Breadcrumb,
  Pagination,
  Select,
} from "flowbite-react";
import { ButtonPro, Img } from "../../../components/common";
import { pathAdmin } from "../../../utils/path";
import { toast } from "react-toastify";
import { apiDeleteVariant, apiGetAllVariantById, apiSoftDeleteVariants } from "../../../apis/axios";
import Swal from "sweetalert2";

const ListVariant = () => {
  const [data, setData] = useState([]);
  const [dataCheck, setDataCheck] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const { t } = useTranslation("admin");

  const { id } = useParams();

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

  const callApiGetAllVariant = async () => {
    try {
      const res = await apiGetAllVariantById(id);

      if (res && res.status) {
        setData(res.products);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerDelete = async (id) => {
    try {
      const res = await apiDeleteVariant(id);

      if (res && res.status) {
        Swal.fire("Deleted!", res.message, "success");
        callApiGetAllVariant();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error);
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

          const res = await apiSoftDeleteVariants(dataCheck);

          if (res && res.status) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            callApiGetAllVariant();
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
    callApiGetAllVariant();
  }, []);

  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example " className="mb-4">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Inventory</Breadcrumb.Item>
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
      </Breadcrumb>
      <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
          <Dropdown
            label="Actions"
            dismissOnClick={false}
            renderTrigger={() => (
              <Button color="light">{t("fields.actions")}</Button>
            )}
          >
            <Dropdown.Item>
              <Link to={`${pathAdmin.products}/${id}/variants/create`}>
                Create
              </Link>
            </Dropdown.Item>

            <Dropdown.Item onClick={handlerDeletes}>Delete</Dropdown.Item>
            <Dropdown.Item>Update</Dropdown.Item>
          </Dropdown>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-products"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for products"
            />
          </div>
        </div>
        <div className="overflow-x-auto border-t border-[#ccc] py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox checked={checkAll} onChange={handleCheckAll} />
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.variantId")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.image")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.color")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.size")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.discount")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.quantity")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.price")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.actions")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.length > 0 ? (
                data?.map((item) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-4">
                      <Checkbox
                        checked={dataCheck.includes(item?._id)}
                        onChange={() => handleCheckbox(item?._id)}
                      />
                    </Table.Cell>
                    <Table.Cell>{item.mbt}</Table.Cell>
                    <Table.Cell className="flex flex-wrap gap-2 min-w-64">
                      {item.images.map((img) => (
                        <Img
                          src={img}
                          className="object-cover w-14 h-14 rounded-md border "
                        />
                      ))}
                    </Table.Cell>
                    <Table.Cell>{item.color}</Table.Cell>
                    <Table.Cell>{item.size}</Table.Cell>
                    <Table.Cell>{item.sale}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <ButtonPro
                          type="button"
                          dataId={item?._id}
                          actionDelete={handlerDelete}
                          name={<i className="fa-solid fa-trash"></i>}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        />

                        <ButtonPro
                          to={`${pathAdmin.products}/variants/${item?._id}/edit`}
                          name={<i className="fa-solid fa-pen-to-square"></i>}
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
                        />
                        <ButtonPro
                          to={`${pathAdmin.products}/${id}/variants/${item?._id}/comments`}
                          name={<i className="fa-solid fa-eye"></i>}
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                    colSpan={9}
                  >
                    Chưa có biến thể nào.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListVariant;
