import React from "react";
import { Link } from "react-router-dom";
import { Img } from "../common";
import { Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <header className="font-roboto">
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
      <div className="flex justify-between items-center lg:px-[8%] p-2">
        <Img src={"https://4menshop.com/logo.png?v=1"} alt={""} className="lg:h-16 h-10"/>
        <nav className="md:block hidden">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to={""} className="hover:text-red-500">
                HÀNG MỚI VỀ
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:text-red-500">
                ÁO NAM
              </Link>
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
                      href="/"
                      icon={() => <i className="fa-solid fa-tshirt"></i>}
                    >
                      Áo Nam
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
