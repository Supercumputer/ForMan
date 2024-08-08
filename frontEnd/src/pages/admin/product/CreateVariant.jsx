import { useEffect, useState } from "react";
import { InputField, Img } from "../../../components/common";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import pathAdmin from "../../../utils/pathAdmin";
import { toast } from "react-toastify";
import variantSchema from "../../../schema/variantSchema";
import { createVariant } from "../../../apis/variantApi";
import { getAllColors } from "../../../apis/colorApi";
import { getAllSizes } from "../../../apis/sizeApi";

function CreateVariant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(variantSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
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

      const res = await createVariant(formData, id);

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

  useEffect(() => {
    (async () => {
      await Promise.all([getAllColors(), getAllSizes()]).then(
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
        Create Variant
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
                  <option key={color._id} value={color._id}>{color.colorName}</option>
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
                  <option key={size._id} value={size._id}>{size.sizeName}</option>
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
