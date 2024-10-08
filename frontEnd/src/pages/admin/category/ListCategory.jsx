import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import {
  Checkbox,
  Table,
  Button,
  Dropdown,
  Breadcrumb,
  Modal,
  Textarea,
  Label,
} from "flowbite-react";
import { ButtonPro, Img, InputField } from "../../../components/common";
import pathAdmin from "../../../utils/pathAdmin";

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { formatDate } from "../../../utils/helper";
import categorySchema from "../../../schema/categorySchema";
import { deleteCategories, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../../../apis/categoryApi";

function ListCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const { t } = useTranslation("admin");
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const previewImage = (event) => {
    let file = event.target.files[0];

    file.previewImage = URL.createObjectURL(file);

    setPreview(file);
  };

  const callApiGetAllCategory = async () => {
    try {
      const res = await getAllCategories();
      if (res && res.status) {
        setCategories(res.categories);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const callApiGetCategory = async (id) => {
    try {
      const res = await getCategoryById(id);

      if (res && res.status) {
        setId(id);
        setOpenModal(true);
        setPreview(res.category.image);
        const formatData = {
          ...res.category,
          parentId: res.category.parentId || "",
        };
        reset(formatData);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      for (const key in data) {
        if (key === "image") {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const res = await updateCategory(formData, id);

      if (res && res.status) {
        toast.success(res.message);
        setOpenModal(false);
        callApiGetAllCategory();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerDelete = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res && res.status) {
        toast.success(res.message);
        callApiGetAllCategory();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id) => {
    setDataCheck((prev) => {
      if (prev.includes(id)) {
        setCheckAll(false);
        return prev.filter((item) => item !== id);
      } else {
        const newDataCheck = [...prev, id];

        if (newDataCheck.length === categories.length) {
          setCheckAll(true);
        }

        return newDataCheck;
      }
    });
  };

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setDataCheck(categories.map((item) => item._id));
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

          const res = await deleteCategories(dataCheck);

          if (res && res.status) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            callApiGetAllCategory();
          } else {
            toast.error(res?.message);
          }
        } catch (error) {
          toast.error(error);
        }
      }
    });
  };

  const filterCategory = useCallback(
    (id) => {
      return categories.filter(
        (item) => item.parentId?._id !== id && item._id !== id
      );
    },
    [id]
  );

  useEffect(() => {
    callApiGetAllCategory();
  }, []);

  return (
    <div>
      <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Accounts
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
      </Breadcrumb>

      <div className=" rounded-md p-2 bg-[#fff] dark:bg-slate-800">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
          <Dropdown
            label="Actions"
            dismissOnClick={false}
            renderTrigger={() => (
              <Button color="light">{t("fields.actions")}</Button>
            )}
          >
            <Dropdown.Item>
              <Link to={`${pathAdmin.categoryCreate}`}>Create</Link>
            </Dropdown.Item>

            <Dropdown.Item onClick={handlerDeletes}>Delete</Dropdown.Item>
            <Dropdown.Item>Activated</Dropdown.Item>
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
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <div className="overflow-x-auto border-t border-[#ccc] py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox checked={checkAll} onChange={handleCheckAll} />
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">Stt</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.categoryName")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.image")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.description")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                Parent Category
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.createdAt")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.status")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.actions")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="p-4">
                      <Checkbox
                        checked={dataCheck.includes(item?._id)}
                        onChange={() => handleCheckbox(item?._id)}
                      />
                    </Table.Cell>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.categoryName}</Table.Cell>
                    <Table.Cell>
                      <Img
                        src={item.image}
                        className="object-cover w-20 h-20 rounded-md"
                      />
                    </Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                    <Table.Cell>
                      {item.parentId?.categoryName ?? "Null"}
                    </Table.Cell>
                    <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={`${item.status === "Presently"
                          ? "text-green-500"
                          : "text-red-500"
                          } font-semibold`}
                      >
                        {item.status}
                      </span>
                    </Table.Cell>
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
                          onClick={() => callApiGetCategory(item._id)}
                          name={<i className="fa-solid fa-pen-to-square"></i>}
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
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
                    Chưa có danh mục nào.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700 mb-3">
          <h3 className="px-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit category
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handlerSubmit)} className="space-y-5">
            <InputField
              filed={t("fields.categoryName")}
              placeholder="Category name"
              register={register("categoryName")}
              errors={errors.categoryName?.message}
            />
            <div className="">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Danh mục cha
              </label>
              <select
                id="countries"
                {...register("parentId")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>Chon danh mục cha</option>
                {filterCategory(id).map((item) => (
                  <option key={item._id} value={item._id}>{item.categoryName}</option>
                ))}
              </select>
              {errors?.parentId?.message && (
                <p className="text-red-500">{errors?.parentId?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                {...register("status")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Hidden">Hidden</option>
                <option value="Presently">Presently</option>
              </select>
            </div>
            <div className="">
              <div className="mb-2 block">
                <Label htmlhtmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Nhập mô tả danh mục"
                required
                rows={4}
              />
              {errors?.description?.message && (
                <p className="text-red-500">{errors?.description?.message}</p>
              )}
            </div>
            <div>
              <InputField
                type="file"
                onChange={previewImage}
                filed={t("fields.imageCategory")}
                register={register("image")}
                errors={errors?.image?.message}
              />
              {preview && (
                <Img
                  src={preview.previewImage ?? preview}
                  alt=""
                  className="w-20 h-20 object-cover rounded-md mt-2"
                />
              )}
            </div>
            <div className="flex gap-3 border-t pt-5">
              <Button
                type="submit"
                size="sm"
                color="blue"
                isProcessing={isLoading}
              >
                Submit
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListCategory;
