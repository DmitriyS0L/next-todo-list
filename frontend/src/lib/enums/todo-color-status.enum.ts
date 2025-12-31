import { TodoStatusEnum } from '@libs';

export const TODO_COLOR_STATUS: Record<TodoStatusEnum, string> = {
  [TodoStatusEnum.PENDING]: 'bg-yellow-700',
  [TodoStatusEnum.IN_PROGRESS]: 'bg-blue-600',
  [TodoStatusEnum.COMPLETED]: 'bg-green-700',
  [TodoStatusEnum.DONE]: 'bg-gray-800',
};
