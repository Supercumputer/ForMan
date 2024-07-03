import React, { useEffect, useState } from "react";
import { ButtonPro, Img, InputField } from "../../../components/common";
import { Button, Label, Select, Textarea } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiCreateCategory, apiGetAllCategory } from "../../../apis/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";

const schema = z.object({
  categoryName: z.string().min(1, { message: "Tên danh mục không hợp lệ." }),
  description: z.string().min(1, { message: "Mô tả không hợp lệ." }),
  parentId: z.string().optional(),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Ảnh không hợp lệ."),
});

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { t } = useTranslation("admin");
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const previewImage = (event) => {
    let file = event.target.files[0];

    file.previewImage = URL.createObjectURL(file);

    setPreview(file);
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

      const res = await apiCreateCategory(formData);

      if (res && res.status) {
        toast.success(res.message);
        navigate(`${pathAdmin.category}`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetAllCategory();
        console.log(res);
        if (res && res.status) {
          setCategories(res.categories);
        }
      } catch (error) {
        toast.error(error);
      }
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-[#fff] rounded-md overflow-hidden dark:bg-gray-800">
      <div className="text-xl px-3 py-2 border-b font-semibold dark:text-[#fff]">
        {t("fields.createCategory")}
      </div>
      <form
        onSubmit={handleSubmit(handlerSubmit)}
        className="p-3 flex flex-col gap-4"
      >
        <InputField
          filed={t("fields.categoryName")}
          register={register("categoryName")}
          placeholder="Nhập tên danh mục"
          errors={errors?.categoryName?.message}
        />

        <div class="">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Danh mục cha
          </label>
          <select
            id="countries"
            {...register("parentId")}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>Chon danh mục cha</option>
            {categories.map((item) => (
              <option value={item._id}>{item.categoryName}</option>
            ))}
          </select>
          {errors?.parentId?.message && (
            <p className="text-red-500">{errors?.parentId?.message}</p>
          )}
        </div>

        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Nhập mô tả danh mục"
            rows={4}
          />
          {errors?.description?.message && (
            <p className="text-red-500">{errors?.description?.message}</p>
          )}
        </div>

        <InputField
          type="file"
          onChange={previewImage}
          filed={t("fields.imageCategory")}
          register={register("image")}
          errors={errors?.image?.message}
        />

        {preview && (
          <Img
            src={preview.previewImage}
            alt=""
            className="max-w-36 max-h-36 object-cover"
          />
        )}

        <div className="flex items-center justify-between">
          <Button type="submit" size="sm" color="blue" isProcessing={isLoading}>
            {t("fields.createCategory")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
