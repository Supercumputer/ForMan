import { Button } from 'flowbite-react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserPassword } from '../../apis/userApi';

const schema = z.object({
    email: z.string().email({ message: "Email không hợp lệ." }),
    password: z
        .string()
        .min(8, { message: "Password phải tối thiểu là 8 kí tự." }),
    newPassword: z
        .string()
        .min(8, { message: "New password phải tối thiểu là 8 kí tự." }),
});

function ResetPassword() {

    const {account} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await updateUserPassword(account?.id, data);
            if (res && res.status) {
                toast.success(res.message);
            }else{
                toast.error(res.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="font-semibold text-2xl mb-6">Đặt lại mật khẩu</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div>
                    <div className="relative z-0">
                        <input type="text" {...register('email')} id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                    </div>
                    {errors.email && <p id="standard_error_help" className="mt-2 text-xs text-red-600 ">{errors?.email?.message}</p>}
                </div>

                <div>
                    <div className="relative z-0">
                        <input type="text" {...register('password')} id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Mật khẩu hiện tại.</label>
                    </div>
                    {errors.password && <p id="standard_error_help" className="mt-2 text-xs text-red-600 ">{errors?.password?.message}</p>}
                </div>

                <div>
                    <div className="relative z-0">
                        <input type="text" {...register('newPassword')} id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Mật khẩu mới.</label>
                    </div>
                    {errors.newPassword && <p id="standard_error_help" className="mt-2 text-xs text-red-600 ">{errors?.newPassword?.message}</p>}

                </div>

                <div className="flex justify-center mt-8">
                    <Button type="submit" size="md" isProcessing={false} color="dark">
                        Reset Password
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
