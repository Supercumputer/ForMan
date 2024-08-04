import React, { useEffect, useState } from 'react'
import { Img } from '../common'
import { Button } from 'flowbite-react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { apiUpdateUser } from '../../apis/axios';
import { toast } from 'react-toastify'

const schema = z.object({
  userName: z.string().min(1, { message: "Username không hợp lệ." }),
  firstName: z.string().min(1, { message: "First name không hợp lệ." }),
  lastName: z.string().min(1, { message: "Last name không hợp lệ." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  phone: z.string().regex(/^0[0-9]{9}$/, {
    message: "Phone không hợp lệ.",
  }),
  status: z.enum(["InActive", "Active", "Banned"], {
    message: "Status không hợp lệ.",
  }),
  sex: z.enum(["Male", "Female", "Other"], { message: "Sex không hợp lệ." }),
  birthDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Birthday phải đúng định dạng YYYY-MM-DD.",
  }),

});

function InforAccount({ data, account }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatarPreview(file);
  };

  const handlerSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      formData.append("avatar", avatarPreview);

      const res = await apiUpdateUser(formData, account?.id);

      if (res && !res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      const newData = {
        ...data,
        birthDay: data.birthDay
          ? new Date(data.birthDay).toISOString().split("T")[0]
          : ""
      }
      reset(newData)
    }
  }, [data])

  useEffect(() => {
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
    };
  }, [avatarPreview]);

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-6">Thông tin cá nhân</h1>

      <form onSubmit={handleSubmit(handlerSubmit)} >
        <div className="flex md:flex-row flex-col-reverse md:items-center gap-10">

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">UserName: </span>
              <input type="text" {...register('userName')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
            </div>
            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">Họ: </span>
              <input type="text" {...register('lastName')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
            </div>
            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">Tên: </span>
              <input type="text" {...register('firstName')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
            </div>
            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">Email: </span>
              <input type="text" {...register('email')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
            </div>
            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">Số điện thoại: </span>
              <input type="text" {...register('phone')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
            </div>
            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">Giới tính: </span>
              {
                isEdit ? <select id="underline_select" {...register('sex')} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  <option selected>Chọn giới tính</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select> :
                  <input type="text" {...register('sex')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
              }
            </div>

            <div className="flex items-center lg:gap-4 gap-0 font-semibold">
              <span className="min-w-[150px]">Ngày sinh: </span>
              {
                isEdit ?
                  <input type="date" {...register('birthDay')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-[#ccc] block w-full bg-transparent p-2.5" placeholder="Select date" />
                  : <input type="text" {...register('birthDay')} readOnly={!isEdit} className="outline-none border-b border-transparent border-b-[#ccc] focus:ring-0 px-0 text-[#333] focus:border-transparent focus:border-b-[#ccc] w-full" />
              }
            </div>

          </div>

          <div className="w-36 mx-auto flex flex-col items-center">
            <Img src={avatarPreview?.preview || data.avatar} className="rounded-full object-cover h-32 w-32 border-2 border-gray-200" />
            <label className="mt-2 text-gray-600 font-semibold" htmlFor="avatar">Avatar</label>
            {isEdit && <input type="file" onChange={handleAvatarChange} className="hidden" id="avatar" />}
          </div>

        </div>

        <div className="flex justify-center mt-8">
          {isEdit ? <Button type="submit" size="md" isProcessing={isLoading} color="dark" >
            Save Changes
          </Button> : <Button size="md" isProcessing={false} color="dark" onClick={() => setIsEdit(true)}>
            <div className="flex items-center gap-2"><i class="fa-solid fa-pen-to-square"></i><span>Edit info</span></div>
          </Button>}

        </div>

      </form>

    </div >
  )
}

export default InforAccount




