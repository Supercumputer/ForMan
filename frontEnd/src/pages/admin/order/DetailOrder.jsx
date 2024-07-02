import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import { Table, Breadcrumb } from "flowbite-react";
import { Img } from "../../../components/common";

const DetailOrder = () => {
  const { t } = useTranslation("admin");

  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example " className="mb-4">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Inventory</Breadcrumb.Item>
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row rounded-md p-2 bg-[#fff] dark:bg-slate-800 mb-3 gap-3">
        <div className="md:w-72 w-full flex items-center flex-col dark:text-[#fff] border bg-[#F8FAFC] dark:bg-slate-900 p-3 flex-shrink-0 rounded-md">
          <Img
            src="https://tiki.vn/blog/wp-content/uploads/2023/02/toc-nam-han-quoc-6.jpg"
            className="w-36 h-36 object-cover rounded-full border-2"
            alt=""
          />
          <h1 className="font-bold text-xl mt-3">Hồ Văn Quang</h1>
          <span className="font-semibold">033.897.3258</span>
        </div>
        <div className="flex xl:flex-row flex-col items-start flex-1 xl:gap-2 flex-shrink-0">

          <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.orderId")}
              </b>
              <p className="px-6 py-4">#123</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.emailAddress")}
              </b>
              <p className="px-6 py-4">Quangcover2k3az@gmail.com</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.createdAt")}
              </b>
              <p className="px-6 py-4">20/11/2024</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.payments")}
              </b>
              <p className="px-6 py-4">VN PAY</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.shippingAddress")}
              </b>
              <p className="px-6 py-4">
                Xóm 1, Xã Quỳnh Minh, Huyện Quỳnh Lưu, Tỉnh Nghệ An.
              </p>
            </div>
          </div>

          <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.shippingFee")}
              </b>
              <p className="px-6 py-4">50.000 VND</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.discountCode")}
              </b>
              <p className="px-6 py-4">MKHGLOIG</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.provisional")}
              </b>
              <p className="px-6 py-4">24.900.000 VND</p>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 ">
              <b className="min-w-48 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-slate-800">
                {t("fields.totalPrice")}
              </b>
              <p className="px-6 py-4">25.000.000 VND</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">
        <div className="overflow-x-auto py-2">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">STT</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.variantId")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.image")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.color")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.storage")}
              </Table.HeadCell>

              <Table.HeadCell className="text-nowrap">
                {t("fields.quantity")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.price")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.discount")}
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                {t("fields.totalPrice")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>DK-001</Table.Cell>
                <Table.Cell>
                  <Img
                    src="https://shopdunk.com/images/thumbs/0021938_iphone-15-pro-max%20(1)_1600.jpeg"
                    className="object-cover w-14 h-14 rounded-md border "
                  />
                </Table.Cell>
                <Table.Cell>Titan Black</Table.Cell>
                <Table.Cell>256GB</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>18.000.000</Table.Cell>
                <Table.Cell>20%</Table.Cell>
                <Table.Cell>12.000.000</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>DK-001</Table.Cell>
                <Table.Cell>
                  <Img
                    src="https://shopdunk.com/images/thumbs/0021938_iphone-15-pro-max%20(1)_1600.jpeg"
                    className="object-cover w-14 h-14 rounded-md border "
                  />
                </Table.Cell>
                <Table.Cell>Titan Black</Table.Cell>
                <Table.Cell>256GB</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>18.000.000</Table.Cell>
                <Table.Cell>20%</Table.Cell>
                <Table.Cell>12.000.000</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>DK-001</Table.Cell>
                <Table.Cell>
                  <Img
                    src="https://shopdunk.com/images/thumbs/0021938_iphone-15-pro-max%20(1)_1600.jpeg"
                    className="object-cover w-14 h-14 rounded-md border "
                  />
                </Table.Cell>
                <Table.Cell>Titan Black</Table.Cell>
                <Table.Cell>256GB</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>18.000.000</Table.Cell>
                <Table.Cell>20%</Table.Cell>
                <Table.Cell>12.000.000</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>DK-001</Table.Cell>
                <Table.Cell>
                  <Img
                    src="https://shopdunk.com/images/thumbs/0021938_iphone-15-pro-max%20(1)_1600.jpeg"
                    className="object-cover w-14 h-14 rounded-md border "
                  />
                </Table.Cell>
                <Table.Cell>Titan Black</Table.Cell>
                <Table.Cell>256GB</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>18.000.000</Table.Cell>
                <Table.Cell>20%</Table.Cell>
                <Table.Cell>12.000.000</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>1</Table.Cell>
                <Table.Cell>DK-001</Table.Cell>
                <Table.Cell>
                  <Img
                    src="https://shopdunk.com/images/thumbs/0021938_iphone-15-pro-max%20(1)_1600.jpeg"
                    className="object-cover w-14 h-14 rounded-md border "
                  />
                </Table.Cell>
                <Table.Cell>Titan Black</Table.Cell>
                <Table.Cell>256GB</Table.Cell>
                <Table.Cell>20</Table.Cell>
                <Table.Cell>18.000.000</Table.Cell>
                <Table.Cell>20%</Table.Cell>
                <Table.Cell>12.000.000</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DetailOrder;
