import { Checkbox, Pagination, Select, Table } from 'flowbite-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ButtonPro } from '../../common';
import { formatDate } from '../../../utils/helper';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import pathAdmin from '../../../utils/pathAdmin';
import { softDeleteProduct } from '../../../apis/productApi';

function ListProduct({ data, currentPage, limit, totalPages, onPageChange, setLimit, dataCheck, setDataCheck, callApiGetAllProduct }) {
    const { t } = useTranslation("admin");
    
    const [checkAll, setCheckAll] = useState(false);

    const handlerDelete = async (id) => {
        try {
            const res = await softDeleteProduct(id);

            if (res && res.status) {
                Swal.fire("Deleted!", res.message, "success");
                callApiGetAllProduct();
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleCheckbox = (id) => {
        setDataCheck((prev) => {
            if (prev.includes(id)) {
                setCheckAll(false);
                return prev.filter((item) => item !== id);
            } else {
                const newDataCheck = [...prev, id];

                if (newDataCheck.length === data.length) {
                    setCheckAll(true);
                }

                return newDataCheck;
            }
        });
    };

    const handleCheckAll = () => {
        setCheckAll(!checkAll);
        if (!checkAll) {
            setDataCheck(data.map((item) => item._id));
        } else {
            setDataCheck([]);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto border-y border-[#ccc] py-2">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="p-4">
                            <Checkbox checked={checkAll} onChange={handleCheckAll} />
                        </Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">MSP</Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">
                            {t("fields.productName")}
                        </Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">
                            {t("fields.category")}
                        </Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">
                            {t("fields.brand")}
                        </Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">
                            {t("fields.views")}
                        </Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">
                            {t("fields.createdAt")}
                        </Table.HeadCell>
                        <Table.HeadCell className="text-nowrap">
                            {t("fields.actions")}
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data?.map((item) => (
                            <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox
                                        checked={dataCheck.includes(item._id)}
                                        onChange={() => handleCheckbox(item._id)}
                                    />
                                </Table.Cell>
                                <Table.Cell>{item.code}</Table.Cell>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.category.map(item => item.categoryName).join(", ") ?? "Chưa xác định"}</Table.Cell>
                                <Table.Cell>{item.brand.brandName ?? "Chưa xác định"}</Table.Cell>
                                <Table.Cell>{item.views}</Table.Cell>
                                <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-2">
                                        <ButtonPro
                                            type="button"
                                            dataId={item._id}
                                            actionDelete={handlerDelete}
                                            name={<i className="fa-solid fa-trash"></i>}
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        />

                                        <ButtonPro
                                            to={`${pathAdmin.products}/${item._id}/edit`}
                                            name={<i className="fa-solid fa-pen-to-square"></i>}
                                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
                                        />

                                        <ButtonPro
                                            to={`${pathAdmin.products}/${item._id}/variants`}
                                            name={<i className="fa-solid fa-eye"></i>}
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        />
                                    </div>
                                </Table.Cell>
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

export default ListProduct
