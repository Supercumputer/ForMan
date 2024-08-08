import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser } from "../../apis/authApi";

const schema = z
  .object({
    firstName: z.string().min(1, { message: "Firstname hợp lệ." }), // Đúng tên biến
    lastName: z.string().min(1, { message: "Lastname hợp lệ." }),
    email: z.string().email({ message: "Email không hợp lệ." }),
    password: z
      .string()
      .min(8, { message: "Password phải tối thiểu là 8 kí tự." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password phải tối thiểu là 8 kí tự." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"], // Gắn lỗi vào field confirmPassword
  });
const Register = () => {

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
      const res = await registerUser(data);

      if (res && res.status) {
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
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
          WELCOME TO TICKET
        </h1>

        <form onSubmit={handleSubmit(handlerSubmit)} className="p-8">

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_lastName" // Đúng tên biến
                id="floating_lastName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("lastName")}
              />
              <label
                htmlFor="floating_lastName"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                LastName
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_firstName" // Đúng tên biến
                id="floating_firstName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("firstName")}
              />
              <label
                htmlFor="floating_firstName"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                FirstName
              </label>
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("email")}
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("password")}
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="relative z-0 w-full mb-8 group">
            <input
              type="password"
              name="floating_confirmPassword"
              id="floating_confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("confirmPassword")}
            />
            <label
              htmlFor="floating_confirmPassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="flex gap-2 items-center justify-center w-full py-2.5 px-4 mb-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              <i className="fa-brands fa-google"></i>
              <span>Register with Google</span>
            </button>

            <button
              type="button"
              className="flex gap-2 items-center justify-center w-full py-2.5 px-4 mb-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Register with Facebook</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-5 py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Đăng Kí
          </button>

          <p className="mt-10 text-center text-sm text-gray-500 flex gap-3 justify-center">
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Đã có tài khoản? Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
