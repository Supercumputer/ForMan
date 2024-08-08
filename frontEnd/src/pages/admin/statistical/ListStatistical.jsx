import { useState } from "react";
import { StatisticalAll } from "../../../components/admin/statistical";

const ListProduct = () => {
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
            <button onClick={() => setActive('tonkho')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'tonkho' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
              Tồn kho
            </button>
          </li>
          <li className="me-2">
            <button onClick={() => setActive('banchay')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'banchay' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
              Bán chạy
            </button>
          </li>
          <li className="me-2">
            <button onClick={() => setActive('dahethang')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'dahethang' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
              Đã hết hàng
            </button>
          </li>
          <li className="me-2">
            <button onClick={() => setActive('saphethang')} className={`flex items-center gap-2 justify-center p-4 border-b-2 ${active === 'saphethang' ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} group`}>
              Sắp hết hàng
            </button>
          </li>
        </ul>
      </div>

      <StatisticalAll active={active}/>
    
    </>
  );
};

export default ListProduct;
