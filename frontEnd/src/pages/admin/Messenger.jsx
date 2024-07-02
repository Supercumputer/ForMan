import React from "react";
import { Img, InputField } from "../../components/common";
import { ButtonPro } from "../../components/common";
import { BoxMess } from "../../components/adminComponent";

function Messenger() {
  return (
    <div className="flex gap-4">
      <div className="w-80 bg-[#fff] dark:bg-slate-800 p-3 rounded-md sm:flex flex-col gap-2  hidden">
        <div class="px-3 py-2 bg-[#F3F4F7] hover:bg-[#F3F4F7] dark:bg-gray-800 dark:hover:bg-gray-800 rounded-md flex-shrink-0">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <div class="relative">
                <Img class="w-11 h-11 rounded-full object-cover" src="" alt="Neil image" />
                <span class="-bottom-1 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span class="inline-flex items-center bg-green-100 text-xs font-medium  rounded-full dark:bg-green-900 dark:text-green-300">
              <span class="p-1 bg-green-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div class="px-3 py-2 hover:bg-[#F3F4F7] dark:bg-slate-800 dark:hover:bg-gray-800 rounded-md flex-shrink-0">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <div class="relative">
                <Img class="w-11 h-11 rounded-full object-cover" src="" alt="Neil image" />
                <span class="-bottom-1 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span class="inline-flex items-center bg-green-100 text-xs font-medium  rounded-full dark:bg-green-900 dark:text-green-300">
              <span class="p-1 bg-green-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div class="px-3 py-2 hover:bg-[#F3F4F7] dark:bg-slate-800 dark:hover:bg-gray-800 rounded-md flex-shrink-0">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <div class="relative">
                <Img class="w-11 h-11 rounded-full object-cover" src="" alt="Neil image" />
                <span class="-bottom-1 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span class="inline-flex items-center bg-green-100 text-xs font-medium  rounded-full dark:bg-green-900 dark:text-green-300">
              <span class="p-1 bg-green-500 rounded-full"></span>
            </span>
          </div>
        </div>
        <div class="px-3 py-2 hover:bg-[#F3F4F7] dark:bg-slate-800 dark:hover:bg-gray-800 rounded-md flex-shrink-0">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <div class="relative">
                <Img class="w-11 h-11 rounded-full object-cover" src="" alt="Neil image" />
                <span class="-bottom-1 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <span class="inline-flex items-center bg-green-100 text-xs font-medium  rounded-full dark:bg-green-900 dark:text-green-300">
              <span class="p-1 bg-green-500 rounded-full"></span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#fff] dark:text-[#fff] h-full dark:bg-slate-800 rounded-md p-3">
        <div className="flex justify-between shadow-md items-center rounded-md dark:bg-slate-700 p-2 mb-3">
          <div className="flex items-center">
            <i class="fa-solid fa-angle-left text-[20px] p-2 sm:hidden block"></i>
            <div className="flex gap-2 items-center text-nowrap">
              <Img
                src={""}
                alt=""
                className="w-10 h-10 border-2 object-cover rounded-full flex-shrink-0"
              />
              <div className="flex flex-col">
                <h2 className="font-bold">Ho Van Quang</h2>
                <span className="text-xs">Hoạt động 12 phút trước</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center text-blue-500 pr-2">
            <i className="fa-solid fa-video p-2 text-[18px]"></i>
            <i className="fa-solid fa-phone p-2 text-[18px]"></i>
            <div>
              <i className="fa-solid fa-circle-info p-2 text-[18px]"></i>
            </div>
          </div>
        </div>
        <div className="h-screen overflow-auto px-2">
          <BoxMess position={true} />
          <BoxMess position={false} />
          <BoxMess position={true} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
          <BoxMess position={false} />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 mb-2">
            <InputField value={""} name={""} />
          </div>
          <ButtonPro
            name={<i class="fa-solid fa-paper-plane"></i>}
            className="text-[#fff] py-2 px-3 bg-blue-500 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
