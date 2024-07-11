import React from "react";

function OptionButton({ title, active }) {
  return (
    <div
      className={`text-[#333] px-3 py-2 border rounded min-w-11 text-center cursor-pointer hover:bg-[#333333] hover:text-[#fff] ${
        active && "bg-[#333333] text-[#fff]"
      }`}
    >
      {title}
    </div>
  );
}

export default OptionButton;
