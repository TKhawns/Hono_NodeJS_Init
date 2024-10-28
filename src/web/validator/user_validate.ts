import { validator } from 'hono/validator';
import { z } from 'zod';
import { validateSchema } from './validator.js';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

const loginValidator = validator('json', (value, c) => {
    return validateSchema(c, loginSchema, value);
});
const registerValidator = validator('json', (value, c) => {
    return validateSchema(c, registerSchema, value);
});

type LoginBody = z.infer<typeof loginSchema>;
type RegisterBody = z.infer<typeof registerSchema>

export type { LoginBody, loginValidator, RegisterBody, registerValidator };