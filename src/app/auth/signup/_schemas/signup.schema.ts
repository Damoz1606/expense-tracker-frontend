import { z } from "zod";

export default z.object({
    email: z.string().email({
        message: 'This field must be an email'
    }).max(64, {
        message: 'Email is too long. Max 64 char.'
    }),
    username: z.string().min(1, {
        message: 'Username cannot be empty'
    }).max(64, {
        message: 'Username is too long. Max 64 char.'
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }).refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase'
    }).refine((value) => /[0-9]/.test(value), {
        message: 'Password must contain at least one number'
    }).refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'Password must contain at least one special character'
    })
})
