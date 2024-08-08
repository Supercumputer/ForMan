
import { Link } from 'react-router-dom'
import { calculateSalePrice, formatNumber } from '../../utils/helper'
import QuantityButton from './QuantityButton'
import { useDispatch, useSelector } from 'react-redux';
import { setCarts, setIsLoadCart } from '../../redux/cart';
import { Img } from '../common';
import { deleteCart, updateCartQuantity } from '../../apis/cartApi';

function CartItem({ item, isBtnDelete = true, isBtnQuantity = true, sizeBtnQuantity = '' }) {
    const { carts } = useSelector((state) => state.cart);
    const { isAuthenticated, account } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handlerDeleteCart = async (user_id, variant_id, quantity) => {
        if (isAuthenticated && Object.keys(account).length > 0) {
            try {
                const res = await deleteCart({
                    user_id,
                    variant_id,
                    quantity,
                });

                if (res && res.status) {
                    dispatch(setIsLoadCart());
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const newCarts = carts.filter((item) => {
                return !(item.variant_id._id === variant_id);
            });

            sessionStorage.setItem("carts", JSON.stringify(newCarts));

            dispatch(setCarts(newCarts));
        }
    };

    const handleQuantityChange = async (newQuantity, item) => {
        if (isAuthenticated && Object.keys(account).length > 0) {
            try {
                await updateCartQuantity({
                    user_id: item.user_id,
                    variant_id: item.variant_id._id,
                    quantity: newQuantity,
                });

                dispatch(setIsLoadCart());
            } catch (error) {
                console.error("Failed to update quantity on server:", error);
            }
        } else {
            // Create a new array to avoid mutating the original carts array directly
            const newCarts = carts.map((cart) => {
                if (cart.variant_id._id === item.variant_id._id) {
                    return { ...cart, quantity: newQuantity };
                }
                return cart;
            });

            // Update session storage with the new carts array
            sessionStorage.setItem("carts", JSON.stringify(newCarts));

            dispatch(setCarts(newCarts));
        }
    };

    return (
        <li className="flex pb-3 mb-3 border-b border-gray-200">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
                <Img
                    src={item.variant_id?.images[0]}
                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="line-clamp-2">
                            <Link to="">
                                {item.variant_id?.product_id.name}
                            </Link>
                        </h3>
                        <p className="ml-4">
                            {formatNumber(
                                (calculateSalePrice(
                                    item.variant_id.price,
                                    item.variant_id.sale
                                ) || +item?.variant_id?.price) * item.quantity
                            )}
                            đ
                        </p>
                    </div>
                    <p className="my-1 text-sm text-gray-500">{`${item.variant_id?.size.sizeName} / ${item.variant_id?.color.colorName}`}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">
                        {isBtnQuantity ? (
                            <QuantityButton
                                maxQuantity={
                                    item?.variant_id?.quantity + item.quantity
                                }
                                onQuantityChange={handleQuantityChange}
                                data={item}
                                initialQuantity={item?.quantity}
                                item={item}
                                size={sizeBtnQuantity}
                            />
                        ) : `Qty ${item.quantity}`}
                    </p>

                    {isBtnDelete && (
                        <div className="flex">
                            <button
                                onClick={() =>
                                    handlerDeleteCart(
                                        item.user_id,
                                        item.variant_id._id,
                                        item.quantity
                                    )
                                }
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </li>
    )
}

export default CartItem
