import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { InputField, Img } from "../../../components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "flowbite-react";
import {
  apiCreateProduct,
  apiGetAllBrand,
  apiGetAllCategory,
} from "../../../apis/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";

const schema = z.object({
  code: z.string().min(1, { message: "Mã không hợp lệ." }), // Code là một chuỗi không rỗng
  name: z.string().min(1, { message: "Tên không hợp lệ." }), // Name là một chuỗi không rỗng
  category: z.string().min(1, { message: "Danh mục không hợp lệ." }), // Category là một chuỗi không rỗng
  brand: z.string().min(1, { message: "Thương hiệu không hợp lệ." }), // Brand là một chuỗi không rỗng
  color: z.string().min(1, { message: "Màu không hợp lệ." }), // Color là một chuỗi không rỗng
  price: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseFloat(val);
  }, z.number({ invalid_type_error: "Giá phải là một số." }).positive({ message: "Giá phải là một số dương." })), // Chuyển đổi giá trị thành số và kiểm tra giá trị dương
  quantity: z.preprocess((val) => {
    if (typeof val === "string") val = val.trim();
    return val === "" ? NaN : parseInt(val, 10);
  }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
  size: z.string().min(1, { message: "Size không hợp lệ." }), // Size là một chuỗi không rỗng
  images: z.custom((value) => {
    if (value instanceof FileList) {
      return value.length > 0;
    }
    return true;
  }, "Ảnh không hợp lệ."),
});

function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const editor = useRef(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    (async () => {
      await Promise.all([apiGetAllBrand(), apiGetAllCategory()]).then(
        ([brands, categorys]) => {
          setBrands(brands.brands);
          setCategories(categorys.categories);
        }
      );
    })();
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

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

      formData.append("description", content);

      const res = await apiCreateProduct(formData);

      if (res && res.status) {
        navigate(`${pathAdmin.products}`);
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
        Create Product
      </div>

      <div className="p-3">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <InputField
            filed="Mã sản phẩm"
            placeholder="Nhập vào mã sản phẩm"
            register={register("code")}
            errors={errors?.code?.message}
          />
          <InputField
            filed="Product name"
            placeholder="Nhập vào tên sản phẩm"
            register={register("name")}
            errors={errors?.name?.message}
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                {...register("category")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Category --</option>
                {categories.map((category) => (
                  <option value={category._id}>{category.categoryName}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <select
                {...register("brand")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">-- Brand --</option>
                {brands.map((brand) => (
                  <option value={brand._id}>{brand.brandName}</option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500">{errors.brand.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
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
          </div>

          <div className="flex gap-4">
            <InputField
              filed="Quantity"
              placeholder="Nhập vào số lượng sản phẩm"
              register={register("quantity")}
              errors={errors?.quantity?.message}
            />

            <InputField
              filed="Price"
              placeholder="Nhập vào giá sản phẩm"
              register={register("price")}
              errors={errors?.price?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mô tả
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
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
            Create Products
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
