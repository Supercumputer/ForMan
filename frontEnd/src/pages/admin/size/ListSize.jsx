import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { formatDate } from "../../../utils/helper";
import sizeSchema from "../../../schema/sizeSchema";
import { createSize, deleteSize, deleteSizes, getAllSizes, getSizeById, updateSize } from "../../../apis/sizeApi";

function ListSize() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sizeSchema),
  });


  const { t } = useTranslation("admin");
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const callApiGetAllSize = async () => {
    try {
      const res = await getAllSizes();

      if (res) {

        setData(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerSubmit = async (data) => {
    try {
      const res = id
        ? await updateSize(data, id)
        : await createSize(data);

      if (res && res.status) {
        toast.success(res.message);
        handlerCloseModel();
        callApiGetAllSize();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerDelete = async (id) => {
    try {
      const res = await deleteSize(id);

      if (res && res.status) {
        Swal.fire("Deleted!", res.message, "success");
        callApiGetAllSize();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const callApiGetSize = async (id) => {
    try {
      const res = await getSizeById(id);

      if (res && res.status) {
        setId(id);
        setOpenModal(true);
        reset(res.size);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerCloseModel = () => {
    reset({
      sizeName: "",
      description: ""
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

          const res = await deleteSizes(dataCheck);

          if (res && res.status) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            callApiGetAllSize();
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
    callApiGetAllSize();
  }, []);

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

        </div>
        <div className="overflow-x-auto border-t border-[#ccc] py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox checked={checkAll} onChange={handleCheckAll} />
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">Size Name</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.description")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.createdAt")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.actions")}
              </Table.HeadCell>

            </Table.Head>

            <Table.Body className="divide-y">
              {data.map((item, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox
                      checked={dataCheck.includes(item?._id)}
                      onChange={() => handleCheckbox(item?._id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.sizeName}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <ButtonPro
                        type={"button"}
                        dataId={item?._id}
                        actionDelete={handlerDelete}
                        name={<i className="fa-solid fa-trash"></i>}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      />

                      <ButtonPro
                        onClick={() => callApiGetSize(item._id)}
                        name={<i className="fa-solid fa-pen-to-square"></i>}
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>

      <Modal show={openModal} onClose={handlerCloseModel}>
        <Modal.Header>
          {id ? "Update Size" : "Create Size"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handlerSubmit)} className="space-y-6">
            <InputField
              filed="Size Name"
              register={register("sizeName")}
              errors={errors?.colorName?.message}
              placeholder="Nhập vào kích thước."
            />

            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Description" />
              </div>
              <Textarea id="comment" placeholder="Nhập vào mô tả" {...register("description")} rows={4} />
              {errors?.description && <p className="text-red-500">{errors?.description?.message}</p>}
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

export default ListSize;
