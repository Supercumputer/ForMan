import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { apiCreateAddress, apiDeleteAddress, apiGetAllAddress, apiGetCommune, apiGetDistrict, apiGetFullAddress, apiGetProvinces, apiUpdateAddress, apiUpdateDefaultAddress } from '../../apis/axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Img } from "../common/"
import InputOutlined from './InputOutlined';
import AddressSelector from './AddressSelector';
import AddressItem from './AddressItem';
import { noAddress } from '../../assets/images';

const schema = z.object({
    name: z.string().min(1, { message: "Full name không được để trống." }),
    email: z.string().email({ message: "Email không hợp lệ." }),
    phone: z.string().min(1, { message: "Số điẹn thoại không hợp lệ." }),
    address: z.string().min(1, { message: "Address không hợp lệ." }),
});

function AddressDelivery() {
    const [openModal, setOpenModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [idAddress, setIdAddress] = useState('')
    const [isChangeAddress, setIsChangeAddress] = useState(false)
    const { account } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [thx, setThx] = useState({})

    const handlerCloseModal = () => {
        setOpenModal(false)
        setIdAddress('')
        reset({
            name: '',
            email: '',
            phone: '',
            address: ''
        })
    }

    const handleEditAddress = async (data) => {
        reset(data)
        setOpenModal(true)
        setIdAddress(data._id)
    };

    useEffect(() => {
        reset({ address: thx.full_name });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thx.full_name]);

    const onSubmit = async (data) => {
        try {
            const res = await (
                idAddress ? apiUpdateAddress(idAddress, data) :
                    apiCreateAddress({ ...data, user_id: account?.id }));

            if (res && res.status) {
                toast.success(res.message);
                setIsChangeAddress(!isChangeAddress)
                handlerCloseModal()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const callApiGetAllAddress = async () => {
        try {
            const res = await apiGetAllAddress(account?.id);
            if (res && res.status) {
                setAddresses(res.addresses);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callApiGetAllAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChangeAddress]);

    return (
        <div>
            <div className='flex justify-between items-center border-b pb-3'>
                <h1 className="font-semibold text-2xl">Địa chỉ giao hàng</h1>
                <Button size="md" isProcessing={false} color="dark" onClick={() => setOpenModal(true)}>
                    <div className="flex items-center gap-2"><i class="fa-solid fa-plus"></i><span>Create new address</span></div>
                </Button>
            </div>

            <div className="pt-4 rounded-lg">
                {addresses.length > 0 ?
                    addresses.map((address, index) => (
                        <AddressItem
                            address={address}
                            key={index}
                            handlerEditAddress={handleEditAddress}
                            isChangeAddress={isChangeAddress}
                            setIsChangeAddress={setIsChangeAddress} />
                    )) : <div className='flex justify-center'><Img src={noAddress} /></div>
                }
            </div>

            <Modal show={openModal} size="lg" onClose={handlerCloseModal} popup>
                <Modal.Header className='border-b px-4'>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{idAddress ? 'Edit' : 'Create'} Address</h3>
                </Modal.Header>

                <Modal.Body>
                    <form className="pt-5 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

                        <InputOutlined register={register("name")} label="Họ Và tên" errors={errors?.name?.message} />
                        <InputOutlined register={register("email")} label="Email" errors={errors?.email?.message} />
                        <InputOutlined register={register("phone")} label="Phone" errors={errors?.phone?.message} />
                        <AddressSelector setFullAddress={setThx} label="Address" />

                        <InputOutlined register={register("address")} readOnly label="Địa chỉ đầy đủ" errors={errors?.address?.message} />

                        <div className="flex justify-end gap-4">
                            <Button color="gray" onClick={handlerCloseModal}>
                                Cancel
                            </Button>

                            <Button color="dark" type='submit' >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default AddressDelivery
