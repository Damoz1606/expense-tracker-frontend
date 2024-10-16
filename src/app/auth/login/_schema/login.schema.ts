import { z } from "zod";

export default z.object({
    email: z.string().email({
        message: 'This field must be an email'
    }),
    password: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }),
})