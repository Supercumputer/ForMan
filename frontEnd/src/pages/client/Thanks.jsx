import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteAllCart, apiSendMailOrder, apiUpdateDiscountByCode, apiUpdateOrder, apiUpdateQuantityVariant } from '../../apis/axios';
import { setCarts } from '../../redux/cart';
import { Spinner } from 'flowbite-react';
import { pathClient } from '../../utils/path';

function Thanks() {
    const { carts } = useSelector((state) => state.cart);
    const { account, isLoading } = useSelector((state) => state.auth);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("paymentStatus");
    const type = searchParams.get("type");

    const isSuccess = status === '00';

    useEffect(() => {
        if (isLoading) return;
        setLoading(true);
        if (isSuccess) {
            (async () => {
                if (account && account?.id) {
                    await apiDeleteAllCart(account?.id);
                    const res = await apiUpdateOrder(orderId, { status: "Confirmed", status_payment: type === 'COD' ? "Unpaid" : "Paid" });

                    if (res && res.status) {
                        await apiSendMailOrder(res.data)
                    }
                } else {
                    await apiUpdateQuantityVariant(carts)
                    sessionStorage.removeItem('carts')

                    const res = await apiUpdateOrder(orderId, { status_payment: type === 'COD' ? "Unpaid" : "Paid" });

                    if (res && res.status) {
                        await apiSendMailOrder(res.data)
                    }
                }

                dispatch(setCarts([]));
                setLoading(false);
            })()
        } else {
            (async () => {
                const res = await apiUpdateOrder(orderId, { status: "Failure" });

                if (res && res.status) {
                    await apiUpdateDiscountByCode({ user_id: res.data.user_id }, res.data.discount)
                }

                setLoading(false);
            })()
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isLoading]);

    return (
        <>
            {loading ? <div className="h-screen w-screen flex justify-center items-center">
                <Spinner aria-label="Center-aligned spinner example" size="xl" />
            </div> :
                <div>
                    {isSuccess && <Confetti />}
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                            <div className={`text-6xl mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                                {isSuccess ?
                                    <i className="fa-solid fa-circle-check"></i>
                                    :
                                    <i className="fa-solid fa-circle-xmark"></i>
                                }
                            </div>
                            <h1 className={`text-3xl font-bold mb-4 ${isSuccess ? 'text-gray-800' : 'text-red-600'}`}>
                                {type === 'COD' ? (isSuccess ? 'Đặt hàng thành công' : 'Đặt hàng thất bại') : (isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!')}
                            </h1>
                            <p className="text-lg mb-4 text-gray-700">
                                Mã số đơn hàng của bạn là: <span className="font-bold text-gray-900">{orderId}</span>
                            </p>
                            <p className={`text-md mb-6 ${isSuccess ? 'text-gray-600' : 'text-red-500'}`}>

                                {isSuccess ? (account && account?.id ? 'Thông tin chi tiết về đơn hàng của bạn sẽ được gửi về email của bạn.' : 'Vui lòng kiểm tra email và bấm xác nhận đơn hàng của bạn')
                                    :
                                    'Vui lòng kiểm tra lại thông tin thanh toán của bạn hoặc thử lại sau.'
                                }
                            </p>
                            <p className={`text-lg mb-8 ${isSuccess ? 'text-gray-600' : 'text-red-600'}`}>
                                {isSuccess ? 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.' : 'Chúng tôi rất tiếc về sự bất tiện này.'}
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Link
                                    className={`px-4 py-2 ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white font-semibold rounded-lg transition duration-300`}
                                    to={pathClient.orderLookUp}
                                >
                                    {isSuccess ? 'Tra cứu đơn hàng' : 'Quay lại trang chủ'}
                                </Link>
                                {isSuccess && (
                                    <Link
                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                                        to="/"
                                    >
                                        Quay lại trang chủ
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Thanks;
