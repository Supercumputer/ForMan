import React, { useEffect, useState } from "react";
import { ButtonBar } from "../../components/adminComponent";
import { Avatar, Dropdown } from "flowbite-react";
import { Img } from "../../components/common";
import { qkvn, qka } from "../../assets/images";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

function DefaultLayout() {
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") ?? 'light';
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (darkMode !== theme) {
      localStorage.setItem("theme", darkMode);
    }
  }, [darkMode]);

  return (
    <div className={`w-screen h-screen flex ${darkMode}`}>
      <div
        className={`bg-white dark:bg-slate-800 text-black dark:text-[#fff] h-full border-r border-[#ccc] transition-all overflow-hidden ${
          hidden ? "w-0" : "w-64"
        }`}
      >
        <div className="h-14 border-b border-[#ccc] flex items-center">
          <span className="text-xl font-bold px-5">Admin</span>
        </div>
        <div className="p-2">
          <ButtonBar
            to="/dashboard"
            icon={"fa-brands fa-square-font-awesome"}
            title={"Dashboard"}
          />

          <ButtonBar
            to="/"
            icon={"fa-brands fa-square-font-awesome"}
            title={"Dashboard"}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="h-14 border-b border-[#ccc] flex items-center justify-between px-3">
          <i
            className="fa-solid fa-bars"
            onClick={() => setHidden(!hidden)}
          ></i>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-xl">
              <Tippy
                trigger="click"
                hideOnClick={true}
                interactive={true}
                placement="bottom-start"
                render={(attrs) => (
                  <div className="box" tabIndex="-1" {...attrs}>
                    <div className="w-96 rounded-md text-[#fff] overflow-hidden">
                      <div class="border border-gray-100 rounded-lg bg-gray-50">
                        <div className="p-2 text-sm font-medium bg-[#323A49]">
                          You have 4 messages
                        </div>
                        <ol class="mt-2 divide-y divider-gray-200 dark:divide-gray-700">
                          <li>
                            <Link
                              href="#"
                              class="items-center p-3 flex hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Img
                                className="w-12 h-12 mb-3 me-3 rounded-full object-cover flex-shrink-0"
                                src={""}
                                alt=""
                              />
                              <div class="text-gray-600 dark:text-gray-400">
                                <div class="text-base font-normal">
                                  <span class="font-medium text-gray-900 dark:text-white">
                                    Jese Leos
                                  </span>{" "}
                                  likes{" "}
                                  <span class="font-medium text-gray-900 dark:text-white">
                                    Bonnie Green's
                                  </span>{" "}
                                  post in{" "}
                                  <span class="font-medium text-gray-900 dark:text-white">
                                    {" "}
                                    How to start with Flowbite library
                                  </span>
                                </div>
                                <div class="text-sm font-normal">
                                  "I wanted to share a webinar zeroheight."
                                </div>
                                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                  <svg
                                    class="w-2.5 h-2.5 me-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z" />
                                  </svg>
                                  Public
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              class="items-center p-3 flex hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Img
                                className="w-12 h-12 mb-3 me-3 rounded-full object-cover flex-shrink-0"
                                src={""}
                                alt=""
                              />
                              <div class="text-gray-600 dark:text-gray-400">
                                <div class="text-base font-normal">
                                  <span class="font-medium text-gray-900 dark:text-white">
                                    Jese Leos
                                  </span>{" "}
                                  likes{" "}
                                  <span class="font-medium text-gray-900 dark:text-white">
                                    Bonnie Green's
                                  </span>{" "}
                                  post in{" "}
                                  <span class="font-medium text-gray-900 dark:text-white">
                                    {" "}
                                    How to start with Flowbite library
                                  </span>
                                </div>
                                <div class="text-sm font-normal">
                                  "I wanted to share a webinar zeroheight."
                                </div>
                                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                  <svg
                                    class="w-2.5 h-2.5 me-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z" />
                                  </svg>
                                  Public
                                </span>
                              </div>
                            </Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              >
                <i class="fa-regular fa-bell"></i>
              </Tippy>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => <i class="fa-solid fa-language"></i>}
              >
                <Dropdown.Item className="flex gap-2">
                  <Img src={qka} className="w-6 h-4 rounded-sm" /> English
                </Dropdown.Item>
                <Dropdown.Item className="flex gap-2">
                  <Img src={qkvn} className="w-6 h-4 rounded-sm" /> Vietnamese
                </Dropdown.Item>
              </Dropdown>

              <Dropdown
                color="dark"
                label={<i class="fa-regular fa-moon"></i>}
                dismissOnClick={true}
              >
                <Dropdown.Item
                  className="flex gap-2 text-[18px] items-center"
                  onClick={() => setDarkMode("dark")}
                >
                  <i class="fa-regular fa-moon"></i> Dark
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex gap-2 text-[18px] items-center"
                  onClick={() => setDarkMode("light")}
                >
                  <i class="fa-regular fa-sun"></i> Light
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Avatar
              img={qkvn || qka}
              className="object-cover"
              alt="avatar of Jese"
              rounded
            />
            
          </div>
        </div>
        <div>
                
        </div>
      </div>
      
    </div>
  );
}

export default DefaultLayout;
