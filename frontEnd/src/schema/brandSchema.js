import { z } from "zod";

const brandShema = z.object({
    brandName: z.string().min(1, { message: "Tên thương hiệu không hợp lệ." }),
    description: z.string().min(1, { message: "Mô tả không hợp lệ." }),
    country: z.string().min(1, { message: "Quốc gia không hợp lệ." }),
    website: z.string().min(1, { message: "Website không hợp lệ." }),
    contactEmail: z.string().min(1, { message: "Email không hợp lệ." }),
    logo: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Logo không hợp lệ."),
});

export default brandShema