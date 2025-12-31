import { TodoLabelEnum } from '../enums/todo-label.enum';
import { TodoPriorityEnum } from '../enums/todo-priority.enum';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { TodoTypeEnum } from '../enums/todo-type.enum';
import { z } from 'zod';
export declare const taskBaseSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<typeof TodoStatusEnum>>;
    type: z.ZodEnum<typeof TodoTypeEnum>;
    priority: z.ZodOptional<z.ZodEnum<typeof TodoPriorityEnum>>;
    labels: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof TodoLabelEnum>>>;
    comment: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    checklist: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        isChecked: z.ZodBoolean;
        assigned: z.ZodString;
        date: z.ZodDate;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    priority: z.ZodEnum<typeof TodoPriorityEnum>;
    type: z.ZodEnum<typeof TodoTypeEnum>;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodString>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof TodoStatusEnum>>>;
    type: z.ZodOptional<z.ZodEnum<typeof TodoTypeEnum>>;
    priority: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof TodoPriorityEnum>>>;
    labels: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<typeof TodoLabelEnum>>>>;
    comment: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>>;
    deadline: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    checklist: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        isChecked: z.ZodBoolean;
        assigned: z.ZodString;
        date: z.ZodDate;
    }, z.core.$strip>>>>>;
}, z.core.$strip>;
export type CreateTodoInput = z.infer<typeof createTaskSchema>;
export type UpdateTodoDto = z.infer<typeof updateTaskSchema>;
//# sourceMappingURL=todo.schema.d.ts.map