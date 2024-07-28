import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiLogin } from "../../apis/axios";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";

const schema = z.object({
  email: z.string().email({ message: "Email không hợp lệ." }),
  password: z
    .string()
    .min(8, { message: "Password phải tối thiểu là 8 kí tự." }),
});

const Login = () => {
  const { account, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handlerSubmit = async (data) => {
    try {
      const res = await apiLogin(data);

      if (res && res.status) {
        navigate("/");
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    // <div
    //   className={`flex justify-center items-center h-screen bg-gray-900 ${
    //     darkMode ? "dark" : ""
    //   }`}
    // >
    //   <div className="flex flex-col px-6 py-12 bg-gray-800 w-96 rounded-md text-[#fff]">
    //     <div className="">
    //       <img
    //         className="mx-auto h-20 w-auto"
    //         src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
    //         alt="Your Company"
    //       />
    //       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
    //         Sign in admin account
    //       </h2>
    //     </div>

    //     <div className="mt-10">
    //       <form className="space-y-6" onSubmit={handleSubmit(handlerSubmit)}>
    //         <div>
    //           <InputField
    //             filed="Email"
    //             type="email"
    //             placeholder="Email address"
    //             register={register("email")}
    //             errors={errors?.email?.message}
    //           />
    //         </div>

    //         <div>
    //           <InputField
    //             filed="Password"
    //             type="password"
    //             placeholder="Password"
    //             register={register("password")}
    //             errors={errors?.password?.message}
    //           />
    //         </div>

    //         <ButtonPro
    //           type="submit"
    //           name="Sign in"
    //           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         />
    //       </form>

    //       <p className="mt-10 text-center text-sm text-gray-500">
    //         Not a member?{" "}
    //         <Link
    //           href=""
    //           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    //         >
    //           Start a 14 day free trial
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    isLoading ? (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    ) : !isAuthenticated && Object.keys(account).length <= 0 ? (
      <div className="flex items-center h-screen bg-[#fff] w-screen overflow-hidden relative">
        <div className="flex-1 h-full">
          <img
            className="w-full h-full object-cover"
            src="https://danangaz.com/wp-content/uploads/2020/07/shop-quan-ao-nam-can-tho-9-min.jpg"
            alt=""
          />
        </div>

        <div className="flex-1 absolute md:static left-0 right-0 bg-[rgba(255,255,255,0.9)] md:bg-[#fff]">
          <img
            src="https://themen.com.vn/themes/default/images/logo.png"
            alt=""
            className="h-[150px] mx-auto"
          />
          <h1 className="text-3xl font-bold text-center mb-6">
            WELLCOME TO TICKET
          </h1>

          <form className="p-8" onSubmit={handleSubmit(handlerSubmit)}>
            <div className="mb-6">
              <div className="relative z-0 w-full">
                <input
                  type="email"
                  id="floating_email"
                  {...register("email")}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              {errors?.email?.message && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs font-medium text-red-600 "
                >
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <div className="relative z-0 w-full">
                <input
                  type="password"
                  {...register("password")}
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              {errors?.password?.message && (
                <p
                  id="standard_error_help"
                  class="mt-2 text-xs font-medium text-red-600 "
                >
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <a
                href="http://localhost:3001/api/auth/google"
                className="flex gap-2 items-center justify-center w-full py-2.5 px-4 mb-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                <i class="fa-brands fa-google"></i>
                <span>Login with Google</span>
              </a>

              <button
                type="button"
                className="flex gap-2 items-center justify-center w-full py-2.5 px-4 mb-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                <i class="fa-brands fa-facebook"></i>
                <span>Login with Facebook</span>
              </button>
            </div>

            <button className="w-full mt-5 py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Đăng Nhập
            </button>

            <p className="mt-10 text-center text-sm text-gray-500 flex gap-3 justify-center">
              <Link
                href=""
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu ?
              </Link>
              <span>|</span>
              <Link
                href=""
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Đăng kí tài khoản
              </Link>
            </p>
          </form>
        </div>
      </div>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default Login;
