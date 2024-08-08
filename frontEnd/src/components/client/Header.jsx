import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Img } from "../common";
import { Drawer, Sidebar, Spinner } from "flowbite-react";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import NestedList from "./NestedList";
import { calculateSalePrice, formatNumber } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setCarts, setIsLoadCart } from "../../redux/cart";
import { noCart } from "../../assets/images";
import Swal from "sweetalert2";
import CartItem from "./CartItem";
import BtnCheckout from "./BtnCheckout";
import pathClient from "../../utils/pathClient";
import { getCategories } from "../../apis/categoryApi";
import { getCartByUserId, mergeCarts } from "../../apis/cartApi";
import { getAllProductVariants } from "../../apis/variantApi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const [categories, setCategories] = useState([]);
  const [result, setResult] = useState({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { carts, isLoadCart } = useSelector((state) => state.cart);
  const { account, isAuthenticated } = useSelector((state) => state.auth);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      const res = await getCategories();

      if (res && res.status) {
        setCategories(res.categories);
      }
    })();
  }, []);

  useEffect(() => {
    const callApiGetCartByUserId = async () => {
      const res = await getCartByUserId(account?.id);

      if (res && res.status) {
        dispatch(setCarts(res.carts));
      }
    };

    if (account && Object.keys(account)?.length > 0) {
      callApiGetCartByUserId();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isLoadCart]);

  const handleSearchClick = () => {
    navigate(`/search?keyword=${debouncedSearch}`);
    setSearch("");
    setIsOpen(false);
  };

  const handleSearchItemClick = () => {
    setSearch("");
    setIsOpen(false);
  };

  const callApiSearchProduct = async (key) => {
    try {
      setLoading(true);

      const res = await getAllProductVariants(`?search=${key}&limit=5`);

      if (res && res.status) {
        setTotalRecords(res.totalRecords);
        setResult(res.listProducts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResult([]);
      return;
    }

    callApiSearchProduct(debouncedSearch);
  }, [debouncedSearch]);

  const renderSubCategories = (subCategories) => {
    return subCategories.map((subCategory) => (
      <li key={subCategory._id} className="flow-root">
        <Link
          to={`/collections/${subCategory.slug}`}
          className="-m-2 block p-2 text-gray-500"
        >
          {subCategory.categoryName}
        </Link>
        {subCategory.children && subCategory.children.length > 0 && (
          <ul className="mt-2">{renderSubCategories(subCategory.children)}</ul>
        )}
      </li>
    ));
  };

  const callApiMergeCart = async (data) => {
    try {
      const res = await mergeCarts(data);

      if (res && res.status) {
        dispatch(setIsLoadCart());
        Swal.fire({
          title: "Congratulations!",
          text: "Đồng bộ giỏ hàng thành công.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      Object.keys(account).length > 0 &&
      JSON.parse(sessionStorage.getItem("carts")?.length > 0)
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "Bạn có muốn đồng bộ giỏ hàng không",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Merge it!",
      }).then((result) => {
        if (result.isConfirmed) {
          callApiMergeCart({
            user_id: account?.id,
            data: JSON.parse(sessionStorage.getItem("carts")),
          });
        }
        sessionStorage.removeItem("carts");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const total = useMemo(() => {
    return carts.reduce((acc, item) => {
      return (
        acc +
        (calculateSalePrice(item.variant_id.price, item.variant_id.sale) ||
          item.variant_id.price) *
        item.quantity
      );
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, carts]);

  // const callApiCheckInventory = async (data) => {
  //     try {
  //         const res = await apiCheckInventory(data);

  //         if (res && res.status && res.check) {
  //             navigate("/checkouts/stock_problems");
  //             sessionStorage.setItem("carts", JSON.stringify(res.result));
  //             dispatch(setCarts(res.result));
  //         } else {
  //             navigate("/checkouts");
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  // const handlerCheckInventory = (carts) => {
  //     if (isAuthenticated && Object.keys(account).length > 0) {
  //         navigate("/checkouts");
  //     } else {
  //         callApiCheckInventory(carts);
  //     }
  // };

  return (
    <header className="font-roboto sticky top-0 z-30">
      <div className="md:flex justify-between bg-[#292929] text-[#fff] text-sm py-2 lg:px-[8%] px-2 hidden">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-phone"></i>
          <span>Hotline: 0868.444.644</span>
        </div>
        <div className="flex items-center">
          <Link
            rel="stylesheet"
            className="border-r px-3 hover:text-red-500 transition-all"
            href=""
          >
            Cách chọn Size
          </Link>
          <Link
            rel="stylesheet"
            className="border-r px-3 hover:text-red-500 transition-all"
            href=""
          >
            Chính sách khách vip
          </Link>
          <Link
            rel="stylesheet"
            className="border-r flex items-center gap-1 px-3 hover:text-red-500 transition-all"
            to={pathClient.orderLookUp}
          >
            <i className="fa-brands fa-searchengin"></i>
            <span>Tra cứu đơn hàng</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center lg:px-[8%] p-2 bg-[#fff] shadow">
        <Link to={"/"}>
          <Img
            src={"https://4menshop.com/logo.png?v=1"}
            alt={""}
            className="lg:h-16 h-10"
          />
        </Link>

        <nav className="md:block hidden">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to={"/collections/hang-moi-ve"}
                className="hover:text-red-500"
              >
                HÀNG MỚI VỀ
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id} className="group initial">
                <Link
                  to={`/collections/${category.slug}`}
                  className="hover:text-red-500 before:block before:absolute before:w-full before:top-5 relative before:hover:h-10 uppercase"
                >
                  {category.categoryName}
                  {category.children && category.children.length > 0 && (
                    <i className="fa-solid fa-angle-down"></i>
                  )}
                </Link>

                {category.children && category.children.length > 0 && (
                  <div className="invisible group-hover:visible absolute z-10 left-0 lg:top-28 top-[90px] right-0 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600 transition-all transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                    <div className="flex flex-row-reverse justify-between lg:px-[8%] px-2 lg:py-10 py-5">
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="lg:w-60 lg:h-60 w-44 h-44 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg"
                            alt="Models sitting back to back, wearing Basic Tee in black and bone."
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="lg:w-60 lg:h-60 w-44 h-44 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg"
                            alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {category.children.map((subCategory) => (
                        <div key={subCategory.id}>
                          <Link
                            to={`/collections/${subCategory.slug}`}
                            id="women-clothing-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            {subCategory.categoryName}
                          </Link>
                          <ul className="mt-6 flex flex-col space-y-6">
                            {renderSubCategories(subCategory.children)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            <li>
              <Link
                to={"/collections/oulet-sale"}
                className="hover:text-red-500"
              >
                OUTLET SALE
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex space-x-2 items-center">
          <div
            className="w-8 h-8 border rounded flex"
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-magnifying-glass m-auto"></i>
          </div>
          <Link to={"/account"} className="w-8 h-8 border rounded flex">
            <i className="fa-solid fa-user m-auto"></i>
          </Link>

          <div
            className="w-8 h-8 border rounded flex relative"
            onClick={() => setIsOpenCart(true)}
          >
            <i className="fa-solid fa-cart-shopping m-auto"></i>
            {carts?.length > 0 && (
              <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4 ">
                {carts.length}
              </div>
            )}
          </div>

          <div
            className="w-8 h-8 border rounded flex md:hidden"
            onClick={() => setIsOpenMenu(true)}
          >
            <i className="fa-solid fa-bars m-auto"></i>
          </div>
        </div>
      </div>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="top">
        <Drawer.Items>
          <div className="flex md:hidden justify-between items-center mb-3">
            <Img src={"https://4menshop.com/logo.png?v=1"} alt={""} />
            <i
              className="fa-solid fa-xmark text-[20px]"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>

          <div className="flex justify-between md:px-3 gap-3">
            <Link to={"/"}>
              <Img
                src={"https://4menshop.com/logo.png?v=1"}
                alt={""}
                className="md:block hidden h-[62px]"
              />
            </Link>
            <div className="w-full md:max-w-[600px] ">
              <div className="border rounded flex items-center overflow-hidden h-[40px] my-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nhập nội dung tìm kiếm tại đây ..."
                  className="border-none flex-1 focus:outline-none focus:ring-0 pr-0"
                />
                <button
                  onClick={handleSearchClick}
                  className="h-[40px] w-[40px] flex"
                >
                  <i className="fa-solid fa-magnifying-glass m-auto"></i>
                </button>
              </div>

              {loading ? (
                <div className="text-center">
                  <Spinner
                    aria-label="Center-aligned spinner example"
                    color={"gray"}
                  />
                </div>
              ) : result.length > 0 ? (
                <>
                  <ul className="mt-">
                    {result.map((item) => (
                      <li key={item.id}>
                        <Link
                          onClick={handleSearchItemClick}
                          to={`/products/${item.product_id.slug}`}
                          className="items-center flex justify-between border-b border-[#dfe0e1] py-2 "
                        >
                          <div className="font-roboto text-[#333333] flex flex-col gap-1">
                            <h1 className="text-sm font-semibold">
                              {item.product_id.name}
                            </h1>
                            <div className="flex items-center gap-3">
                              <span className="text-red-500 font-medium text-[12px]">
                                {formatNumber(
                                  calculateSalePrice(item.price, item.sale) ??
                                  item.price
                                )}
                                ₫
                              </span>
                              <s className="inline-flex items-center text-xs font-normal text-[#c4c4c4]">
                                {item.sale > 0 &&
                                  `${formatNumber(item.price)} ₫`}
                              </s>
                            </div>
                          </div>

                          <Img
                            className="w-12 h-12 object-cover"
                            src={item.images[0]}
                            alt="Jese Leos image"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {totalRecords > 5 && (
                    <span
                      onClick={handleSearchClick}
                      className="mt-2 text-center block text-[#333333] text-[13px] cursor-pointer"
                    >
                      Xem thêm {totalRecords - 5} sản phẩm
                    </span>
                  )}
                </>
              ) : (
                debouncedSearch && (
                  <p className="mt-5 text-center text-[#333333] text-sm">
                    Không có sản phẩm nào
                  </p>
                )
              )}
            </div>

            <i
              className="fa-solid fa-xmark text-[20px] py-5 md:block hidden"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>
        </Drawer.Items>
      </Drawer>

      <Drawer
        open={isOpenMenu}
        onClose={() => setIsOpenMenu(false)}
        className="custom-scroll"
      >
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0 w-full"
          >
            <div className="flex h-full flex-col justify-between py-2 gap-2 font-roboto text-[#333333] font-semibold text-sm">
              <Link to={"/collections/hang-moi-ve"}>Hàng Mới Về</Link>
              <NestedList data={categories} />
              <Link to={"/collections/outlet-sale"} className="my-3">
                Outlet Sale
              </Link>

              <Sidebar.Items className="border-t pt-3">
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    to="/outlet-sale"
                    icon={() => <i className="fa-solid fa-tags"></i>}
                  >
                    Cách chọn Size
                  </Sidebar.Item>
                  <Sidebar.Item
                    to="/outlet-sale"
                    icon={() => <i className="fa-solid fa-tags"></i>}
                  >
                    Chính sách khách vip
                  </Sidebar.Item>
                  <Sidebar.Item
                    to="/outlet-sale"
                    icon={() => <i className="fa-solid fa-tags"></i>}
                  >
                    Giới thiệu
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>

      <Drawer
        open={isOpenCart}
        onClose={() => setIsOpenCart(false)}
        position="right"
        style={{
          width: "max-content",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex items-start justify-between p-6">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpenCart(false)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 custom-scroll">
                  <ul className="">
                    {carts.length > 0 ? (
                      carts?.map((item) => (
                        <CartItem key={item.variant_id._id} item={item} isBtnQuantity={true} sizeBtnQuantity="sm" />
                      ))
                    ) : (
                      <div className="flex justify-center flex-col items-center">
                        <Img
                          src={noCart}
                          className="w-56 m-auto transform -translate-y-1/2 mt-[50%]"
                        />
                        <h1 className="text-xl">Chưa có sản phẩm trong giỏ hàng...</h1>

                      </div>
                    )}
                  </ul>
                </div>
                {
                  carts.length > 0 &&
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{formatNumber(total)}đ</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <BtnCheckout setCloseModel={() => setIsOpenCart(false)} />
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <Link to="/carts" onClick={() => setIsOpenCart(false)}>Xem giỏ hàng</Link>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-full"></div>
      </Drawer>


    </header>
  );
}

export default Header;
