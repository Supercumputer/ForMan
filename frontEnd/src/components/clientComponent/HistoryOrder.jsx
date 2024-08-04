import { Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { apiGetOrderByUserId } from '../../apis/axios';
import { useSelector } from 'react-redux';
import { formatDate, formatNumber } from '../../utils/helper';
import { Link } from 'react-router-dom';
import OrderDetail from './OrderDetail';

function HistoryOrder() {
    const [data, setData] = useState([]);

    const { account } = useSelector((state) => state.auth);

    const [id, setId] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await apiGetOrderByUserId(account?.id);

                if (res && res.status) {
                    setData(res.orders);
                }

            } catch (error) {
                console.log(error);
            }
        })()
    }, [account?.id]);

    return (
        <div>

            {id ?
                <OrderDetail id={id} setId={setId} />
                :
                <div>
                    <h1 className="font-semibold text-2xl mb-6">Lịch sử đơn hàng</h1>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>STT</Table.HeadCell>
                                <Table.HeadCell>Mã Đơn</Table.HeadCell>
                                <Table.HeadCell>Ngày Tạo</Table.HeadCell>
                                <Table.HeadCell>Tổng Giá</Table.HeadCell>
                                <Table.HeadCell>Trạng thái</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Detail</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {index + 1}
                                        </Table.Cell>
                                        <Table.Cell>{item._id}</Table.Cell>
                                        <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                                        <Table.Cell>{formatNumber(item.total_payment)}đ</Table.Cell>
                                        <Table.Cell>{item.status}</Table.Cell>
                                        <Table.Cell onClick={() => setId(item._id)}><i class="fa-solid fa-angle-right hover:text-blue-500 hover:transform hover:scale-150"></i></Table.Cell>
                                    </Table.Row>

                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </div>
            }
        </div>
    )
}

export default HistoryOrder
