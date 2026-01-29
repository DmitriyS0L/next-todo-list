'use server';

import { API_HOST } from '@/config';
import { createTaskSchema, CreateTodoInput } from '@libs/shared';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const createTaskAction = async (data: CreateTodoInput) => {
  const parsed = createTaskSchema.parse(data);

  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const res = await fetch(`${API_HOST}/todo`, {
    method: 'POST',
    headers: {
      Cookie: allCookies,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Backend error:', errorData);
    throw new Error(errorData.message || 'Failed to create task');
  }
  revalidatePath('/todos');

  return res.json();
};
