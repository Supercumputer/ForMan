import React, { useEffect, useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { ButtonPro, Img } from "../../components/common";
import { qkvn, qka } from "../../assets/images";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import { lightDark } from "../../redux/darkMode";
import { useDispatch } from "react-redux";
import { pathAdmin } from "../../utils/path";
import { useTranslation } from "react-i18next";
import { SideBar } from "../../components/adminComponent";

function DefaultLayout({ children }) {
  const [hidden, setHidden] = useState(false);

  const { i18n } = useTranslation();

  const { t } = useTranslation("admin");
  const handlerChangeLanguage = (languageValue) => {
    i18n.changeLanguage(languageValue);
  };

  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    dispatch(lightDark(theme));
    if (darkMode !== theme) {
      localStorage.setItem("theme", darkMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden flex ${darkMode}`}
    >
      <SideBar hidden={hidden} darkMode={darkMode} setHidden={setHidden} />
      <div
        className={`lg:hidden ${
          hidden ? "hidden" : "block"
        } absolute inset-0 bg-black z-20 opacity-35`}
        onClick={() => setHidden(!hidden)}
      ></div>

      <div className="flex-1 overflow-y-auto bg-[#F3F4F7] dark:bg-[#0F172A] transition-all">
        <div className="sticky top-0 z-10 h-14 bg-[#fff] dark:bg-slate-800 dark:text-white flex items-center justify-between px-3">
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
                      <div className="border border-gray-100 rounded-lg bg-gray-50">
                        <div className="p-2 text-sm font-medium bg-[#323A49]">
                          You have 4 messages
                        </div>
                        <ol className="mt-2 divide-y divider-gray-200 dark:divide-gray-700">
                          <li>
                            <Link
                              href="#"
                              className="items-center p-3 flex hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Img
                                className="w-12 h-12 mb-3 me-3 rounded-full object-cover flex-shrink-0"
                                src={""}
                                alt=""
                              />
                              <div className="text-gray-600 dark:text-gray-400">
                                <div className="text-base font-normal">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Jese Leos
                                  </span>{" "}
                                  likes{" "}
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Bonnie Green's
                                  </span>{" "}
                                  post in{" "}
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {" "}
                                    How to start with Flowbite library
                                  </span>
                                </div>
                                <div className="text-sm font-normal">
                                  "I wanted to share a webinar zeroheight."
                                </div>
                                <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                  <svg
                                    className="w-2.5 h-2.5 me-1"
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
                              className="items-center p-3 flex hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Img
                                className="w-12 h-12 mb-3 me-3 rounded-full object-cover flex-shrink-0"
                                src={""}
                                alt=""
                              />
                              <div className="text-gray-600 dark:text-gray-400">
                                <div className="text-base font-normal">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Jese Leos
                                  </span>{" "}
                                  likes{" "}
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    Bonnie Green's
                                  </span>{" "}
                                  post in{" "}
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {" "}
                                    How to start with Flowbite library
                                  </span>
                                </div>
                                <div className="text-sm font-normal">
                                  "I wanted to share a webinar zeroheight."
                                </div>
                                <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                  <svg
                                    className="w-2.5 h-2.5 me-1"
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
                <i className="fa-regular fa-bell"></i>
              </Tippy>
              <Dropdown
                label=""
                dismissOnClick={true}
                renderTrigger={() => <i className="fa-solid fa-language"></i>}
              >
                <Dropdown.Item
                  className="flex gap-2"
                  onClick={() => handlerChangeLanguage("en")}
                >
                  <Img src={qka} className="w-6 h-4 rounded-sm" /> English
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex gap-2"
                  onClick={() => handlerChangeLanguage("vi")}
                >
                  <Img src={qkvn} className="w-6 h-4 rounded-sm" /> Vietnamese
                </Dropdown.Item>
              </Dropdown>

              <Dropdown
                color={darkMode === "light" ? "dark" : "light"}
                label={
                  darkMode === "light" ? (
                    <i className="fa-regular fa-sun"></i>
                  ) : (
                    <i className="fa-regular fa-moon"></i>
                  )
                }
                dismissOnClick={true}
              >
                <Dropdown.Item
                  className="flex gap-2 text-[18px] items-center"
                  onClick={() => setDarkMode("dark")}
                >
                  <i className="fa-regular fa-moon"></i> {t("darkMode.dark")}
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex gap-2 text-[18px] items-center"
                  onClick={() => setDarkMode("light")}
                >
                  <i className="fa-regular fa-sun"></i> {t("darkMode.light")}
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Tippy
              trigger="click"
              hideOnClick={true}
              interactive={true}
              placement="bottom-start"
              render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                  <div className="w-44 bg-[#fff] dark:bg-slate-800 rounded-md border border-[#ccc] overflow-hidden">
                    <Link
                      to={`${pathAdmin.profile}`}
                      className="flex gap-3 items-center hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] p-3"
                    >
                      <i className="fa-solid fa-address-card"></i>
                      <ButtonPro name={t("header.myProfile")} />
                    </Link>
                    <Link className="flex gap-3 items-center hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] p-3">
                      <i className="fa-solid fa-message"></i>
                      <ButtonPro name={t("header.messages")} />
                    </Link>
                    <Link className="flex gap-3 items-center hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] p-3">
                      <i className="fa-solid fa-gear"></i>
                      <ButtonPro name={t("header.settings")} />
                    </Link>
                    <Link className="flex gap-3 items-center hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] p-3">
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <ButtonPro name={t("header.logout")} />
                    </Link>
                  </div>
                </div>
              )}
            >
              <p>
                <Img
                  src={qkvn || qka}
                  className="object-cover w-10 h-10 rounded-full"
                />
              </p>
            </Tippy>
          </div>
        </div>
        <div className="p-3 flex-1">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
