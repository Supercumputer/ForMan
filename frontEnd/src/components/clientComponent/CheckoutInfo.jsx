import { Button } from 'flowbite-react'
import { useMemo, useState } from 'react'
import CartItem from './CartItem'
import { useSelector } from 'react-redux';
import InputOutlined from './InputOutlined';
import { apiGetDiscountByCode } from '../../apis/axios';
import { toast } from 'react-toastify';
import { calculateSalePrice, formatNumber } from '../../utils/helper';

function CheckoutInfo({ register, reset }) {

    const { carts } = useSelector((state) => state.cart);
    const [discount, setDiscount] = useState({});
    const [discountValue, setDiscountValue] = useState("");

    const total = useMemo(() => {
        return calculateSalePrice(carts.reduce((acc, item) => {
            return (
                acc +
                (calculateSalePrice(item.variant_id.price, item.variant_id.sale) ||
                    item.variant_id.price) *
                item.quantity
            );
        }, 0), discount.percentage || 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts, discount]);

    const handlerCheckDiscount = async () => {
        try {
            const res = await apiGetDiscountByCode(discountValue);

            if (res && res.status) {
                setDiscount(res.discount);
                reset({ discount: res.discount.code });
            } else {
                toast.error(res.message);
                setDiscount({});
                reset({ discount: "" });
            }
            setDiscountValue("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex-1">

            <ul class="divide-gray-200 border-b mb-5">
                {carts?.map((item) => (
                    <CartItem item={item} isBtnQuantity={false} />
                ))}
            </ul>

            <div className="flex items-center gap-3 pb-5 border-b mb-5">
                <div className="flex-1">
                    <InputOutlined label="Mã giảm giá" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
                    <input type='hidden' {...register('discount')} />
                </div>

                <Button
                    type='button'
                    size="lg"
                    isProcessing={false}
                    color={"dark"}
                    className="text-nowrap"
                    onClick={handlerCheckDiscount}
                >
                    Áp dụng
                </Button>
            </div>

            <div className="flex flex-col gap-3 pb-5 border-b mb-5">
                <div className="flex justify-between">
                    <span className="font-semibold">Tạm tính: </span>
                    <span className="text-red-500 font-semibold">0 VND</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold">Phí vận chuyển: </span>
                    <span className="text-red-500 font-semibold">0 VND</span>
                </div>

                {
                    discount.code &&
                    <div className="flex justify-between">
                        <span className="font-semibold">Mã giảm giá: </span>
                        <span className="font-semibold text-green-500">{`${discount.code} - ${discount.percentage}%`}</span>
                    </div>
                }

                <div className="flex flex-col">
                    <span className="font-semibold mb-3">Hình thức thanh toán: </span>

                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-license" checked type="radio" name="delivery" {...register('delivery')} value="COD" class="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#1F2937] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">COD</label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-id" type="radio" name="delivery" {...register('delivery')} value="VNPAY" class="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#1F2937] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">VnPay</label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-military" type="radio" name="delivery" {...register('delivery')} value="MOMO" class="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#1F2937] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="horizontal-list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">MoMo</label>
                            </div>
                        </li>
                        <li class="w-full dark:border-gray-600">
                            <div class="flex items-center ps-3">
                                <input id="horizontal-list-radio-passport" type="radio" name="delivery" {...register('delivery')} value="VISA" class="w-4 h-4 text-[#1F2937] bg-gray-100 border-gray-300 focus:ring-[#1F2937] dark:focus:ring-[#1F2937] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="horizontal-list-radio-passport" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Visa</label>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
            <div className="flex justify-between">
                <span className="font-bold text-xl">Tổng thanh toán: </span>
                <span className="text-2xl text-red-500 font-bold">{formatNumber(total)} VND</span>
                <input type="hidden" {...register('total_payment')} value={total} />
            </div>

            <Button
                type="submit"
                size="lg"
                isProcessing={false}
                color={"dark"}
                className="w-full mt-5 text-nowrap"
            >
                Thanh toán
            </Button>
        </div>
    )
}

export default CheckoutInfo
