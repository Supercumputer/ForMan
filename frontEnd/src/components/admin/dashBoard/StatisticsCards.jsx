import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../utils/helper';
import { getUserCount } from '../../../apis/userApi';
import { getProductCount } from '../../../apis/productApi';
import { countOrder, totalPaymentSuccessOrder } from '../../../apis/orderApi';

function StatisticsCards() {
    const { t } = useTranslation("admin");
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async () => {
            await Promise.all([
                getUserCount(),
                getProductCount(),
                countOrder(),
                totalPaymentSuccessOrder()
            ]).then((res) => {
                setData(res);
            });
        })();
    }, []);

    return (
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-2 dark:text-[#fff] mb-4">
            <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
                <div className="flex flex-col">
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {t("sidebar.accounts")}
                    </span>
                    <span className="text-3xl font-bold">{data[0]}</span>
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {new Date().toLocaleDateString("en-GB")}
                    </span>
                </div>
                <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
                    <i className="fa-solid fa-users text-3xl m-auto"></i>
                </div>
            </div>

            <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
                <div className="flex flex-col">
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {t("sidebar.products")}
                    </span>
                    <span className="text-3xl font-bold">{data[1]}</span>
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {new Date().toLocaleDateString("en-GB")}
                    </span>
                </div>
                <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
                    <i className="fa-brands fa-product-hunt text-3xl m-auto"></i>
                </div>
            </div>

            <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
                <div className="flex flex-col">
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {t("sidebar.orders")}
                    </span>
                    <span className="text-3xl font-bold">{data[2]}</span>
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {new Date().toLocaleDateString("en-GB")}
                    </span>
                </div>
                <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
                    <i className="fa-brands fa-jedi-order text-3xl m-auto"></i>
                </div>
            </div>

            <div className="bg-[#fff] dark:bg-slate-800 p-5 flex justify-between items-center rounded-md">
                <div className="flex flex-col">
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        Tổng tài khoản
                    </span>
                    <span className="text-3xl font-bold">{formatNumber(+data[3])}</span>
                    <span className="text-lg text-[#5A5A5A] dark:text-[#bbb]">
                        {new Date().toLocaleDateString("en-GB")}
                    </span>
                </div>
                <div className="w-16 h-16 flex bg-[#F3F4F7] dark:bg-slate-900 rounded-md">
                    <i className="fa-solid fa-money-check-dollar text-3xl m-auto"></i>
                </div>
            </div>
        </div>
    )
}

export default StatisticsCards
