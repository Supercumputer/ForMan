import { useEffect, useState } from "react";
import { Img, InputField } from "../../../components/common";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";

import * as z from "zod";
import {
  apiGetDetailUser,
  apiGetAllGroupRole,
  apiUpdateUser,
} from "../../../apis/axios";
import { useParams } from "react-router-dom";

const schema = z.object({
  userName: z.string().min(1, { message: "Username không hợp lệ." }),
  firstName: z.string().min(1, { message: "First name không hợp lệ." }),
  lastName: z.string().min(1, { message: "Last name không hợp lệ." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  phone: z.string().regex(/^0[0-9]{9}$/, {
    message: "Phone không hợp lệ.",
  }),
  status: z.enum(["InActive", "Active", "Banned"], {
    message: "Status không hợp lệ.",
  }),
  address: z.string().min(1, { message: "Address không hợp lệ." }),
  sex: z.enum(["Male", "Female", "Other"], { message: "Sex không hợp lệ." }),
  role: z
    .string()
    .min(1, { message: "Vui lòng chọn quyền cho tài khoản này." }),
  birthDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Birthday phải đúng định dạng YYYY-MM-DD.",
  }),
  avatar: z.custom((value) => {
    if (value instanceof FileList) {
      return value.length > 0;
    }
    return true;
  }, "Avatar không hợp lệ."),
  password: z.string().refine((val) => val === "" || val.length >= 8, {
    message: "Password phải tối thiểu là 8 kí tự.",
  }),
});

function EditAccount() {
  const [avatar, setAvatar] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation("admin");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [groupRole, setGroupRole] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    (async () => {
      await Promise.all([apiGetAllGroupRole("admin"), apiGetDetailUser(id)])
        .then(([roles, user]) => {
          setGroupRole(roles.groupRoles);
          setAvatar(user.user.avatar);
          const formattedUser = {
            ...user.user,
            role: user.user.role._id,
            address: user.user.address ? user.user.address.toString() : "",
            birthDay: user.user.birthDay
              ? new Date(user.user.birthDay).toISOString().split("T")[0]
              : "",
          };
          reset(formattedUser);
        })
        .catch((error) => {
          toast.error(error);
        });
    })();
  }, []);

  useEffect(() => {
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
    };
  }, [avatarPreview]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatarPreview(file);
  };

  const handlerSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      for (const key in data) {
        if (key === "avatar") {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const res = await apiUpdateUser(formData, id);

      if (res && !res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
      <div className="text-xl px-3 py-2 border-b font-semibold dark:text-[#fff]">
        Edit account
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(handlerSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <InputField
              filed="User name"
              placeholder="User name"
              register={register("userName")}
              errors={errors?.userName?.message}
            />
            <InputField
              filed="First name"
              placeholder="First name"
              register={register("firstName")}
              errors={errors?.firstName?.message}
            />
            <InputField
              filed="Last name"
              placeholder="Last name"
              register={register("lastName")}
              errors={errors?.lastName?.message}
            />
            <InputField
              filed="Phone"
              placeholder="123-456-7890"
              register={register("phone")}
              errors={errors?.phone?.message}
              icon={
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              }
            />
            <InputField
              type="email"
              filed="Email address"
              placeholder="john.doe@company.com"
              register={register("email")}
              errors={errors?.email?.message}
              icon={
                <svg
                  className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path>
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path>
                </svg>
              }
            />
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sex
              </label>
              <select
                {...register("sex")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
                <option value="InActive">InActive</option>
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
            </div>

            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Groups role
              </label>
              <select
                {...register("role")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {groupRole.map((group, index) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              type="date"
              filed="Birthday"
              register={register("birthDay")}
              errors={errors?.birthDay?.message}
            />
            <InputField
              filed="Password"
              type="password"
              placeholder="•••••••••"
              register={register("password")}
              errors={errors?.password?.message}
            />
          </div>
          <div className="mb-6">
            <InputField
              type="file"
              filed="Avatar"
              register={register("avatar")}
              onChange={handleAvatarChange}
              errors={errors?.avatar?.message}
            />
            <Img
              src={avatarPreview?.preview || avatar}
              className="w-28 h-28 mt-3 rounded-sm object-cover"
              alt=""
            />
          </div>

          <div className="mb-6">
            <InputField
              filed="Addresss"
              placeholder="1234 Main St"
              register={register("address")}
              errors={errors?.address?.message}
            />
          </div>

          <Button type="submit" size="sm" color="blue" isProcessing={isLoading}>
            Update Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditAccount;
