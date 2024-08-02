import { useEffect, useState } from 'react';
import InputOutlined from './InputOutlined'
import AddressSelector from './AddressSelector';
import { apiGetDefaultAddress } from '../../apis/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ account, register, errors, reset }) => {

    const [thx, setThx] = useState({})
    const navigate = useNavigate()

    const callApiGetDefaultAddress = async (id) => {
        try {
            const res = await apiGetDefaultAddress(id);
            console.log(res);
            if (res && res.status && res.address) {
                reset(res.address);
            }else{
                toast.error("Cần it nhất 1 địa chỉ nhận hàng.")
                navigate('/account')
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (account.id) {
            callApiGetDefaultAddress(account.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    useEffect(() => {
        reset({ address: thx.full_name });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thx.full_name]);

    return (
        <div className="flex-1">
            <h1 className="font-semibold text-xl border-b pb-3 mb-3">
                Thông tin nhận hàng
            </h1>
            <div className="flex flex-col gap-3">

                <InputOutlined readOnly={!!account.id} register={register("name")} label="Họ Và tên" errors={errors?.name?.message} />
                <InputOutlined readOnly={!!account.id} register={register("email")} label="Email" errors={errors?.email?.message} />
                <InputOutlined readOnly={!!account.id} register={register("phone")} label="Phone" errors={errors?.phone?.message} />

                {!account.id &&
                    <AddressSelector setFullAddress={setThx} label="Address" />
                }
                {
                    (Object.keys(thx).length > 0 || account.id) &&
                    <InputOutlined register={register("address")} readOnly label="Địa chỉ đầy đủ" errors={errors?.address?.message} />
                }

                <textarea id="message"{...register("note")} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-0 focus:border-[#1F2937] bg-transparent" placeholder="Ghi chú"></textarea>
            </div>
        </div>
    )
}

export default CheckoutForm
