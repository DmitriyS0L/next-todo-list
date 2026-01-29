"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: 'Email не може бути порожнім' })
        .email({ message: 'Некоректний формат email' }),
    password: zod_1.z.string().min(6, { message: 'Пароль має бути не менше 6 символів' }),
});
