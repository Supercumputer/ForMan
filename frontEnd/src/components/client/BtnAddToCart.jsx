
import { useDispatch, useSelector } from "react-redux";
import { setCarts, setIsLoadCart } from "../../redux/cart";
import { toast } from "react-toastify";
import { upsertCart } from "../../apis/cartApi";
function BtnAddToCart({ className, quantity, variant, onClose = null }) {
  const { account, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const callApiUpsertCart = async (data) => {
    try {
      const res = await upsertCart(data);

      if (res && res.status) {
        toast.success(res.message);
        dispatch(setIsLoadCart());
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerAddToCart = () => {
    
    if(variant.quantity < 1) return

    if (isAuthenticated && Object.keys(account).length > 0) {
      const data = {
        user_id: account?.id,
        variant_id: variant._id,
        quantity,
      };

      callApiUpsertCart(data);
    } else {
      const dataCart = JSON.parse(sessionStorage.getItem("carts")) || [];

      const check = dataCart.some((item) => item.variant_id._id === variant._id);

      if (check) {
        dataCart.forEach((item) => {
          if (item.variant_id._id === variant._id) {
            item.quantity += quantity;
          }
        });
      } else {
        dataCart.push({ variant_id:variant, quantity });
      }

      sessionStorage.setItem("carts", JSON.stringify(dataCart));

      toast.success("Add to cart success");

      dispatch(setCarts(dataCart));
    }

    if (onClose) onClose();
  };

  return (
    <>
      <div
        onClick={handlerAddToCart}
        className={`${className} text-center flex items-center justify-center gap-2 cursor-pointer rounded transition duration-500 relative 
            before:content-[''] before:absolute before:bg-[#E70505] before:h-full before:w-0 before:z-0 before:left-0 before:hover:w-full before:transition-all before:duration-500`}
      >
        <i className="fa-solid fa-cart-plus relative z-10"></i>
        <span className="relative z-10">Add To Cart</span>
      </div>
    </>
  );
}

export default BtnAddToCart;
