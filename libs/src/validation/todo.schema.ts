import { z } from 'zod';
import { TodoLabelEnum } from '../enums/todo-label.enum';
import { TodoPriorityEnum } from '../enums/todo-priority.enum';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { TodoTypeEnum } from '../enums/todo-type.enum';

export const ChecklistItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1, 'Checklist title is required'),
  isChecked: z.boolean(),
  assigned: z.string().trim().optional(),
  date: z.coerce.date(),
});

export const taskFieldsSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().default(''),
  status: z.nativeEnum(TodoStatusEnum).default(TodoStatusEnum.PENDING),
  type: z.nativeEnum(TodoTypeEnum),
  priority: z.nativeEnum(TodoPriorityEnum),
  labels: z.array(z.nativeEnum(TodoLabelEnum)).default([]),
  comment: z.array(z.string().trim()).default([]),
  deadline: z.coerce.date().optional(),
  checklist: z.array(ChecklistItemSchema).default([]),
});

// export const createTaskSchema = taskFieldsSchema.refine(
//   (v) => !v.deadline || v.deadline.getTime() > Date.now(),
//   {
//     path: ['deadline'],
//     message: 'Deadline must be in the future',
//   }
// );

export const updateTaskSchema = taskFieldsSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Provide at least one field to update',
  })
  .refine((v) => !v.deadline || v.deadline.getTime() > Date.now(), {
    path: ['deadline'],
    message: 'Deadline must be in the future',
  });

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Заголовок обовʼязковий'),
  priority: z.nativeEnum(TodoPriorityEnum),
  type: z.nativeEnum(TodoTypeEnum),
});

export type CreateTodoInput = z.infer<typeof createTaskSchema>;
export type UpdateTodoDto = z.infer<typeof updateTaskSchema>;
