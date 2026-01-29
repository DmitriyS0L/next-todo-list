'use server';

import { API_HOST } from '@/config';
import { UpdateTodoDto } from '@libs/shared';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const updateTaskAction = async (id: string, task: UpdateTodoDto) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  await fetch(`${API_HOST}/todo/${id}`, {
    method: 'PUT',
    headers: { Cookie: allCookies, 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  revalidatePath('/todos');
};
