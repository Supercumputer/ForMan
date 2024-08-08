import { z } from "zod";

const colorSchema = z.object({
    colorName: z.string().min(1, { message: "ColorName không hợp lệ." }),
    description: z.string().min(1, { message: "Description không hợp lệ." }),
});

export default colorSchema