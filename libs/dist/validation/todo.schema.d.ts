import { z } from 'zod';
import { TodoLabelEnum } from '../enums/todo-label.enum';
import { TodoPriorityEnum } from '../enums/todo-priority.enum';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { TodoTypeEnum } from '../enums/todo-type.enum';
export declare const ChecklistItemSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    isChecked: z.ZodBoolean;
    assigned: z.ZodOptional<z.ZodString>;
    date: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    isChecked: boolean;
    date: Date;
    assigned?: string | undefined;
}, {
    id: string;
    title: string;
    isChecked: boolean;
    date: Date;
    assigned?: string | undefined;
}>;
export declare const taskFieldsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    status: z.ZodDefault<z.ZodNativeEnum<typeof TodoStatusEnum>>;
    type: z.ZodNativeEnum<typeof TodoTypeEnum>;
    priority: z.ZodNativeEnum<typeof TodoPriorityEnum>;
    labels: z.ZodDefault<z.ZodArray<z.ZodNativeEnum<typeof TodoLabelEnum>, "many">>;
    comment: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    deadline: z.ZodOptional<z.ZodDate>;
    checklist: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        isChecked: z.ZodBoolean;
        assigned: z.ZodOptional<z.ZodString>;
        date: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }, {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: TodoTypeEnum;
    status: TodoStatusEnum;
    description: string;
    priority: TodoPriorityEnum;
    labels: TodoLabelEnum[];
    comment: string[];
    checklist: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[];
    deadline?: Date | undefined;
}, {
    title: string;
    type: TodoTypeEnum;
    priority: TodoPriorityEnum;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}>;
export declare const updateTaskSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodNativeEnum<typeof TodoStatusEnum>>>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof TodoTypeEnum>>;
    priority: z.ZodOptional<z.ZodNativeEnum<typeof TodoPriorityEnum>>;
    labels: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodNativeEnum<typeof TodoLabelEnum>, "many">>>;
    comment: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    deadline: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    checklist: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        isChecked: z.ZodBoolean;
        assigned: z.ZodOptional<z.ZodString>;
        date: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }, {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    type?: TodoTypeEnum | undefined;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    priority?: TodoPriorityEnum | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}, {
    title?: string | undefined;
    type?: TodoTypeEnum | undefined;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    priority?: TodoPriorityEnum | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}>, {
    title?: string | undefined;
    type?: TodoTypeEnum | undefined;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    priority?: TodoPriorityEnum | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}, {
    title?: string | undefined;
    type?: TodoTypeEnum | undefined;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    priority?: TodoPriorityEnum | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}>, {
    title?: string | undefined;
    type?: TodoTypeEnum | undefined;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    priority?: TodoPriorityEnum | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}, {
    title?: string | undefined;
    type?: TodoTypeEnum | undefined;
    status?: TodoStatusEnum | undefined;
    description?: string | undefined;
    priority?: TodoPriorityEnum | undefined;
    labels?: TodoLabelEnum[] | undefined;
    comment?: string[] | undefined;
    deadline?: Date | undefined;
    checklist?: {
        id: string;
        title: string;
        isChecked: boolean;
        date: Date;
        assigned?: string | undefined;
    }[] | undefined;
}>;
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    priority: z.ZodNativeEnum<typeof TodoPriorityEnum>;
    type: z.ZodNativeEnum<typeof TodoTypeEnum>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: TodoTypeEnum;
    priority: TodoPriorityEnum;
}, {
    title: string;
    type: TodoTypeEnum;
    priority: TodoPriorityEnum;
}>;
export type CreateTodoInput = z.infer<typeof createTaskSchema>;
export type UpdateTodoDto = z.infer<typeof updateTaskSchema>;
//# sourceMappingURL=todo.schema.d.ts.map