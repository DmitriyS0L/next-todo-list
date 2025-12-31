import { ITodo } from '@libs';
import { createContext } from 'react';

export interface ITodoContext {
  data: ITodo[];
  onCreate: (todo: Omit<ITodo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, todo: Partial<ITodo>) => void;
  onDelete: (id: string) => void;
  getById: (id: string) => ITodo | undefined;
}

export const TodoContext = createContext<ITodoContext>({
  data: [],
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  getById: () => undefined,
});
