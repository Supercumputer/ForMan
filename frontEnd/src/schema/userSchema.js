import { z } from "zod";

const userSchema = z
    .object({
        firstName: z.string().min(1, { message: "First name không hợp lệ." }),
        lastName: z.string().min(1, { message: "Last name không hợp lệ." }),
        email: z.string().email({ message: "Email không hợp lệ." }),
        phone: z.string().regex(/^0[0-9]{9}$/, {
            message: "Phone không hợp lệ.",
        }),
        sex: z.enum(["Male", "Female", "Other"], { message: "Sex không hợp lệ." }),
        role: z
            .string()
            .min(1, { message: "Vui lòng chọn quyền cho tài khoản này." }),
        birthDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Birthday phải đúng định dạng YYYY-MM-DD.",
        }),
        avatar: z
            .instanceof(FileList)
            .refine((files) => files.length > 0, "Avatar không hợp lệ."),
        password: z
            .string()
            .min(8, { message: "Password phải tối thiểu là 8 kí tự." }),
        confirmPassword: z
            .string()
            .min(8, { message: "Confirm password phải tối thiểu là 8 kí tự." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp.",
        path: ["confirmPassword"],
    });

export default userSchema