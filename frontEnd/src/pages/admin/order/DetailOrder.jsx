import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import { Table, Breadcrumb } from "flowbite-react";
import { Img } from "../../../components/common";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { calculateSalePrice, formatDate, formatNumber } from "../../../utils/helper";
import { getOrderById, getOrderDetailById } from "../../../apis/orderApi";

const DetailOrder = () => {
  const { t } = useTranslation("admin");

  const { id } = useParams();

  const [active, setActive] = useState(1);
  const [orderInfo, setOrderInfo] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    (async () => {
      const [order, orderDetail] = await Promise.all([
        getOrderById(id),
        getOrderDetailById(id)
      ])
    
      setOrderInfo(order.order)
      setOrderDetails(orderDetail.orderDetails)

    })()
  }, [id])

  return (
    <>
      <Breadcrumb aria-label="Default breadcrumb example " className="mb-4">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Inventory</Breadcrumb.Item>
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
      </Breadcrumb>

      <div className="border-b border-gray-200 bg-[#fff] rounded-md dark:border-gray-700 mb-3">
        <ul className="flex flex-wrap -mb-px text-sm font-mediumtext-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <button onClick={() => setActive(1)} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 1 ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
              <i className="fa-brands fa-jedi-order"></i> <span>Thông tin đơn hàng</span>
            </button>
          </li>
          <li className="me-2">
            <button onClick={() => setActive(2)} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 2 ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
              <i className="fa-solid fa-list"></i> <span>Danh sách sản phẩm</span>
            </button>
          </li>
        </ul>
      </div>

      {active === 1 &&
        <div className=" mx-auto bg-white shadow-md rounded-lg text-[#333333] overflow-x-auto custom-scroll">
          <div className="grid lg:grid-cols-2 gap-4 p-6">

            <div>
              <h2 className="text-lg bg-[#F8FAFC] p-3 rounded font-semibold mb-4">THÔNG TIN ĐƠN HÀNG</h2>
              <div className="flex flex-col gap-3 px-3">
                <p className="flex"><span className="min-w-56">Mã đơn hàng:</span> <span className="font-medium">{orderInfo._id}</span></p>
                <p className="flex"><span className="min-w-56">Ngày taọ đơn:</span> <span className="font-medium">{formatDate(orderInfo.createdAt || new Date())}</span></p>
                <p className="flex"><span className="min-w-56">Hình Thức thanh toán:</span> <span className="font-medium">{orderInfo.delivery}</span></p>
                <p className="flex"><span className="min-w-56">Trạng thái thanh toán:</span> <span className="font-medium">{orderInfo.status_payment}</span></p>
                <p className="flex"><span className="min-w-56">Mã giảm giá:</span> <span className="font-medium">{orderInfo.discount || "Không có"}</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-lg bg-[#F8FAFC] p-3 font-semibold mb-4">THÔNG TIN CHI TIẾT</h2>
              <div className="flex flex-col gap-3 px-3">

                <p className="flex"><span className="min-w-56">Số lượng sản phẩm:</span> <span className="font-medium">{orderDetails.length}</span></p>
                <p className="flex"><span className="min-w-56">Cân nặng:</span> <span className="font-medium">ok baby</span></p>
                <p className="flex"><span className="min-w-56">Khai giá hàng hóa:</span> <span className="font-medium">1.000.000 đ</span></p>
                <p className="flex"><span className="min-w-56">Tiền thu hộ (COD):</span> <span className="font-medium">200.000 đ</span></p>
                <p className="flex"><span className="min-w-56">Lưu ý giao hàng:</span> <span className="font-medium">Cho thử hàng</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-lg bg-[#F8FAFC] p-3 font-semibold mb-4">NGƯỜI GIAO HÀNG</h2>
              <div className="flex flex-col gap-3 px-3">

                <p className="flex"><span className="min-w-56">Họ và tên:</span> <span className="font-medium">{orderInfo.sender?.name || "Không có"}</span></p>
                <p className="flex"><span className="min-w-56">Email:</span> <span className="font-medium">{orderInfo.sender?.email || "Không có"}</span></p>
                <p className="flex"><span className="min-w-56">Điện thoại:</span> <span className="font-medium">{orderInfo.sender?.phone || "Không có"}</span></p>
                <p className="flex"><span className="min-w-56">Địa chỉ:</span> <span className="font-medium">{orderInfo.sender?.address || "Không có"}</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-lg bg-[#F8FAFC] p-3 font-semibold mb-4">NGƯỜI NHẬN</h2>
              <div className="flex flex-col gap-3 px-3">

                <p className="flex"><span className="min-w-56">Họ và tên:</span> <span className="font-medium">{orderInfo.receiver?.name}</span></p>
                <p className="flex"><span className="min-w-56">Email:</span> <span className="font-medium">{orderInfo.receiver?.email}</span></p>
                <p className="flex"><span className="min-w-56">Điện thoại:</span> <span className="font-medium">{orderInfo.receiver?.phone}</span></p>
                <p className="flex"><span className="min-w-56">Địa chỉ:</span> <span className="font-medium">{orderInfo.receiver?.address}</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-lg bg-[#F8FAFC] p-3 font-semibold mb-4">CHI PHÍ</h2>
              <div className="flex flex-col gap-3 px-3">

                <p className="flex"><span className="min-w-56">Phí giao hàng:</span> <span className="font-medium">0 đ</span></p>
                <p className="flex"><span className="min-w-56">Phí trả hàng:</span> <span className="font-medium">0 đ</span></p>
                <p className="flex"><span className="min-w-56">Mã giảm giá:</span> <span className="font-medium">-5.000 đ</span></p>
                <p className="flex"><span className="min-w-56">Tổng phí:</span> <span className="font-medium">{formatNumber(+orderInfo?.total_payment)} đ</span></p>
                <p className="flex"><span className="min-w-56">Người trả:</span> <span className="font-medium">Người gửi trả qua công nợ</span></p>
              </div>
            </div>

          </div>
        </div>

      }

      {active === 2 && <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">
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
                {t("fields.size")}
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
              {orderDetails?.map((item, index) => (

                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>{item.variant_id.mbt}</Table.Cell>
                  <Table.Cell>
                    <Img
                      src={item.variant_id.images[0]}
                      className="object-cover w-14 h-14 rounded-md border "
                    />
                  </Table.Cell>
                  <Table.Cell>{item.variant_id.color?.colorName}</Table.Cell>
                  <Table.Cell>{item.variant_id.size?.sizeName}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>{formatNumber(item.price)}đ</Table.Cell>
                  <Table.Cell>{item.sale}%</Table.Cell>
                  <Table.Cell className="font-medium text-red-500">{formatNumber(calculateSalePrice(item.price * item.quantity, item.sale))}đ</Table.Cell>
                </Table.Row>
              ))}

            </Table.Body>
          </Table>
        </div>
      </div>}

    </>
  );
};

export default DetailOrder;
