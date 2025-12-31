'use client';

import { PropsWithChildren, useState } from 'react';
import { ITodo } from '@libs';
import { TodoContext } from './todo-context';
import { ITodoContext } from './todo-context';
import { v4 as uuidv4 } from 'uuid';
import todoData from '../data/todoData.json';
import { TodoPriorityEnum } from '@libs';
import { TodoStatusEnum } from '@libs';
import { TodoTypeEnum } from '@libs';
import { TodoLabelEnum } from '@libs';

export const TodoContextProvider = ({ children }: PropsWithChildren) => {
  const parseTodoData = (data: any): ITodo[] => {
    return data.map((todo: any) => ({
      ...todo,
      labels: todo.labels as TodoLabelEnum[],
      status: todo.status as TodoStatusEnum,
      priority: todo.priority as TodoPriorityEnum,
      type: todo.type as TodoTypeEnum,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
      deletedAt: todo.deletedAt ? new Date(todo.deletedAt) : undefined,
    }));
  };

  const [data, setData] = useState<ITodo[]>(parseTodoData(todoData));

  const onCreate = (todo: Omit<ITodo, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) =>
    void setData((prev) => [
      ...prev,
      { ...todo, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() },
    ]);
  const onUpdate = (id: string, todo: Partial<ITodo>) =>
    void setData((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...todo, updatedAt: new Date() } : t))
    );
  const onDelete = (id: string) => void setData((prev) => prev.filter((t) => t.id !== id));
  const getById = (id: string) => data.find((t) => t.id === id);

  const value: ITodoContext = {
    data,
    onCreate,
    onUpdate,
    onDelete,
    getById,
  };

  return <TodoContext value={value}>{children}</TodoContext>;
};
