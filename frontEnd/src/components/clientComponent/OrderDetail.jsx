import React, { useEffect, useState } from 'react';
import { apiGetOrderById, apiGetOrderDetailById, apiUpdateOrder } from '../../apis/axios';
import { Button, Table } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { calculateSalePrice, formatDate, formatNumber, maskHalfInfo } from '../../utils/helper';
import { Img } from '../common';
import { toast } from 'react-toastify';

function OrderDetail({ id, setId }) {

    const { t } = useTranslation("admin");
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderInfo, setOrderInfo] = useState({});

    const callApiGetData = async () => {
        const [order, orderDetail] = await Promise.all([
            apiGetOrderById(id),
            apiGetOrderDetailById(id)
        ]);
        setOrderInfo(order.order);
        setOrderDetails(orderDetail.orderDetails);
    }

    useEffect(() => {
        callApiGetData(id);
    }, [id]);

    const handlerUpdateStatus = async (id, status) => {
        try {
            setLoading(true);
            const res = await apiUpdateOrder(id, { status: status })

            if (res && res.status) {
                callApiGetData(id);
                toast.success(res?.message);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const renderActionButton = () => {
        switch (orderInfo.status) {
            case 'Pending':
            case 'Confirmed':
                return (
                    <Button isProcessing={loading} onClick={() => handlerUpdateStatus(orderInfo._id, 'Cancelled')} color="failure">
                        Hủy đơn hàng
                    </Button>
                );

            case 'Preparing':
                return (
                    <Button color="blue">
                        Đang chuẩn bị hàng
                    </Button>
                );

            case 'Shipping':
            case 'Delivered':
                return (
                    <Button isProcessing={loading} onClick={() => handlerUpdateStatus(orderInfo._id, 'Completed')} color="success">
                        Xác nhận đã nhận hàng
                    </Button>
                );

            case 'Cancelled':
                return (
                    <Button isProcessing={loading} onClick={() => handlerUpdateStatus(orderInfo._id, 'Confirmed')} color="blue">
                        Đặt lại
                    </Button>
                );

            case 'Completed':
                return (
                    <Button onClick={""} color="blue">
                        Mua lại
                    </Button>
                );
            case 'Failure':
                return (
                    <Button color="blue">
                        Thất bại
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="">
            <div className="bg-white rounded-lg ">
                <div className={`flex md:flex-row flex-col items-center ${setId ? 'justify-between' : 'justify-center'} mb-6`}>
                    {setId && <div className="bg-[#F8FAFC] flex items-center gap-1 px-3 py-2 rounded cursor-pointer" onClick={() => setId(null)}>
                        <i class="fa-solid fa-angle-left"></i> <span>Back</span>
                    </div>}
                    <h1 className="text-xl font-bold text-center">Chi tiết đơn hàng #{orderInfo._id}</h1>
                    {setId && <div></div>}
                </div>

                <div className=" mx-auto bg-white rounded-lg text-[#333333] overflow-x-auto custom-scroll">
                    <div className="grid lg:grid-cols-2 gap-4">

                        <div>
                            <h2 className="text-lg bg-[#F8FAFC] p-3 rounded font-semibold mb-4">THÔNG TIN ĐƠN HÀNG</h2>
                            <div className="flex flex-col gap-3 px-3">
                                <p className="flex"><span className="min-w-56">Mã đơn hàng:</span> <span className="font-medium">{orderInfo._id}</span></p>
                                <p className="flex"><span className="min-w-56">Ngày taọ đơn:</span> <span className="font-medium">{formatDate(orderInfo.createdAt || Date.now())}</span></p>
                                <p className="flex"><span className="min-w-56">Hình Thức thanh toán:</span> <span className="font-medium">{orderInfo.delivery}</span></p>
                                <p className="flex"><span className="min-w-56">Trạng thái thanh toán:</span> <span className="font-medium">{orderInfo.status_payment}</span></p>
                                <p className="flex"><span className="min-w-56">Mã giảm giá:</span> <span className="font-medium">{setId ? orderInfo.discount : maskHalfInfo(orderInfo.discount) || "Không có"}</span></p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg bg-[#F8FAFC] p-3 font-semibold mb-4">NGƯỜI GIAO HÀNG</h2>
                            <div className="flex flex-col gap-3 px-3">
                                <p className="flex"><span className="min-w-56">Họ và tên:</span> <span className="font-medium">{setId ? orderInfo.sender?.name : maskHalfInfo(orderInfo.sender?.name) || "Không có"}</span></p>
                                <p className="flex"><span className="min-w-56">Email:</span> <span className="font-medium">{setId ? orderInfo.sender?.email : maskHalfInfo(orderInfo.sender?.email) || "Không có"}</span></p>
                                <p className="flex"><span className="min-w-56">Điện thoại:</span> <span className="font-medium">{setId ? orderInfo.sender?.phone : maskHalfInfo(orderInfo.sender?.phone) || "Không có"}</span></p>
                                <p className="flex"><span className="min-w-56">Địa chỉ:</span> <span className="font-medium">{setId ? orderInfo.sender?.address : maskHalfInfo(orderInfo.sender?.address) || "Không có"}</span></p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg bg-[#F8FAFC] p-3 font-semibold mb-4">NGƯỜI NHẬN</h2>
                            <div className="flex flex-col gap-3 px-3">
                                <p className="flex"><span className="min-w-56">Họ và tên:</span> <span className="font-medium">{orderInfo.receiver?.name}</span></p>
                                <p className="flex"><span className="min-w-56">Email:</span> <span className="font-medium">{setId ? orderInfo.receiver?.email : maskHalfInfo(orderInfo.receiver?.email, 3, 10)}</span></p>
                                <p className="flex"><span className="min-w-56">Điện thoại:</span> <span className="font-medium">{setId ? orderInfo.receiver?.phone : maskHalfInfo(orderInfo.receiver?.phone, 0, 4)}</span></p>
                                <p className="flex"><span className="min-w-56">Địa chỉ:</span> <span className="font-medium">{setId ? orderInfo.receiver?.address : maskHalfInfo(orderInfo.receiver?.address, 0, 16)}</span></p>
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

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold mb-4">Danh sách sản phẩm</h2>
                        {setId ? renderActionButton(orderInfo.status) : <Button color="warning">Liên hệ: 033.897.3258</Button>}
                    </div>
                    <div className="overflow-x-auto custom-scroll py-2">
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

                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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

                </div>

            </div>
        </div>
    );
}

export default OrderDetail;
