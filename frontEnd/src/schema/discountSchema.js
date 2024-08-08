import { z } from "zod";

const discountSchema = z.object({
    code: z.string().min(1, { message: "Code không hợp lệ." }),
    description: z.string().min(1, { message: "Description không hợp lệ." }),
    validFrom: z.string().min(1, { message: "Ngày bắt đầu không hợp lệ." }),
    validTo: z.string().min(1, { message: "Ngày kết thúc không hợp lệ." }),
    status: z.string().min(1, { message: "Status không hợp lệ." }),
    quantity: z.preprocess((val) => {
        if (typeof val === "string") val = val.trim();
        return val === "" ? NaN : parseInt(val, 10);
    }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
    percentage: z.preprocess((val) => {
        if (typeof val === "string") val = val.trim();
        return val === "" ? NaN : parseInt(val, 10);
    }, z.number({ invalid_type_error: "Số lượng phải là một số." }).int({ message: "Số lượng phải là số nguyên." }).positive({ message: "Số lượng phải là số nguyên dương." })),
});

export default discountSchema