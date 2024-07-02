import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { InputField, Img } from "../../../components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "flowbite-react";
import {
  apiGetAllBrand,
  apiGetAllCategory,
  apiGetProduct,
  apiUpdateProduct,
} from "../../../apis/axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


const schema = z.object({
  code: z.string().min(1, { message: "Mã không hợp lệ." }), // Code là một chuỗi không rỗng
  name: z.string().min(1, { message: "Tên không hợp lệ." }), // Name là một chuỗi không rỗng
  category: z.string().min(1, { message: "Danh mục không hợp lệ." }), // Category là một chuỗi không rỗng
  brand: z.string().min(1, { message: "Thương hiệu không hợp lệ." }), // Brand là một chuỗi không rỗng
});

function EditProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const editor = useRef(null);
  const [brands, setBrands] = useState([]);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await Promise.all([
        apiGetAllBrand(),
        apiGetAllCategory(),
        apiGetProduct(id),
      ]).then(([brands, categorys, product]) => {
        setBrands(brands.brands);
        setCategories(categorys.categories);

        setContent(product.product.description);
        reset(product.product);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlerSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      formData.append("description", content);
      
      const res = await apiUpdateProduct(formData, id);

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

  return (
    <div className="max-w-3xl mx-auto bg-[#fff] rounded-md overflow-hidden dark:bg-gray-800 ">
      <div className="text-xl px-3 py-2 border-b font-semibold dark:text-[#fff]">
        Edit Product
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

          <Button type="submit" size="sm" color="blue" isProcessing={isLoading}>
            Update Product
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
