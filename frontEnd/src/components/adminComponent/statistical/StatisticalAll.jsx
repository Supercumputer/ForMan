import { Badge, Pagination, Select, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Img } from '../../common'
import { useTranslation } from 'react-i18next';
import { apiGetAllVariants } from '../../../apis/axios';
import { calculateSalePrice, formatDate, formatNumber } from '../../../utils/helper';
import { Link } from 'react-router-dom';
import { pathAdmin } from '../../../utils/path';
import { useSelector } from 'react-redux';
function StatisticalAll({ active }) {

    const { t } = useTranslation("admin");
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const onPageChange = (page) => setCurrentPage(page);
    const { isChange } = useSelector(state => state.statistical)

    const callApiGetAllVariant = async () => {
        try {
            const res = await apiGetAllVariants(`?limit=${limit}&page=${currentPage}&type=${active}&sort=${active === 'tonkho' ? 'desc' : 'asc'}`);
            if (res && res.status) {
                setData(res.variants);
                setTotalPages(res.totalPages);
                setCurrentPage(res.currentPage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callApiGetAllVariant();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, currentPage, limit, isChange]);

    return (
        <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">
            <div className="overflow-x-auto border-b border-[#ccc] py-2">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>MBT</Table.HeadCell>
                        <Table.HeadCell>{t("fields.image")}</Table.HeadCell>
                        <Table.HeadCell>{t("fields.productName")}</Table.HeadCell>
                        <Table.HeadCell>Giá</Table.HeadCell>
                        <Table.HeadCell>Sale</Table.HeadCell>
                        <Table.HeadCell>Ngày tạo</Table.HeadCell>
                        <Table.HeadCell className='text-nowrap'>Tồn kho</Table.HeadCell>
                        <Table.HeadCell className='text-nowrap'>Giá trị tồn kho</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data && data.map((item, index) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell>
                                    <Link to={`${pathAdmin.products}/${item.product_id?._id}/variants`} className='text-blue-500 font-semibold'>{item.mbt}</Link>
                                    <Badge size="sm" className='text-nowrap mt-1' color={item.quantity > 10 ? "success" : (item.quantity > 0 ? "warning" : "failure")}>
                                        {item.quantity > 10 ? "Bình thường" : (item.quantity > 0 ? "Sắp hết hàng" : "Đã hết hàng")}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='w-20 h-20'>
                                        <Img
                                            src={item.images[0]}
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{item.product_id?.name}</Table.Cell>
                                <Table.Cell>{formatNumber(item.price)}đ</Table.Cell>
                                <Table.Cell>{item.sale}%</Table.Cell>
                                <Table.Cell>{formatDate(item.createdAt || new Date())}</Table.Cell>
                                <Table.Cell>{item.quantity}</Table.Cell>
                                <Table.Cell className='font-semibold text-red-500'>{formatNumber(calculateSalePrice(item.price, item.sale) * item.quantity)}đ</Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-2 ">
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

export default StatisticalAll
