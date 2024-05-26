import React from "react";
import { NavLink } from "react-router-dom";

function ButtonBar({ to, icon, title }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-2 text-[#fff] hover:bg-[#2A303D] px-3 py-2 rounded-md text-[17px] mb-2 ${
          isActive ? "bg-[#2A303D]" : ""
        }`
      }
    >
      <i className={`${icon} text-xl`}></i>
      <span>{title}</span>
    </NavLink>
  );
}

export default ButtonBar;
