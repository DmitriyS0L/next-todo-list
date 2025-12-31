import { TodoTypeEnum } from '@libs';

export const TODO_COLOR_TYPE: Record<TodoTypeEnum, string> = {
  [TodoTypeEnum.TASK]: 'bg-blue-100 text-blue-800',
  [TodoTypeEnum.STORY]: 'bg-green-100 text-green-800',
  [TodoTypeEnum.EPIC]: 'bg-purple-100 text-purple-800',
  [TodoTypeEnum.BUG]: 'bg-red-100 text-red-800',
  [TodoTypeEnum.SPIKE]: 'bg-yellow-100 text-yellow-800',
};
