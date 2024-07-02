import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "../../../components/common";
import { toast } from "react-toastify";
import { apiGetDetailUser } from "../../../apis/axios";
import { useParams } from "react-router-dom";
function DetailAccount() {
  const { t } = useTranslation("admin");

  const [active, setActive] = useState("info");

  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetDetailUser(id);
        if (res) {
          console.log(res);
          setData(res.user);
        }
      } catch (error) {
        toast.error(error);
      }
    })();
  }, [id]);
  return (
    <div className="rounded-md flex gap-3">
      <div className="w-64 p-5 bg-[#fff] dark:bg-slate-800 rounded-md">
        <button
          type="button"
          onClick={() => setActive("info")}
          className={`flex items-center w-full gap-3 ${
            active === "info" &&
            "text-blue-700 border-blue-700 dark:text-blue-700 dark:border-blue-700"
          } border hover:border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#fff] dark:text-[#fff] dark:hover:text-white hover:dark:text-blue-700 hover:dark:border-blue-700`}
        >
          <i class="fa-regular fa-user"></i>
          {t("profile.personalInfo")}
        </button>
        <button
          type="button"
          onClick={() => setActive("history")}
          className={`flex items-center w-full gap-3 ${
            active === "history" &&
            "text-blue-700 border-blue-700 dark:text-blue-700 dark:border-blue-700"
          } border hover:border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#fff] dark:text-[#fff] dark:hover:text-white hover:dark:text-blue-700 hover:dark:border-blue-700`}
        >
          <i class="fa-solid fa-cart-shopping"></i>
          {t("profile.historyOrder")}
        </button>
      </div>

      <div className="flex-1 bg-[#fff] dark:bg-slate-800 dark:text-[#fff] rounded-md p-5">
        <div className="flex gap-5 p-5 bg-[#F6F7F9] dark:bg-[#0F172A] rounded-md">
          <div class="relative">
            <Img
              className="w-36 h-36 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-500"
              src={data?.avatar}
              alt=""
            />
            <span class="bottom-0 right-7 absolute  w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">
              {data?.lastName} {data?.firstName}
            </h1>
            <span className="text-blue-500">
              I am Professional Graphic Designer
            </span>
          </div>
        </div>

        <div className="mt-3">
          <h1 className="text-xl font-bold">
            {t("profile.personalInformation")}
          </h1>

          <div class="relative overflow-x-auto sm:rounded-lg mt-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr className="border-b">
                  <th
                    scope="col"
                    class="px-6 py-3 bg-gray-50 dark:bg-slate-800 w-32"
                  >
                    {t("profile.properties")}
                  </th>
                  <th scope="col" class="px-6 py-3">
                    {t("profile.information")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.userName")}
                  </th>
                  <td class="px-6 py-4">{data?.userName}</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.fullName")}
                  </th>
                  <td class="px-6 py-4">{`${data?.lastName} ${data?.firstName}`}</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.birthDay")}
                  </th>
                  <td class="px-6 py-4">{data?.birthDay}</td>
                </tr>
                
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.emailAddress")}
                  </th>
                  <td class="px-6 py-4">{data?.email}</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.phoneNumber")}
                  </th>
                  <td class="px-6 py-4">{data?.phone}</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.sex")}
                  </th>
                  <td class="px-6 py-4">{data?.sex}</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.activated")}
                  </th>
                  <td class="px-6 py-4">{data?.status}</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.role")}
                  </th>
                  <td class="px-6 py-4">{data?.role?.name}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800"
                  >
                    {t("fields.address")}
                  </th>
                  <td class="px-6 py-4">{data?.address}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailAccount;
