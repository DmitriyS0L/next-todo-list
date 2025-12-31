"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = exports.taskBaseSchema = void 0;
const todo_label_enum_1 = require("../enums/todo-label.enum");
const todo_priority_enum_1 = require("../enums/todo-priority.enum");
const todo_status_enum_1 = require("../enums/todo-status.enum");
const todo_type_enum_1 = require("../enums/todo-type.enum");
const zod_1 = require("zod");
const ChecklistItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().trim(),
    isChecked: zod_1.z.boolean(),
    assigned: zod_1.z.string(),
    date: zod_1.z.date(),
});
exports.taskBaseSchema = zod_1.z
    .object({
    title: zod_1.z.string().trim().min(1, 'Title is required'),
    description: zod_1.z.string().trim().default('').optional(),
    status: zod_1.z.enum(todo_status_enum_1.TodoStatusEnum).default(todo_status_enum_1.TodoStatusEnum.PENDING),
    type: zod_1.z.enum(todo_type_enum_1.TodoTypeEnum),
    priority: zod_1.z.enum(todo_priority_enum_1.TodoPriorityEnum).optional(),
    labels: zod_1.z.array(zod_1.z.enum(todo_label_enum_1.TodoLabelEnum)).default([]),
    comment: zod_1.z.array(zod_1.z.string().trim()).nullable().optional(),
    deadline: zod_1.z.coerce.date().optional(),
    checklist: zod_1.z.array(ChecklistItemSchema).optional().default([]),
})
    .refine((v) => !v.deadline || v.deadline.getTime() > Date.now(), {
    path: ['deadline'],
    message: 'Deadline must be in the future',
});
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Заголовок обовʼязковий'),
    priority: zod_1.z.enum(todo_priority_enum_1.TodoPriorityEnum),
    type: zod_1.z.enum(todo_type_enum_1.TodoTypeEnum),
});
exports.updateTaskSchema = exports.taskBaseSchema
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Provide at least one field to update',
});
