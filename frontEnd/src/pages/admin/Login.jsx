
import { ButtonPro, InputField } from "../../components/common";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiLogin } from "../../apis/axios";
import { login } from "../../redux/auth";
import { checkAdminOrUser } from "../../utils/helper";

const schema = z.object({
  email: z.string().email({ message: "Email không hợp lệ." }),
  password: z
    .string()
    .min(8, { message: "Password phải tối thiểu là 8 kí tự." }),
});

const Login = () => {
  const navigate = useNavigate();

  const dispath = useDispatch();

  const darkMode = useSelector((state) => state.darkMode.dark);

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

      if (res && res.status && checkAdminOrUser(res?.user?.role?.name)) {
        dispath(login(res.user));
        navigate("/admin/dashboard");
        toast.success("Đăng nhập thành công.");
      } else {
        toast.warning("Email hoặc mật khẩu sai.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen bg-gray-900 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="flex flex-col px-6 py-12 bg-gray-800 w-96 rounded-md text-[#fff]">
        <div className="">
          <img
            className="mx-auto h-20 w-auto"
            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in admin account
          </h2>
        </div>

        <div className="mt-10">
          <form className="space-y-6" onSubmit={handleSubmit(handlerSubmit)}>
            <div>
              <InputField
                filed="Email"
                type="email"
                placeholder="Email address"
                register={register("email")}
                errors={errors?.email?.message}
              />
            </div>

            <div>
              <InputField
                filed="Password"
                type="password"
                placeholder="Password"
                register={register("password")}
                errors={errors?.password?.message}
              />
            </div>

            <ButtonPro
              type="submit"
              name="Sign in"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href=""
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
