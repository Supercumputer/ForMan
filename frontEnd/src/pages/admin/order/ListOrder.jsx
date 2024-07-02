import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Pagination,
  Select,
  Table,
  Breadcrumb,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";
import { ButtonPro, Img } from "../../../components/common";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

function ListOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation("admin");
  const onPageChange = (page) => setCurrentPage(page);

  const handleClick = () => {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    );
  };

  return (
    <>
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            Accounts
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="rounded-md p-2 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
          <Dropdown
            label="Actions"
            dismissOnClick={false}
            renderTrigger={() => <Button color="light">Actions</Button>}
          >
            <Dropdown.Item>
              <Link to={`${pathAdmin.category}/create`}>Create</Link>
            </Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
            <Dropdown.Item>Activated</Dropdown.Item>
          </Dropdown>
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <div className="overflow-x-auto border-y border-[#ccc] py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.orderId")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.createdAt")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.discountCode")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.totalPrice")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.payments")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.status")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.actions")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-red-500 rounded-lg cursor-pointer">
                        Đang xử lý
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      type="button"
                      name={<i class="fa-solid fa-trash"></i>}
                      onclick={handleClick}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-green-400 rounded-lg cursor-pointer">
                        Đã nhận được hàng
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i class="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-green-400 rounded-lg cursor-pointer">
                        Đã nhận được hàng
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i class="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-green-400 rounded-lg cursor-pointer">
                        Đã nhận được hàng
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i class="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-green-400 rounded-lg cursor-pointer">
                        Đã nhận được hàng
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i class="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-green-400 rounded-lg cursor-pointer">
                        Đã nhận được hàng
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i class="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>MDK-001</Table.Cell>
                <Table.Cell>20/11/2024</Table.Cell>
                <Table.Cell>DKLQSMKH</Table.Cell>
                <Table.Cell>25.000.000</Table.Cell>
                <Table.Cell>COD</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="text-[#fff] p-1 bg-green-400 rounded-lg cursor-pointer">
                        Đã nhận được hàng
                      </span>
                    )}
                  >
                    <Dropdown.Item>Đang chờ xác nhận</Dropdown.Item>
                    <Dropdown.Item>Đang Lấy hàng</Dropdown.Item>
                    <Dropdown.Item>Đang giao hàng</Dropdown.Item>
                    <Dropdown.Item>Đã nhận được hàng</Dropdown.Item>
                    <Dropdown.Item>Đã hủy</Dropdown.Item>
                    <Dropdown.Item>Hoàn thành</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <ButtonPro
                      name={<i class="fa-solid fa-trash"></i>}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    />

                    <ButtonPro
                      to={`${pathAdmin.orders}/detail/1`}
                      name={<i class="fa-solid fa-eye"></i>}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="max-w-md">
            <Select id="countries" required>
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
}

export default ListOrder;
