import React from 'react'

function InputOutlined({ register, errors = "", label, className, ...props }) {

    return (
        <div>
            <div class="relative w-full">
                <input
                    type="text"
                    id="floating_outlined"
                    {...register}
                    {...props}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-[#1F2937] bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#1F2937] peer ${className}`} placeholder=" " />
                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</label>
            </div>
            {errors && <p id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors}</p>}
        </div>
    )
}

export default InputOutlined
