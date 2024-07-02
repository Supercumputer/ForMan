import React, { useState } from "react";
import { ButtonPro, Img, InputField } from "../../../components/common";
import { Button, Label, Textarea } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiCreateBrand } from "../../../apis/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";

const schema = z.object({
  brandName: z.string().min(1, { message: "Tên thương hiệu không hợp lệ." }),
  description: z.string().min(1, { message: "Mô tả không hợp lệ." }),
  country: z.string().min(1, { message: "Quốc gia không hợp lệ." }),
  website: z.string().min(1, { message: "Website không hợp lệ." }),
  contactEmail: z.string().min(1, { message: "Email không hợp lệ." }),
  logo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Logo không hợp lệ."),
});

const CreateBrand = () => {
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
        if (key === "logo") {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const res = await apiCreateBrand(formData);

      if (res && res.status) {
        toast.success(res.message);
        navigate(`${pathAdmin.brand}`);
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
        Craete Brand
      </div>
      <form
        onSubmit={handleSubmit(handlerSubmit)}
        className="p-3 flex flex-col gap-4"
      >
        <InputField
          filed="Brand Name"
          register={register("brandName")}
          placeholder="Nhập tên thương hiệu"
          errors={errors?.brandName?.message}
        />

        <InputField
          filed="Country"
          register={register("country")}
          placeholder="Nhập tên đất nước"
          errors={errors?.country?.message}
        />

        <InputField
          filed="Contact Email"
          register={register("contactEmail")}
          placeholder="name@gmail.com"
          errors={errors?.contactEmail?.message}
          icon={
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          }
        />
        <InputField
          filed="Website"
          register={register("website")}
          placeholder="name@gmail.com"
          errors={errors?.website?.message}
        />
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Description" />
          </div>
          <Textarea
            {...register("description")}
            placeholder="Leave a comment..."
            rows={4}
          />
          {errors?.description && (
            <p className="text-red-500">{errors?.description?.message}</p>
          )}
        </div>

        <InputField
          type="file"
          onChange={previewImage}
          filed={t("fields.imageCategory")}
          register={register("logo")}
          errors={errors?.logo?.message}
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
            Create Brand
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
