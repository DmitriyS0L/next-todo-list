"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = exports.updateTaskSchema = exports.taskFieldsSchema = exports.ChecklistItemSchema = void 0;
const zod_1 = require("zod");
const todo_label_enum_1 = require("../enums/todo-label.enum");
const todo_priority_enum_1 = require("../enums/todo-priority.enum");
const todo_status_enum_1 = require("../enums/todo-status.enum");
const todo_type_enum_1 = require("../enums/todo-type.enum");
exports.ChecklistItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().trim().min(1, 'Checklist title is required'),
    isChecked: zod_1.z.boolean(),
    assigned: zod_1.z.string().trim().optional(),
    date: zod_1.z.coerce.date(),
});
exports.taskFieldsSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, 'Title is required'),
    description: zod_1.z.string().trim().default(''),
    status: zod_1.z.nativeEnum(todo_status_enum_1.TodoStatusEnum).default(todo_status_enum_1.TodoStatusEnum.PENDING),
    type: zod_1.z.nativeEnum(todo_type_enum_1.TodoTypeEnum),
    priority: zod_1.z.nativeEnum(todo_priority_enum_1.TodoPriorityEnum),
    labels: zod_1.z.array(zod_1.z.nativeEnum(todo_label_enum_1.TodoLabelEnum)).default([]),
    comment: zod_1.z.array(zod_1.z.string().trim()).default([]),
    deadline: zod_1.z.coerce.date().optional(),
    checklist: zod_1.z.array(exports.ChecklistItemSchema).default([]),
});
// export const createTaskSchema = taskFieldsSchema.refine(
//   (v) => !v.deadline || v.deadline.getTime() > Date.now(),
//   {
//     path: ['deadline'],
//     message: 'Deadline must be in the future',
//   }
// );
exports.updateTaskSchema = exports.taskFieldsSchema
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Provide at least one field to update',
})
    .refine((v) => !v.deadline || v.deadline.getTime() > Date.now(), {
    path: ['deadline'],
    message: 'Deadline must be in the future',
});
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Заголовок обовʼязковий'),
    priority: zod_1.z.nativeEnum(todo_priority_enum_1.TodoPriorityEnum),
    type: zod_1.z.nativeEnum(todo_type_enum_1.TodoTypeEnum),
});
