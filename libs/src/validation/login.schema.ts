import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email не може бути порожнім' })
    .email({ message: 'Некоректний формат email' }),

  password: z.string().min(6, { message: 'Пароль має бути не менше 6 символів' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
