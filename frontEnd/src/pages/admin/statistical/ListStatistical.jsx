import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import {
  Checkbox,
  Table,
  Breadcrumb,
  Pagination,
  Select,
  Datepicker,
} from "flowbite-react";
import { ButtonPro, Img, InputField } from "../../../components/common";
import { pathAdmin } from "../../../utils/path";

const ListProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  const { t } = useTranslation("admin");

  const location = useLocation();

  const pathName = useMemo(
    () => location.pathname.split("/").reverse()[0],
    [location.pathname]
  );

  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example " className="mb-4">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Inventory</Breadcrumb.Item>
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
      </Breadcrumb>
      <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">
        <div date-rangepicker class="flex items-center mb-3">
          <Datepicker
            weekStart={1} // Monday
          />
          <span class="mx-4 text-gray-500">to</span>
          <Datepicker
            weekStart={1} // Monday
          />
        </div>

        <div className="overflow-x-auto border-y border-[#ccc] py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell>{t("fields.productId")}</Table.HeadCell>
              <Table.HeadCell>{t("fields.productName")}</Table.HeadCell>
              <Table.HeadCell>{t("fields.image")}</Table.HeadCell>
              <Table.HeadCell>{t("fields.category")}</Table.HeadCell>
              <Table.HeadCell>{t("fields.views")}</Table.HeadCell>
              <Table.HeadCell>{t("fields.createdAt")}</Table.HeadCell>
              <Table.HeadCell>{t("fields.actions")}</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>DK-001</Table.Cell>
                <Table.Cell>Điện thoại Apple iPhone 15 Pro 128GB</Table.Cell>
                <Table.Cell>
                  <Img
                    src="https://shopdunk.com/images/thumbs/0021938_iphone-15-pro-max%20(1)_1600.jpeg"
                    className="object-cover w-20 h-20 rounded-md"
                  />
                </Table.Cell>
                <Table.Cell>$10.00</Table.Cell>
                <Table.Cell>100</Table.Cell>
                <Table.Cell>20/11/2023</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i className="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.products}/${pathName}/edit/1`}
                      name={<i className="fa-solid fa-pen-to-square"></i>}
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.products}/detail/1`}
                      name={<i className="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
              {/* Additional product rows can be added here */}
            </Table.Body>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-2 ">
          <div className="max-w-md">
            <Select id="itemsPerPage" required>
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </Select>
          </div>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={100}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
