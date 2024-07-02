import React, { useEffect, useState } from "react";
import { Img } from "../../components/common";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Checkbox, Table, Button } from "flowbite-react";
import { Doughnut, Bar } from "react-chartjs-2";
import { ButtonPro } from "../../components/common";
import { useTranslation } from "react-i18next";
import { qkvn } from "../../assets/images";
import { pathAdmin } from "../../utils/path";
import { apiCountProduct, apiCountUser, apiGetAllUser } from "../../apis/axios";
import { toast } from "react-toastify";

// Register the elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

function Dasboard() {
  const { t } = useTranslation("admin");
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    (async () => {
      await Promise.all([
        apiCountUser(),
        apiCountProduct(),
        callApiGetAllUser(),
      ]).then((res) => {
        setData(res);
      });
    })();
  }, []);

  const callApiGetAllUser = async () => {
    try {
      const res = await apiGetAllUser(1, 5, "user", "");

      if (res && res.users) {
        setUserData(res?.users);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-2 dark:text-[#fff] mb-4">
        <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
          <div className="flex flex-col">
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {t("sidebar.accounts")}
            </span>
            <span className="text-3xl font-bold">{data[0]}</span>
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {new Date().toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
            <i class="fa-solid fa-users text-3xl m-auto"></i>
          </div>
        </div>

        <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
          <div className="flex flex-col">
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {t("sidebar.category")}
            </span>
            <span className="text-3xl font-bold">2300</span>
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {new Date().toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
            <i class="fa-solid fa-layer-group text-3xl m-auto"></i>
          </div>
        </div>

        <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
          <div className="flex flex-col">
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {t("sidebar.products")}
            </span>
            <span className="text-3xl font-bold">{data[1]}</span>
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {new Date().toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
            <i class="fa-brands fa-product-hunt text-3xl m-auto"></i>
          </div>
        </div>

        <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
          <div className="flex flex-col">
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {t("sidebar.orders")}
            </span>
            <span className="text-3xl font-bold">25</span>
            <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
              {new Date().toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
            <i class="fa-brands fa-jedi-order text-3xl m-auto"></i>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-2 dark:text-[#fff] mb-4">
        <div className="p-5 bg-[#fff] dark:bg-slate-800 rounded-md">
          <Img
            src="https://community-assets.home-assistant.io/original/4X/a/f/a/afa0841d900e8d8b27581036afadd149e4a75e63.jpeg"
            className="w-full h-full rounded-md object-cover"
            alt=""
          />
        </div>

        <div className="bg-[#fff] dark:bg-slate-800 p-5 rounded-md flex justify-center h-full">
          <Bar
            data={{
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Revenue",
                  data: [300, 50, 100],
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
              color: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            }}
          />
        </div>
      </div>

      <div className="bg-[#fff] dark:bg-slate-800 overflow-x-auto rounded-md p-5">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                STT
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.fullName")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.phoneNumber")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.orders")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.activated")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.status")}
              </Table.HeadCell>
              
            </Table.Head>
            <Table.Body className="divide-y">
              {userData.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="p-4">{index + 1}</Table.Cell>
                  <Table.Cell className="flex items-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Img
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      src={item?.avatar}
                      alt=""
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {item?.lastName} {item?.firstName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {item?.email}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item?.phone}</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Online
                    </div>
                  </Table.Cell>
                  <Table.Cell
                    className={`${
                      item?.status === "Active"
                        ? "text-green-500"
                        : item?.status === "InActive"
                        ? "text-yellow-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {item?.status}
                  </Table.Cell>
                </Table.Row>
              ))}
             
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dasboard;
