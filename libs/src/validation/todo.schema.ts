import { TodoLabelEnum } from '../enums/todo-label.enum';
import { TodoPriorityEnum } from '../enums/todo-priority.enum';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { TodoTypeEnum } from '../enums/todo-type.enum';
import { date, z } from 'zod';

const ChecklistItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim(),
  isChecked: z.boolean(),
  assigned: z.string(),
  date: z.date(),
});

export const taskBaseSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().trim().default('').optional(),
    status: z.enum(TodoStatusEnum).default(TodoStatusEnum.PENDING),
    type: z.enum(TodoTypeEnum),
    priority: z.enum(TodoPriorityEnum).optional(),
    labels: z.array(z.enum(TodoLabelEnum)).default([]),
    comment: z.array(z.string().trim()).nullable().optional(),
    deadline: z.coerce.date().optional(),
    checklist: z.array(ChecklistItemSchema).optional().default([]),
  })
  .refine((v) => !v.deadline || v.deadline.getTime() > Date.now(), {
    path: ['deadline'],
    message: 'Deadline must be in the future',
  });

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Заголовок обовʼязковий'),
  priority: z.enum(TodoPriorityEnum),
  type: z.enum(TodoTypeEnum),
});

export const updateTaskSchema = taskBaseSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Provide at least one field to update',
  });

export type CreateTodoInput = z.infer<typeof createTaskSchema>;
export type UpdateTodoDto = z.infer<typeof updateTaskSchema>;
