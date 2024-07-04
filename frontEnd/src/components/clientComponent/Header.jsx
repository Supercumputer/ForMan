import React from "react";
import { Link } from "react-router-dom";
import { Img } from "../common";
import { Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <header className="font-roboto sticky top-0 z-40">
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
              <Link to={""} className="hover:text-red-500">
                HÀNG MỚI VỀ
              </Link>
            </li>
            <li className="group initial">
              <Link
                to={""}
                className="hover:text-red-500 before:block before:absolute before:w-full before:top-5 relative before:hover:h-10"
              >
                ÁO NAM <i class="fa-solid fa-angle-down"></i>
              </Link>
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

                  <div>
                    <p
                      id="women-clothing-heading-mobile"
                      class="font-medium text-gray-900"
                    >
                      Clothing
                    </p>
                    <ul class="mt-6 flex flex-col space-y-6">
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Tops
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Dresses
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Pants
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Denim
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Sweaters
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          T-Shirts
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Jackets
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Activewear
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Browse All
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p
                      id="women-accessories-heading-mobile"
                      class="font-medium text-gray-900"
                    >
                      Accessories
                    </p>
                    <ul class="mt-6 flex flex-col space-y-6">
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Watches
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Wallets
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Bags
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Sunglasses
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Hats
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Belts
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p
                      id="women-brands-heading-mobile"
                      class="font-medium text-gray-900"
                    >
                      Brands
                    </p>
                    <ul class="mt-6 flex flex-col space-y-6">
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Full Nelson
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          My Way
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Re-Arranged
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Counterfeit
                        </Link>
                      </li>
                      <li class="flow-root">
                        <Link href="#" class="-m-2 block p-2 text-gray-500">
                          Significant Other
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link to={""} className="hover:text-red-500">
                QUẦN NAM
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:text-red-500">
                PHỤ KIỆN
              </Link>
            </li>
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
          <div className="w-8 h-8 border rounded flex">
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
          <div className="flex justify-between items-center md:px-3 gap-3">
            <Img
              src={"https://4menshop.com/logo.png?v=1"}
              alt={""}
              className="md:block hidden"
            />
            <div className="border rounded flex items-center w-full md:max-w-[600px] h-[40px] overflow-hidden">
              <input
                type="text"
                placeholder="Nhập nội đung tìm kiếm tại đây ..."
                className="border-none flex-1 focus:outline-none focus:ring-0 pr-0"
              />
              <div className="h-[40px] w-[40px] flex">
                <i class="fa-solid fa-magnifying-glass m-auto"></i>
              </div>
            </div>
            <i
              class="fa-solid fa-xmark text-[20px] md:block hidden"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>
        </Drawer.Items>
      </Drawer>

      <Drawer open={isOpenMenu} onClose={() => setIsOpenMenu(false)}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0 w-full"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="/"
                      icon={() => <i class="fa-solid fa-house"></i>}
                    >
                      Trang chủ
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={() => <i className="fa-solid fa-tshirt"></i>}
                    >
                      <div className="flex justify-between items-center">
                        <p>Áo Nam</p>
                        <i class="fa-solid fa-plus"></i>
                      </div>
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/pants"
                      icon={() => <i className="fa-solid fa-user"></i>}
                    >
                      Quần Nam
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/accessories"
                      icon={() => <i className="fa-solid fa-hat-cowboy"></i>}
                    >
                      Phụ Kiện
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/outlet-sale"
                      icon={() => <i className="fa-solid fa-tags"></i>}
                    >
                      Outlet Sale
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
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
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </header>
  );
}

export default Header;
