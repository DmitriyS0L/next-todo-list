import { TodoLabelEnum } from '../enums/todo-label.enum';
import { TodoPriorityEnum } from '../enums/todo-priority.enum';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { TodoTypeEnum } from '../enums/todo-type.enum';
import { ITodoChecklistItem } from './todo.checklist.interface';
import { IUser } from './user.interface';

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  labels?: TodoLabelEnum[];
  status: TodoStatusEnum;
  priority?: TodoPriorityEnum;
  type: TodoTypeEnum;
  comment?: string[];
  deadline?: Date;
  checklist?: ITodoChecklistItem[];
  order: number;
  user: IUser;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
