import React, { useEffect, useState } from 'react'
import { apiGetCommune, apiGetDistrict, apiGetFullAddress, apiGetProvinces } from '../../apis/axios';

function AddressSelector({ setFullAddress }) {
    const [tinh, setTinh] = useState([]);

    const [huyen, setHuyen] = useState([]);

    const [xa, setXa] = useState([]);

    const callApiTinh = async () => {
        try {
            const res = await apiGetProvinces();

            if (res && res.data.data && res.status === 200) {
                setTinh(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    };
    const callApiHuyen = async (id) => {
        try {
            const res = await apiGetDistrict(id);

            if (res && res.data.data && res.status === 200) {
                setHuyen(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    };
    const callApiFullAddress = async (id) => {
        try {
            const res = await apiGetFullAddress(id);

            if (res && res.data.data && res.status === 200) {
                setFullAddress(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    };
    const callApiXa = async (id) => {
        try {
            const res = await apiGetCommune(id);

            if (res && res.data.data && res.status === 200) {
                setXa(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    };
    const handlerChangeTinh = (e) => {
        const id = e.target.value;
        if (id) callApiHuyen(id);
    };
    const handlerChangeHuyen = (e) => {
        const id = e.target.value;
        if (id) callApiXa(id);
    };
    const handlerChangeXa = (e) => {
        const id = e.target.value;
        if (id) callApiFullAddress(id);
    };
    useEffect(() => {
        callApiTinh();
    }, []);

    return (

        <div class="grid grid-cols-3 gap-3">
            <select id="countries" onChange={handlerChangeTinh} class="bg-gray-50 border bg-transparent border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-0 focus:border-[#1F2937] block w-full px-2.5 py-3">
                <option selected value={""}>Tỉnh Thành</option>
                {tinh.map((item) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <select id="countries" onChange={handlerChangeHuyen} class="bg-gray-50 border bg-transparent border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-0 focus:border-[#1F2937] block w-full px-2.5 py-3">
                <option selected value={""}>Quận Huyện</option>
                {huyen.map((item) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <select id="countries" onChange={handlerChangeXa} class="bg-gray-50 border bg-transparent border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-0 focus:border-[#1F2937] block w-full px-2.5 py-3">
                <option selected value={""}>Phường Xã</option>
                {xa.map((item) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>

    )
}

export default AddressSelector
