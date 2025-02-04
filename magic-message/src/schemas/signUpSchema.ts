import { z } from 'zod'

export const usernameValidation = z.string().min(5, 'UserName must be atleast 5 character').max(25, 'UserName must not be more than 25 character').regex(/^[a-zA-Z0-9_]+$/, 'Username must not contian special character')

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z.string().min(6, { message: "Password Must be atleast 6 character" })
})