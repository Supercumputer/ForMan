import React from "react";

function BtnVariant({ title, active = true }) {
  return (
    <div
      className={`relative border min-w-[70px] p-2 text-center text-[12px] inline-block rounded border-[#bdbfbe] overflow-hidden after:content-['']  ${
        active &&
        "after:absolute after:border-t-[14px] after:border-l-[14px] after:border-l-transparent after:top-0 after:right-0 after:border-t-black border-[#000]"
      }`}
    >
      {title}
    </div>
  );
}

export default BtnVariant;
