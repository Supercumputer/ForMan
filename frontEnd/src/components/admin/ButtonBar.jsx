import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function ButtonBar({ to, icon, title, darkMode, menuChildren }) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation("admin");

  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `w-full flex items-center justify-between hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] pr-3 rounded-md mb-1 ${
            isActive &&
            (darkMode === "light" ? "bg-[#F8FAFC]" : "bg-[#2A303D]") +
              " font-semibold"
          }`
        }
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md flex">
            <i className={`${icon} text-xl m-auto`}></i>
          </div>
          <span>{title}</span>
        </div>
        {Array.isArray(menuChildren) && menuChildren.length > 0 && (
          <div>
            {open ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </div>
        )}
      </NavLink>
      {Array.isArray(menuChildren) && menuChildren.length > 0 && (
        <div className={`pl-3 mb-2 ${open ? "block" : "hidden"}`}>
          {menuChildren.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 hover:bg-[#F8FAFC] dark:hover:bg-[#2A303D] px-3 py-2 rounded-md mb-1 ${
                  isActive &&
                  (darkMode === "light" ? "bg-[#F8FAFC]" : "bg-[#2A303D]") +
                    " font-semibold"
                }`
              }
            >
              <i className="fa-regular fa-circle text-[6px]"></i>
              <span>{t(item.title)}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default ButtonBar;
