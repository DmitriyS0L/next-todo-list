import { TodoLabelEnum } from '../enums/todo-label.enum';
import { TodoPriorityEnum } from '../enums/todo-priority.enum';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { TodoTypeEnum } from '../enums/todo-type.enum';
export declare class CreateTodoDto {
    title: string;
    description?: string;
    priority?: TodoPriorityEnum;
    type: TodoTypeEnum;
}
declare const UpdateTodoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTodoDto>>;
export declare class UpdateTodoDto extends UpdateTodoDto_base {
    status?: TodoStatusEnum;
    labels?: TodoLabelEnum[];
    comment?: string[];
    deadline?: Date;
}
export declare class DeleteTodoDto {
    id: string;
}
export {};
//# sourceMappingURL=todo.dto.d.ts.map