import { useState } from "react";
import { InputField, ButtonPro, Img } from "../../../components/common";
import { useTranslation } from "react-i18next";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";
import { toast } from "react-toastify";
import { apiCreateVariant } from "../../../apis/axios";

const schema = z.object({
  color: z.string().min(1, { message: "Màu không hợp lệ." }), // Color là một chuỗi không rỗng
  price: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseFloat(val);
  }, z.number({ invalid_type_error: "Giá phải là một số." }).positive({ message: "Giá phải là một số dương." })), // Chuyển đổi giá trị thành số và kiểm tra giá trị dương
  quantity: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseInt(val, 10);
  }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
  sale: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseInt(val, 10);
  }, z.number({ invalid_type_error: "Sale phải là một số." }).int({ message: "Sale phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
  size: z.string().min(1, { message: "Size không hợp lệ." }), // Size là một chuỗi không rỗng
  images: z.custom((value) => {
    if (value instanceof FileList) {
      return value.length > 0;
    }
    return true;
  }, "Ảnh không hợp lệ."),
});
function CreateVariant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const handlerPreview = (e) => {
    const newFiles = e.target.files;
    // Kiểm tra nếu không có tệp được chọn
    if (!newFiles || newFiles.length === 0) return;

    // Lọc ra các tệp mới không trùng lặp với các tệp đã có
    const uniqueFiles = Array.from(newFiles).filter((file) => {
      return !files.some((existingFile) => {
        return (
          existingFile.name === file.name && existingFile.size === file.size
        );
      });
    });

    // Tạo một mảng mới với trường 'preview' được thêm vào mỗi đối tượng tệp không trùng lặp
    const filesWithPreview = uniqueFiles.map((file) => {
      file.preview = URL.createObjectURL(file);
      return file;
    });

    // Thêm các tệp không trùng lặp vào mảng files
    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  };

  const handlerSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (const key in data) {
        if (key === "images") {
          [...data[key]].forEach((file) => {
            formData.append("images", file);
          });
        } else {
          formData.append(key, data[key]);
        }
      }

      const res = await apiCreateVariant(formData, id);

      if (res && res.status) {
        navigate(`${pathAdmin.products}/${id}/variants`);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#fff] rounded-md overflow-hidden dark:bg-gray-800 ">
      <div className="text-xl px-3 py-2 border-b font-semibold dark:text-[#fff]">
        Create Variant
      </div>
      <div className="p-3">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <InputField
            filed="Color"
            placeholder="Nhập vào màu sản phẩm"
            register={register("color")}
            errors={errors?.color?.message}
          />
          <InputField
            filed="Size"
            placeholder="Nhập vào kích thước sản phẩm"
            register={register("size")}
            errors={errors?.size?.message}
          />

          <InputField
            filed="Price"
            placeholder="Nhập vào giá sản phẩm"
            register={register("price")}
            errors={errors?.price?.message}
          />
          <div className="flex gap-4">
            <InputField
              filed="Quantity"
              type="number"
              min="1"
              placeholder="Nhập vào số lượng sản phẩm"
              register={register("quantity")}
              errors={errors?.quantity?.message}
            />

            <InputField
              filed="Sale"
              type="number"
              min="0"
              max="100"
              placeholder="Nhập vào giá sản phẩm"
              register={register("sale")}
              errors={errors?.sale?.message}
            />
          </div>

          <InputField
            filed="Image"
            type="file"
            multiple
            onChange={handlerPreview}
            register={register("images")}
            errors={errors?.images?.message}
          />

          {files.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {files.map((file, index) => (
                <Img
                  key={index}
                  src={file.preview}
                  className="w-full h-40 object-cover border-2 rounded-sm"
                  alt={""}
                />
              ))}
            </div>
          )}
          <Button type="submit" size="sm" color="blue" isProcessing={isLoading}>
            Create Variant
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateVariant;
