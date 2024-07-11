import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Img } from "../common";
import { Drawer, Sidebar, Spinner } from "flowbite-react";
import { useState } from "react";
import { pathClient } from "../../utils/path";
import { apiGetAllProductVariant, apiGetCategorys } from "../../apis/axios";
import useDebounce from "../../hooks/useDebounce";
import NestedList from "./NestedList";
import { calculateSalePrice, formatNumber } from "../../utils/helper";

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
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      const res = await apiGetCategorys();

      if (res && res.status) {
        setCategories(res.categories);
      }
    })();
  }, []);

  const handleSearchClick = () => {
    navigate(`/search?keyword=${debouncedSearch}`);
    setSearch("")
    setIsOpen(false)
  };

  const callApiSearchProduct = async (key) => {
    try {
      setLoading(true);
      const res = await apiGetAllProductVariant(`?search=${key}&limit=5`);

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
        <Link to="#" className="-m-2 block p-2 text-gray-500">
          {subCategory.categoryName}
        </Link>
        {subCategory.children && subCategory.children.length > 0 && (
          <ul className="mt-2">{renderSubCategories(subCategory.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <header className="font-roboto sticky top-0 z-30">
      <div className="md:flex justify-between bg-[#292929] text-[#fff] text-sm py-2 lg:px-[8%] px-2 hidden">
        <div className="flex items-center gap-2">
          <i class="fa-solid fa-phone"></i>
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
            className="border-r px-3 hover:text-red-500 transition-all"
            href=""
          >
            Giới thiệu
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center lg:px-[8%] p-2 bg-[#fff] shadow">
        <Img
          src={"https://4menshop.com/logo.png?v=1"}
          alt={""}
          className="lg:h-16 h-10"
        />
        <nav className="md:block hidden">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to={"/"} className="hover:text-red-500">
                HÀNG MỚI VỀ
              </Link>
            </li>
            {categories.map((category) => (
              <li className="group initial">
                <Link
                  to={`${pathClient.product}`}
                  className="hover:text-red-500 before:block before:absolute before:w-full before:top-5 relative before:hover:h-10 uppercase"
                >
                  {category.categoryName}
                  {category.children && category.children.length > 0 && (
                    <i class="fa-solid fa-angle-down"></i>
                  )}
                </Link>
                {category.children && category.children.length > 0 && (
                  <div class="invisible group-hover:visible absolute z-10 left-0 lg:top-28 top-[90px] right-0 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600 transition-all transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                    <div className="flex flex-row-reverse justify-between lg:px-[8%] px-2 lg:py-10 py-5">
                      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div class="lg:w-60 lg:h-60 w-44 h-44 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg"
                            alt="Models sitting back to back, wearing Basic Tee in black and bone."
                            class="object-cover w-full h-full"
                          />
                        </div>

                        <div class="lg:w-60 lg:h-60 w-44 h-44 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg"
                            alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
                            class="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {category.children.map((subCategory) => (
                        <div>
                          <Link
                            id="women-clothing-heading-mobile"
                            class="font-medium text-gray-900"
                          >
                            {subCategory.categoryName}
                          </Link>
                          <ul class="mt-6 flex flex-col space-y-6">
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
              <Link to={""} className="hover:text-red-500">
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
            <i class="fa-solid fa-magnifying-glass m-auto"></i>
          </div>
          <div className="w-8 h-8 border rounded flex">
            <i class="fa-solid fa-user m-auto"></i>
          </div>
          <div
            className="w-8 h-8 border rounded flex"
            onClick={() => setIsOpenCart(true)}
          >
            <i class="fa-solid fa-cart-shopping m-auto"></i>
          </div>
          <div
            className="w-8 h-8 border rounded flex md:hidden"
            onClick={() => setIsOpenMenu(true)}
          >
            <i class="fa-solid fa-bars m-auto"></i>
          </div>
        </div>
      </div>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="top">
        <Drawer.Items>
          <div className="flex md:hidden justify-between items-center mb-3">
            <Img src={"https://4menshop.com/logo.png?v=1"} alt={""} />
            <i
              class="fa-solid fa-xmark text-[20px]"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>

          <div className="flex justify-between md:px-3 gap-3">
            <Img
              src={"https://4menshop.com/logo.png?v=1"}
              alt={""}
              className="md:block hidden h-[62px]"
            />
            <div className="w-full md:max-w-[600px] ">
              <div className="border rounded flex items-center overflow-hidden h-[40px] my-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nhập nội dung tìm kiếm tại đây ..."
                  className="border-none flex-1 focus:outline-none focus:ring-0 pr-0"
                />
                <div
                  onClick={handleSearchClick}
                  className="h-[40px] w-[40px] flex"
                >
                  <i class="fa-solid fa-magnifying-glass m-auto"></i>
                </div>
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
                  <ul class="mt-">
                    {result.map((item) => (
                      <li>
                        <Link
                          href="#"
                          class="items-center flex justify-between border-b border-[#dfe0e1] py-2 "
                        >
                          <div class="font-roboto text-[#333333] flex flex-col gap-1">
                            <h1 class="text-sm font-semibold">
                              {item.product.name}
                            </h1>
                            <div className="flex items-center gap-3">
                              <span class="text-red-500 font-medium text-[12px]">
                                {formatNumber(
                                  calculateSalePrice(
                                    item.variant.price,
                                    item.variant.sale
                                  ) ?? item.variant.price
                                )}
                                ₫
                              </span>
                              <s class="inline-flex items-center text-xs font-normal text-[#c4c4c4]">
                                {item.variant.sale > 0 &&
                                  `${formatNumber(item.variant.price)} ₫`}
                              </s>
                            </div>
                          </div>

                          <Img
                            class="w-12 h-12 object-cover"
                            src={item.variant.images[0]}
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
              class="fa-solid fa-xmark text-[20px] py-5 md:block hidden"
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
              <Link>Hàng Mới Về</Link>
              <NestedList data={categories} />
              <Link to={""} className="my-3">
                Outlet Sale
              </Link>

              <Sidebar.Items className="border-t pt-3">
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="/outlet-sale"
                    icon={() => <i className="fa-solid fa-tags"></i>}
                  >
                    Cách chọn Size
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/outlet-sale"
                    icon={() => <i className="fa-solid fa-tags"></i>}
                  >
                    Chính sách khách vip
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/outlet-sale"
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
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col bg-white shadow-xl">
                <div class="flex items-start justify-between p-6">
                  <h2
                    class="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      class="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpenCart(false)}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>

                <div class="flex-1 overflow-y-auto px-4 sm:px-6 custom-scroll">
                  <ul class="divide-y divide-gray-200">
                    <li class="flex pb-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">
                                Throwback Hip Bag fdgd fdgdf dfg dg d
                              </a>
                            </h3>
                            <p class="ml-4">$90.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Salmon</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                          alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p class="ml-4">$32.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                          alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p class="ml-4">$32.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                          alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p class="ml-4">$32.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                          alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p class="ml-4">$32.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                          alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                          class="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p class="ml-4">$32.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div class="mt-6">
                    <Link
                      href="#"
                      class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full"></div>
      </Drawer>

      {/* <Drawer
        open={isOpenCart}
        onClose={() => setIsOpenCart(false)}
        position="right"
        style={{
          width: "max-content",
          padding: "0",
        }}
      >
        <div class="flex h-full flex-col bg-white ">
          <div class="flex items-start justify-between p-6">
            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
              Shopping cart
            </h2>
            <div class="ml-3 flex h-7 items-center">
              <button
                type="button"
                class="text-gray-400 hover:text-gray-500"
                onClick={() => setIsOpenCart(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto px-4 sm:px-6 custom-scroll">
            <ul class="divide-y divide-gray-200">
              <li class="flex pb-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#" className="text-wrap">
                          Throwback Hip Bag dfgsgd fdgdfg dfgdfg{" "}
                        </a>
                      </h3>
                      <p class="ml-4">$90.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Salmon</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">Medium Stuff Satchel</a>
                      </h3>
                      <p class="ml-4">$32.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Blue</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">Medium Stuff Satchel</a>
                      </h3>
                      <p class="ml-4">$32.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Blue</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">Medium Stuff Satchel</a>
                      </h3>
                      <p class="ml-4">$32.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Blue</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">Medium Stuff Satchel</a>
                      </h3>
                      <p class="ml-4">$32.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Blue</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">Medium Stuff Satchel</a>
                      </h3>
                      <p class="ml-4">$32.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Blue</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div class="mt-6">
              <Link
                href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </Drawer> */}
    </header>
  );
}

export default Header;
