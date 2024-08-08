import { z } from "zod";

const categorySchema = z.object({
    categoryName: z.string().min(1, { message: "Tên danh mục không hợp lệ." }),
    description: z.string().min(1, { message: "Mô tả không hợp lệ." }),
    parentId: z.string().optional(),
    image: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Ảnh không hợp lệ."),
});

export default categorySchema