'use server';

import { API_HOST } from '@/config';
import { UpdateTodoDto } from '@libs/shared';
import { revalidatePath } from 'next/cache';

export const updateTaskAction = async (id: string, task: UpdateTodoDto) => {
  await fetch(`${API_HOST}/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  revalidatePath('/todos');
};
