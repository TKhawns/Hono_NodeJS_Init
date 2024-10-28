import { validator } from 'hono/validator';
import { z } from 'zod';
import { validateSchema } from './validator.js';

const loginSchema = z.object({
    email: z.string().email(),
    age: z.string().min(0).max(20),
});

const loginValidator = validator('json', (value, c) => {
    return validateSchema(c, loginSchema, value);
});

type LoginBody = z.infer<typeof loginSchema>;

export type { LoginBody, loginValidator };