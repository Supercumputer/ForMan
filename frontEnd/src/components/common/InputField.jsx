import React from "react";
import { useState } from "react";
function InputField({
  type,
  filed,
  placeholder = "",
  icon,
  register,
  errors = {},
  ...props
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full">
      <label
        htmlFor={filed}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {filed}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={
            type === "password"
              ? showPass
                ? "text"
                : "password"
              : type || "text"
          }
          id={filed}
          placeholder={placeholder}
          {...register}
          {...props}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
            icon && "ps-10"
          } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />

        {type === "password" && (
          <div
            className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 text-[#000] dark:text-[#fff] cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        )}
      </div>
      {Object.keys(errors).length > 0 && (
        <p className="text-red-500">{errors}</p>
      )}
    </div>
  );
}

export default InputField;
