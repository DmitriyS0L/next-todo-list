'use server';

import { API_HOST } from '@/config';
import { createTaskSchema, CreateTodoInput } from '@libs/shared';
import { revalidatePath } from 'next/cache';

export const createTaskAction = async (data: CreateTodoInput) => {
  const parsed = createTaskSchema.parse(data);

  const res = await fetch(`${API_HOST}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed),
  });

  if (!res.ok) {
    throw new Error('Failed to create task');
  }
  revalidatePath('/todos');

  return res.json();
};
