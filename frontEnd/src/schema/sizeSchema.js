import { z } from "zod";

const sizeSchema = z.object({
    sizeName: z.string().min(1, { message: "SizeName không hợp lệ." }),
    description: z.string().min(1, { message: "Description không hợp lệ." }),
});

export default sizeSchema;