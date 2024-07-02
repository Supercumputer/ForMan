import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Pagination,
  Select,
  Table,
  Breadcrumb,
  Modal,
  Label,
  Textarea,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { ButtonPro, InputField } from "../../../components/common";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  apiCreateDiscount,
  apiDeleteDiscount,
  apiDeleteDiscounts,
  apiGetAllDiscount,
  apiGetDiscount,
  apiUpdateDiscount,
} from "../../../apis/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";

const schema = z.object({
  code: z.string().min(1, { message: "Code không hợp lệ." }),
  description: z.string().min(1, { message: "Description không hợp lệ." }),
  validFrom: z.string().min(1, { message: "Ngày bắt đầu không hợp lệ." }),
  validTo: z.string().min(1, { message: "Ngày kết thúc không hợp lệ." }),
  quantity: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseInt(val, 10);
  }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
  percentage: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseInt(val, 10);
  }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
});

function ListDiscount() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const { t } = useTranslation("admin");
  const onPageChange = (page) => setCurrentPage(page);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const callApiGetAllDiscount = async (currentPage, limit, keyword) => {
    try {
      const res = await apiGetAllDiscount(currentPage, limit, keyword);

      if (res && res.status) {
        console.log(res);
        setData(res.discounts);
        setCurrentPage(res?.currentPage);
        setTotalPages(res?.totalPages);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerSubmit = async (data) => {
    try {
      const res = id
        ? await apiUpdateDiscount(data, id)
        : await apiCreateDiscount(data);

      if (res && res.status) {
        toast.success(res.message);
        handlerCloseModel();
        callApiGetAllDiscount();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerDelete = async (id) => {
    try {
      const res = await apiDeleteDiscount(id);

      if (res && res.status) {
        Swal.fire("Deleted!", res.message, "success");
        callApiGetAllDiscount();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const callApiGetDiscount = async (id) => {
    try {
      const res = await apiGetDiscount(id);

      if (res && res.status) {
        setId(id);
        setOpenModal(true);
        const formatDate = {
          ...res.discount,
          validFrom: res.discount.validFrom
            ? new Date(res.discount.validFrom).toISOString().split("T")[0]
            : "",
          validTo: res.discount.validTo
            ? new Date(res.discount.validTo).toISOString().split("T")[0]
            : "",
        };
        reset(formatDate);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerCloseModel = () => {
    reset({
      code: "",
      description: "",
      validFrom: "",
      validTo: "",
      quantity: "",
      percentage: "",
    });
    setId(null);
    setOpenModal(false);
  };

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

          const res = await apiDeleteDiscounts(dataCheck);

          if (res && res.status) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            callApiGetAllDiscount();
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
    callApiGetAllDiscount(currentPage, limit, keyword);
  }, [currentPage, limit, keyword]);

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
          <Dropdown
            label="Actions"
            dismissOnClick={false}
            renderTrigger={() => <Button color="light">Actions</Button>}
          >
            <Dropdown.Item onClick={() => setOpenModal(true)}>
              Create
            </Dropdown.Item>
            <Dropdown.Item onClick={handlerDeletes}>Delete</Dropdown.Item>
            <Dropdown.Item>Activated</Dropdown.Item>
          </Dropdown>
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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
              <Table.HeadCell className="text-nowrap">Code</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                Description
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.quantity")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">Giảm %</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.createdAt")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                Ngày hết hạn
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.status")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.actions")}
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {data.map((item, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox
                      checked={dataCheck.includes(item?._id)}
                      onChange={() => handleCheckbox(item?._id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.code}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>{item.percentage}%</Table.Cell>
                  <Table.Cell>{item.validFrom}</Table.Cell>
                  <Table.Cell>{item.validTo}</Table.Cell>
                  <Table.Cell
                    className={`${
                      item.status === "Active"
                        ? "text-green-500"
                        : item.status === "Inactive"
                        ? "text-yellow-500"
                        : item.status === "Expired"
                        ? "text-gray-500"
                        : item.status === "Used"
                        ? "text-blue-500"
                        : ""
                    } font-semibold`}
                  >
                    {item.status}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <ButtonPro
                        type={"button"}
                        dataId={item?._id}
                        actionDelete={handlerDelete}
                        name={<i class="fa-solid fa-trash"></i>}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      />

                      <ButtonPro
                        onClick={() => callApiGetDiscount(item._id)}
                        name={<i class="fa-solid fa-pen-to-square"></i>}
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
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

      <Modal show={openModal} onClose={handlerCloseModel}>
        <Modal.Header>
          {id ? "Update Discount" : "Create Discount"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handlerSubmit)} className="space-y-6">
            <InputField
              filed="Code"
              register={register("code")}
              errors={errors?.code?.message}
              placeholder="Nhập vào mã giảm giá."
            />
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <InputField
                register={register("validFrom")}
                type="date"
                filed="Ngày bắt đầu"
                errors={errors?.validFrom?.message}
              />
              <InputField
                register={register("validTo")}
                filed="Ngày hết hạn"
                type="date"
                errors={errors?.validTo?.message}
              />
              <InputField
                register={register("quantity")}
                filed="Số lượng"
                type="number"
                placeholder="Nhập vào số lượng"
                errors={errors?.quantity?.message}
              />
              <InputField
                register={register("percentage")}
                filed="Giảm %"
                type="number"
                placeholder="Nhập vào % giảm giá"
                errors={errors?.percentage?.message}
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <Textarea
                {...register("description")}
                id="comment"
                placeholder="Nhập vào mô tả"
                rows={4}
              />
              {errors?.description?.message && (
                <p className="text-red-500">{errors?.description?.message}</p>
              )}
            </div>
            <div className="w-full flex gap-3 border-t pt-5">
              <Button type="submit">Submit</Button>
              <Button color="gray" onClick={handlerCloseModel}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListDiscount;
