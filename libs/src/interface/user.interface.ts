import { ITodo } from './todos.interface';
import { UserRoleEnum } from '../enums/user-role.enum';

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRoleEnum;
  isActive: boolean;
  todos: ITodo[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
