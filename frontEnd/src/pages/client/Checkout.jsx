import { useEffect } from "react";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckoutForm, CheckoutInfo } from "../../components/clientComponent";
import { useNavigate } from "react-router-dom";
import { apiCreateOrder, apiCreatePaymentUrlVnpay } from "../../apis/axios";
import { toast } from "react-toastify";


const schema = z.object({
    name: z.string().min(1, { message: "Full name không được để trống." }),
    email: z.string().email({ message: "Email không hợp lệ." }),
    phone: z.string().min(1, { message: "Số điẹn thoại không hợp lệ." }),
    address: z.string().min(1, { message: "Address không hợp lệ." }),
    note: z.string().optional(),
    discount: z.string().optional(),
    delivery: z.string().optional(),
    total_payment: z.string().optional(),
});

function Checkout() {

    const { carts } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        if (carts.length <= 0) navigate("/carts");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { account } = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        try {
            const newData = { carts, user_id: account?.id, ...data };

            const res = await apiCreateOrder(newData);

            if (res && res.status) {
                switch (data.delivery) {
                    case "COD":
                        navigate(`/thanks?orderId=${res.data._id}&paymentStatus=00&type=COD`);
                        break;

                    case "VNPAY":
                        const resVnpay = await apiCreatePaymentUrlVnpay({ ...data, order_id: res.data._id });

                        const paymentUrl = resVnpay.paymentUrl;

                        if (paymentUrl) {
                            window.location.href = paymentUrl;
                        }

                        break;
                    case "MOMO":
                        
                        break;

                    default:
                        break;
                }

            }else{
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row lg:px-[8%] px-2 lg:my-10 my-5 gap-10 font-roboto"
        >
            <CheckoutForm register={register} account={account} errors={errors} reset={reset} />
            <CheckoutInfo register={register} reset={reset} />
        </form>
    );
}

export default Checkout;
