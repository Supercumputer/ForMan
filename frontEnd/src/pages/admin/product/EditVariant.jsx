import { useEffect, useState } from "react";
import { InputField, ButtonPro, Img } from "../../../components/common";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  apiEditVariant,
  apiGetAllColor,
  apiGetAllSize,
  apiGetProduct,
  apiGetVariant,
} from "../../../apis/axios";

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
function EditVariant() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { id } = useParams();

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

      const res = await apiEditVariant(formData, id);
      if (res && res.status) {
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

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetVariant(id);
        if (res && res.status) {
          setFiles(res.variant.images);
          reset(res.variant);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all([apiGetAllColor(), apiGetAllSize()]).then(
        ([colors, sizes]) => {
          setColors(colors);
          setSizes(sizes);
        }
      );
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-[#fff] rounded-md overflow-hidden dark:bg-gray-800 ">
      <div className="text-xl px-3 py-2 border-b font-semibold dark:text-[#fff]">
        Edit Variant
      </div>
      <div className="p-3">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <select
                {...register("color")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Color --</option>
                {colors.map((color) => (
                  <option value={color._id}>{color.colorName}</option>
                ))}
              </select>
              {errors.color && (
                <p className="text-red-500">{errors.color.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Size
              </label>
              <select
                {...register("size")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Size --</option>
                {sizes.map((size) => (
                  <option value={size._id}>{size.sizeName}</option>
                ))}
              </select>
              {errors.size && (
                <p className="text-red-500">{errors.size.message}</p>
              )}
            </div>
          </div>
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
                  src={file.preview || file}
                  className="w-full h-40 object-cover border-2 rounded-sm"
                  alt={""}
                />
              ))}
            </div>
          )}
          <Button type="submit" size="sm" color="blue" isProcessing={isLoading}>
            Update Variant
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditVariant;
