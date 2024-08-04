import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import {
    Checkbox,
    Table,
    Button,
    Dropdown,
    Breadcrumb,
    Pagination,
    Select,
} from "flowbite-react";
import { ButtonPro, Img } from "../../../components/common";
import {
    apiRestoreProduct,
    apiDestroyProduct,
    apiDestroysProduct,
    apiGetAllProductTrash,
} from "../../../apis/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helper";

const ListProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState([]);
    const [dataCheck, setDataCheck] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    
    const onPageChange = (page) => setCurrentPage(page);

    const { t } = useTranslation("admin");

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

    const callApiGetAllProduct = async (limit, currentPage, keyword) => {
        try {
            console.log(keyword);
            
            const res = await apiGetAllProductTrash(`?limit=${limit}&page=${currentPage}&name=${keyword}`);

            if (res && res.status) {
                console.log(res);
                
                setTotalPages(res.totalPages);
                setCurrentPage(res.currentPage)
                setData(res.products);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlerDelete = async (id) => {
        try {
            const res = await apiDestroyProduct(id);

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

    const handlerDeletes = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (dataCheck.length === 0) {
                        toast.error("Please select user to delete");
                        return;
                    }

                    const res = await apiDestroysProduct(dataCheck);

                    if (res && res.status) {
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                        callApiGetAllProduct(limit, currentPage, keyword);
                    } else {
                        toast.error(res?.message);
                    }
                } catch (error) {
                    toast.error(error);
                }
            }
        });
    };

    useEffect(() => {
        callApiGetAllProduct(limit, currentPage, keyword);
    }, [limit, currentPage, keyword]);

    const handlerRestore = async (id) => {
        try {
            const res = await apiRestoreProduct(id);
            if (res && res.status) {
                toast.success(res.message);
                callApiGetAllProduct(limit, currentPage, keyword);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Breadcrumb aria-label="Default breadcrumb example " className="mb-4">
                <Breadcrumb.Item href="#" icon={HiHome}>
                    Products
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">Inventory</Breadcrumb.Item>
                <Breadcrumb.Item>Manager</Breadcrumb.Item>
            </Breadcrumb>

            <div className="rounded-md p-2 bg-[#fff] dark:bg-slate-800">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
                    <Dropdown
                        label="Actions"
                        dismissOnClick={false}
                        renderTrigger={() => (
                            <Button color="light">{t("fields.actions")}</Button>
                        )}
                    >
                        <Dropdown.Item onClick={handlerDeletes}>Delete</Dropdown.Item>
                    </Dropdown>
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            type="text"
                            id="table-search-products"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for products"
                        />
                    </div>
                </div>

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
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="p-4">
                                        <Checkbox
                                            checked={dataCheck.includes(item?._id)}
                                            onChange={() => handleCheckbox(item?._id)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{item.code}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item?.category.map(item => item.categoryName).join(", ") ?? "Chưa xác định"}</Table.Cell>
                                    <Table.Cell>{item?.brand.brandName ?? "Chưa xác định"}</Table.Cell>
                                    <Table.Cell>{item.views}</Table.Cell>
                                    <Table.Cell>{formatDate(item.createdAt || Date.now())}</Table.Cell>
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
                                                onClick={() => handlerRestore(item._id)}
                                                name={<i class="fa-solid fa-trash-can-arrow-up"></i>}
                                                className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-green-900"
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
        </>
    );
};

export default ListProduct;
