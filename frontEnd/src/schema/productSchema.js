import { z } from "zod";

const productSchema = z.object({
    code: z.string().min(1, { message: "Mã không hợp lệ." }), // Code là một chuỗi không rỗng
    name: z.string().min(1, { message: "Tên không hợp lệ." }), // Name là một chuỗi không rỗng
    brand: z.string().min(1, { message: "Thương hiệu không hợp lệ." }), // Brand là một chuỗi không rỗng
    color: z.string().min(1, { message: "Màu không hợp lệ." }), // Color là một chuỗi không rỗng
    price: z.preprocess((val) => {
        if (typeof val === "string") val = val.trim();
        return val === "" ? NaN : parseFloat(val);
    }, z.number({ invalid_type_error: "Giá phải là một số." }).positive({ message: "Giá phải là một số dương." })), // Chuyển đổi giá trị thành số và kiểm tra giá trị dương
    quantity: z.preprocess((val) => {
        if (typeof val === "string") val = val.trim();
        return val === "" ? NaN : parseInt(val, 10);
    }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
    size: z.string().min(1, { message: "Size không hợp lệ." }), // Size là một chuỗi không rỗng
    images: z.custom((value) => {
        if (value instanceof FileList) {
            return value.length > 0;
        }
        return true;
    }, "Ảnh không hợp lệ."),
});


export default productSchema