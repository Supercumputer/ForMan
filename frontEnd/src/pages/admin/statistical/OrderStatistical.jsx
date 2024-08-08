import { useState } from "react";

import { StatisticalOrder } from "../../../components/admin/statistical";

function ListOrder() {

    const [active, setActive] = useState('all');

    return (
        <>
            <div className="border-b border-gray-200 bg-[#fff] rounded-md dark:border-gray-700 mb-3">
                <ul className="flex flex-wrap -mb-px text-sm font-mediumtext-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        <button onClick={() => setActive('all')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'all' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Tất cả
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Pending')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Pending' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Chờ xác nhận
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Confirmed')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Confirmed' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Đã xác nhận
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Preparing')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Preparing' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Đang chuẩn bị
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Shipping')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Shipping' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Đang giao
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Delivered')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Delivered' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} `}>
                            Đã giao
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Completed')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Completed' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
                            Thành công
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Failure')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Failure' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
                            Thất bại
                        </button>
                    </li>
                    <li className="me-2">
                        <button onClick={() => setActive('Cancelled')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'Cancelled' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
                            Đã hủy
                        </button>
                    </li>
                </ul>
            </div>

            <StatisticalOrder active={active} />
        </>
    );
}

export default ListOrder;
