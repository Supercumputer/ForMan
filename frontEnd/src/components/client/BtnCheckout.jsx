
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCarts } from '../../redux/cart';
import { checkCartInventory } from '../../apis/cartApi';

function BtnCheckout({ setCloseModel = null }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { carts } = useSelector((state) => state.cart);
    const { account, isAuthenticated } = useSelector((state) => state.auth);
    const callApiCheckInventory = async (data) => {
        try {
            const res = await checkCartInventory(data);

            if (res && res.status && res.check) {
                navigate("/checkouts/stock_problems");
                sessionStorage.setItem("carts", JSON.stringify(res.result));
                dispatch(setCarts(res.result));
            } else {
                navigate("/checkouts");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlerCheckInventory = (carts) => {
        if (isAuthenticated && Object.keys(account).length > 0) {
            navigate("/checkouts");
        } else {
            callApiCheckInventory(carts);
        }
        if (setCloseModel) setCloseModel()
    };

    return (
        <button
            onClick={() => handlerCheckInventory(carts)}
            disabled={carts.length <= 0}
            className={`flex items-center w-full justify-center rounded-md border border-transparent cursor-pointer px-6 py-3 text-base font-medium text-white shadow-sm ${carts.length <= 0 ? 'bg-gray-300 hover:bg-gray-300' : 'bg-[#E70505] hover:bg-red-700'}`}
        >
            Thanh toán
        </button>
    )
}

export default BtnCheckout
