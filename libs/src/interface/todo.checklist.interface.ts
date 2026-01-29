import { ITodo } from './todos.interface';

export interface ITodoChecklistItem {
  id: string;
  title: string;
  isChecked: boolean;
  assigned: string;
  date: Date;
  todo: ITodo;
  todoId: string;
}
