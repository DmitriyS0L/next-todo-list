import { TodoLabelEnum } from '@libs';

export const TODO_COLOR_LABEL: Record<TodoLabelEnum, string> = {
  [TodoLabelEnum.NEW]: 'bg-green-100 text-green-800',
  [TodoLabelEnum.GOAL]: 'bg-blue-100 text-blue-800',
  [TodoLabelEnum.ENCHACEMENT]: 'bg-yellow-100 text-yellow-800',
  [TodoLabelEnum.BUG]: 'bg-red-100 text-red-800',
  [TodoLabelEnum.DOCUMENTATION]: 'bg-gray-300 text-gray-8000',
  [TodoLabelEnum.HELPER]: 'bg-orange-200 text-orange-800',
};

export const TODO_COLOR_LABEL_DROPDOWN: Record<TodoLabelEnum, string> = {
  [TodoLabelEnum.NEW]: 'bg-green-100 text-green-800 hover:bg-green-200 transition-all',
  [TodoLabelEnum.GOAL]: 'bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all',
  [TodoLabelEnum.ENCHACEMENT]: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all',
  [TodoLabelEnum.BUG]: 'bg-red-100 text-red-800 hover:bg-red-200 transition-all',
  [TodoLabelEnum.DOCUMENTATION]: 'bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all',
  [TodoLabelEnum.HELPER]: 'bg-orange-200 text-orange-800 hover:bg-orange-300 transition-all ',
};
