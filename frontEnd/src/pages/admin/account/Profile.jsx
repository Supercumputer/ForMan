import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "../../../components/common";
import { toast } from "react-toastify";
import { apiGetDetailUser, apiUpdateUser } from "../../../apis/axios";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {formatDate} from "../../../utils/helper";

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
  sex: z.enum(["Male", "Female", "Other"], { message: "Sex không hợp lệ." }),
  birthDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Birthday phải đúng định dạng YYYY-MM-DD.",
  }),

});

function DetailAccountAdmin() {
  const { t } = useTranslation("admin");
  const [activeTab, setActiveTab] = useState("info");
  const [userData, setUserData] = useState({});
  const { account } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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
        formData.append(key, data[key]);
      }

      formData.append("avatar", avatarPreview);

      const res = await apiUpdateUser(formData, account.id);

      if (res && !res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetDetailUser(account.id);
        if (res) {
          setUserData(res.user);
          reset({
            ...res.user, birthDay: res.user.birthDay
              ? new Date(res.user.birthDay).toISOString().split("T")[0]
              : ""
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [account.id]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-80 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center mb-6">
            <Img
              className="w-24 h-24 rounded-full object-cover mb-4"
              src={userData.avatar}
              alt=""
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {userData.lastName} {userData.firstName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{userData.email}</p>
          </div>
          <div className="flex flex-col w-full space-y-4">
            <button
              onClick={() => setActiveTab("info")}
              className={`text-left px-4 py-2 rounded-lg text-lg font-semibold transition-colors duration-300 ${activeTab === "info"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              <i className="fa-regular fa-user mr-2"></i>
              {t("profile.personalInfo")}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`text-left px-4 py-2 rounded-lg text-lg font-semibold transition-colors duration-300 ${activeTab === "history"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i>
              {t("profile.historyOrder")}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {activeTab === "info" && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {t("profile.personalInformation")}
                </h3>
                <Button size="sm" isProcessing={false} color="dark" onClick={() => setIsEdit(true)}>
                  <div className="flex items-center gap-2"><i class="fa-solid fa-pen-to-square"></i></div>
                </Button>
              </div>
              <div>

                {isEdit ?
                  <form onSubmit={handleSubmit(handlerSubmit)} >
                    <div className="flex md:flex-row flex-col-reverse md:items-center gap-10">

                      <div className="flex-1 flex flex-col gap-6">
                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">UserName: </span>
                          <input type="text" {...register('userName')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                        </div>
                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">Họ: </span>
                          <input type="text" {...register('lastName')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                        </div>
                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">Tên: </span>
                          <input type="text" {...register('firstName')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                        </div>
                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">Email: </span>
                          <input type="text" {...register('email')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                        </div>
                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">Số điện thoại: </span>
                          <input type="text" {...register('phone')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                        </div>
                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">Giới tính: </span>
                          {
                            isEdit ? <select id="underline_select" {...register('sex')} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                              <option selected>Chọn giới tính</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select> :
                              <input type="text" {...register('sex')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                          }
                        </div>

                        <div className="flex items-center lg:gap-4 gap-0 font-semibold">
                          <span className="min-w-[150px]">Ngày sinh: </span>
                          {
                            isEdit ?
                              <input type="date" {...register('birthDay')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-[#ccc] block w-full bg-transparent p-2.5" placeholder="Select date" />
                              : <input type="text" {...register('birthDay')} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
                          }
                        </div>

                      </div>

                      <div className="w-36 mx-auto flex flex-col items-center">
                        <Img src={avatarPreview?.preview || userData.avatar} className="rounded-full object-cover h-32 w-32 border-2 border-gray-200" />
                        <label className="mt-2 text-gray-600 font-semibold" htmlFor="avatar">Avatar</label>
                        {isEdit && <input type="file" onChange={handleAvatarChange} className="hidden" id="avatar" />}
                      </div>

                    </div>

                    <div className="flex justify-center mt-8">
                      <Button type="submit" size="md" isProcessing={isLoading} color="dark" >
                        Save Changes
                      </Button>
                    </div>

                  </form>
                  :
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: t("fields.userName"), value: userData.userName },
                      { label: t("fields.fullName"), value: `${userData.lastName} ${userData.firstName}` },
                      { label: t("fields.birthDay"), value: formatDate(userData?.birthDay) },
                      { label: t("fields.emailAddress"), value: userData.email },
                      { label: t("fields.phoneNumber"), value: userData.phone },
                      { label: t("fields.sex"), value: userData.sex },
                      { label: t("fields.activated"), value: userData.status },
                      { label: t("fields.role"), value: userData.role?.name },
                      { label: t("fields.type"), value: userData.type },
                      { label: t("fields.refreshToken"), value: userData.refreshToken },
                    ].map((field, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm text-gray-500">{field.label}</span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                          {field.value || 'N/A'}
                        </span>
                      </div>
                    ))}

                  </div>
                }
              </div>

            </div>
          )}
          {activeTab === "history" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {t("profile.historyOrder")}
              </h3>
              {/* Implement order history details here */}
              <p>{t("profile.historyOrderDetails")}</p>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default DetailAccountAdmin;
