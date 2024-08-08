import { useEffect } from "react";
import { useState } from "react";
import { InputField } from "../../../components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pathAdmin from "../../../utils/pathAdmin";
import { Button } from "flowbite-react";
import userSchema from "../../../schema/userSchema";
import { getAllGroupRoles } from "../../../apis/roleApi";
import {createUser} from "../../../apis/userApi";
function CreateAccount() {
  const [groupRole, setGroupRole] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    (async () => {
      const res = await getAllGroupRoles("admin");
      if (res) {
        setGroupRole(res.groupRoles);
      }
    })();
  }, []);

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

      const res = await createUser(formData);

      if (res && !res.status) {
        toast.error(res.message);
        return;
      }

      navigate(`${pathAdmin.managers}`);
      toast.success(res.message);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#fff] rounded-md overflow-hidden dark:bg-gray-800 ">
      <div className="text-xl px-3 py-2 border-b font-semibold dark:text-[#fff]">
        Create account manager
      </div>

      <div className="p-3">
        <form onSubmit={handleSubmit(handlerSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
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
                <option value="">-- Sex --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.sex && (
                <p className="text-red-500">{errors.sex.message}</p>
              )}
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
                <option value="">-- Role --</option>
                {groupRole.map((group) => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            <InputField
              type="date"
              filed="Birthday"
              register={register("birthDay")}
              errors={errors?.birthDay?.message}
            />

            <InputField
              type="file"
              filed="Avatar"
              register={register("avatar")}
              errors={errors?.avatar?.message}
            />
          </div>

          <div className="mb-6">
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
              filed="Confirm password"
              type="password"
              placeholder="•••••••••"
              register={register("confirmPassword")}
              errors={errors?.confirmPassword?.message}
            />
          </div>

          <Button type="submit" size="sm" color="blue" isProcessing={isLoading}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
