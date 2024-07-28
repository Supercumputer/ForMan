import React from 'react'
import { apiDeleteAddress, apiUpdateDefaultAddress } from '../../apis/axios';
import { toast } from 'react-toastify';

function AddressItem({address, handlerEditAddress, setIsChangeAddress, isChangeAddress}) {

    const handlerChangeDefault = async (id) => {
        try {
            const res = await apiUpdateDefaultAddress(id)
          
            if (res && res.status) {
                toast.success(res.message);
                setIsChangeAddress(!isChangeAddress)
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteAddress = async (id) => {
        try {
            const res = await apiDeleteAddress(id)
        
            if (res && res.status) {
                toast.success(res.message);
                setIsChangeAddress(!isChangeAddress)
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-b border-b-[#e4e3e3] last:border-b-0 pb-4 mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-semibold">{address.name}</h2>
                    <p>{`(+84) ${address.phone}`}</p>
                    <p>{address.address}</p>
                    {address.isDefault && <span className="text-red-500 font-semibold">Default</span>}
                </div>

                <div className="flex space-x-2">
                    <button className="text-blue-500" onClick={() => handlerEditAddress(address)}>Edit</button>
                    <button
                        className="text-red-500"
                        onClick={() => handleDeleteAddress(address._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <button
                className={`mt-2 px-4 py-2 rounded ${address.isDefault ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                onClick={() => handlerChangeDefault(address._id)}
                disabled={address.isDefault}
            >
                {address.isDefault ? 'Default' : 'Set as default'}
            </button>
        </div>
    )
}

export default AddressItem
