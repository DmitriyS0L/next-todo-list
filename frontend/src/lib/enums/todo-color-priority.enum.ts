import { TodoPriorityEnum } from '@libs';

export const todoPriorityStyles: Record<TodoPriorityEnum, string> = {
  [TodoPriorityEnum.LOW]: 'bg-green-100 text-green-600 border border-green-300',
  [TodoPriorityEnum.MEDIUM]: 'bg-amber-100 text-amber-600 border border-amber-300',
  [TodoPriorityEnum.HIGH]: 'bg-orange-100 text-orange-600 border border-orange-300',
  [TodoPriorityEnum.CRITICAL]: 'bg-red-100 text-red-600 border border-red-300',
};
