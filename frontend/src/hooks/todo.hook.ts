import { TodoContext } from '@/context/todo-context';
import { useContext } from 'react';

export const useTodo = () => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('todoContext must be used within a TodoContextProvider');
  }

  return todoContext;
};
