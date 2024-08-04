import { Badge, Datepicker, Pagination, Select, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { formatDate, formatNumber } from '../../../utils/helper';
import { apiGetAllOrdersStatistic } from '../../../apis/axios';
import { InputField } from '../../common';

function StatisticalOrder({ active }) {

    const { t } = useTranslation("admin");
    const onPageChange = (page) => setCurrentPage(page);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(5);

    const callApiGetAllOrders = async (currentPage, limit, active, startDate, endDate) => {
        try {
            const res = await apiGetAllOrdersStatistic(`?limit=${limit}&page=${currentPage}&status=${active}&startDate=${startDate}&endDate=${endDate}`);

            if (res && res.status) {
                // console.log(res);
                setData(res.orders);
                setCurrentPage(res?.currentPage);
                setTotalPages(res?.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callApiGetAllOrders(currentPage, limit, active, startDate, endDate);
    }, [currentPage, limit, active, startDate, endDate]);

    return (
        <div className="rounded-md p-2 bg-white dark:bg-slate-800">
            <div className="flex gap-2 items-center mb-2 max-w-md">
                <InputField
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                />
                To
                <InputField
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                />
            </div>
            <div className="overflow-x-auto border-y border-[#ccc] py-2">
                <Table hoverable>
                    <Table.Head>

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

                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data?.map((item) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell className="font-semibold text-green-500">{item?._id}</Table.Cell>
                                <Table.Cell>{formatDate(item?.createdAt)}</Table.Cell>
                                <Table.Cell>{item?.discount || "Không có"}</Table.Cell>
                                <Table.Cell>{formatNumber(+item?.total_payment)}</Table.Cell>
                                <Table.Cell>{item?.delivery}</Table.Cell>
                                <Table.Cell>
                                    <Badge
                                        size="sm"
                                        color={(item?.status === "Completed" || item?.status === "Completed")  
                                            ? "success" : ((item?.status === "Failure" || item?.status === "Cancelled") ? "failure" : "dark")}
                                    >
                                        {item?.status}
                                    </Badge>
                                </Table.Cell>

                            </Table.Row>
                        ))}

                    </Table.Body>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="max-w-md">
                    <Select
                        onChange={(e) => setLimit(Number(e.target.value))}
                        value={limit}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </Select>
                </div>

                <div className="flex overflow-x-auto sm:justify-center">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default StatisticalOrder
