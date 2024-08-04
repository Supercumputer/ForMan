import React, { useEffect, useState } from 'react'
import { InputField } from '../../common'
import { Button, Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { pathAdmin } from '../../../utils/path'
import { useTranslation } from 'react-i18next'
import { apiExportExcelProducts, apiGetAllBrand, apiGetAllCategory } from '../../../apis/axios'
import { toast } from 'react-toastify'
import ExportCsv from '../ExportCsv'

function Filter({ handlerDeletes, filter, setFilter, data }) {
    const { t } = useTranslation("admin");
    const [categorys, setCategorys] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        (async () => {
            const [categorys, brands] = await Promise.all([
                apiGetAllCategory(),
                apiGetAllBrand()
            ])

            setCategorys(categorys.categories)
            setBrands(brands.brands)
        })()
    }, [])

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-2">
            <div className="flex items-center gap-2">

                <InputField
                    icon={<i class="fa-solid fa-magnifying-glass"></i>}
                    value={filter.keyword}
                    onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                    placeholder="Search..."
                />

                <select
                    id="small"
                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                >
                    <option selected value={""}>All category</option>
                    {categorys?.map((item, index) => (
                        <option key={index} value={item._id}>{item.categoryName}</option>
                    ))}
                </select>

                <select
                    id="small"
                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
                >
                    <option selected value={""}>All Brand</option>
                    {brands?.map((item, index) => (
                        <option key={index} value={item._id}>{item.brandName}</option>
                    ))}

                </select>
                <InputField
                    value={filter.createdAt}
                    onChange={(e) => setFilter({ ...filter, createdAt: e.target.value })}
                    type={"date"}
                />
            </div>

            <div className="flex items-center gap-2">
                <Dropdown
                    label="Actions"
                    dismissOnClick={false}
                    renderTrigger={() => (
                        <Button color="light">{t("fields.actions")}</Button>
                    )}
                >
                    <Dropdown.Item>
                        <Link to={`${pathAdmin.products}/create`}>Create</Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handlerDeletes}>Delete</Dropdown.Item>
                    <Dropdown.Item><ExportCsv csvData={data} fileName="products"/></Dropdown.Item>
                </Dropdown>
                <Link to={pathAdmin.productsTrash} className="text-blue-500 underline"><Button>Thùng rác</Button></Link>
            </div>
        </div>
    )
}

export default Filter
