import React from "react";
import { Img } from "../common";
function BoxMess({position}) {
  return (
    <div className={`flex gap-2 mb-2 ${position ? 'justify-start' : 'justify-end'} `}>

      <Img src={""} className="w-10 h-10 border-2 object-cover rounded-full" />

      <div className="flex flex-col">
        <span
          className={`rounded-md max-w-[400px] p-2 bg-[#F0F0F0] text-[#050505] `}
        >
          hello ae
        </span>

        <span className="text-xs text-gray-500">10 phut truoc</span>
      </div>
    </div>
  );
}

export default BoxMess;
