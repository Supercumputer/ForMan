import React, { useState } from 'react';
import { InputOutlined, OrderDetail } from '../../components/clientComponent';
import { apiGetOrderById } from '../../apis/axios';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';

const OrderLookup = () => {

    const [orderId, setOrderId] = useState("");
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const handlerLookUpOrder = async () => {
        try {
            setErr(false);
            if (!orderId) {
                toast.error("Vui lòng nhập mã đơn hàng của bạn!");
                return;
            }

            setLoading(true);
            const res = await apiGetOrderById(orderId);

            if (res && res.status) {
                setId(res.order._id);
                setOrderId("");
            } else {
                setId("");
                setErr(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto lg:px-[8%] px-2 my-5 ">
            <h1 className="text-2xl font-bold mb-4 text-center">TRA CỨU ĐƠN HÀNG</h1>
            <p className="text-center mb-4 max-w-md mx-auto">Để theo dõi đơn hàng vui lòng nhập <span className="font-bold">Số điện thoại</span> và <span className="font-bold">Mã khách hàng</span> vào ô bên dưới rồi nhấn nút Tìm kiếm.</p>
            <div className="mb-4 flex gap-2 justify-center">
                <InputOutlined
                    label='Mã đơn hàng'
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <Button
                    isProcessing={loading}
                    color="dark"
                    onClick={handlerLookUpOrder}
                >
                    Tìm kiếm
                </Button>

            </div>

            {
                err ? <p className="text-center text-red-500">Rất tiếc chúng tôi không tìm thấy đơn hàng của bạn vui lòng thử lại.</p> : null
            }

            {
                id && <OrderDetail id={id} />
            }

        </div>
    );
};

export default OrderLookup;
