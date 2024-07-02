import React, { useState } from "react";
import { ButtonPro, Img, InputField } from "../../../components/common";
import { Button, Label, Textarea } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiCreateCategory } from "../../../apis/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";

const schema = z.object({
  categoryName: z.string().min(1, { message: "Tên danh mục không hợp lệ." }),
  description: z.string().min(1, { message: "Mô tả không hợp lệ." }),
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
       
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
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
