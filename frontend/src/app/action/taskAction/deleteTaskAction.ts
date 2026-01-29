'use server';

import { API_HOST } from '@/config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteTaskAction = async (id: string) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const res = await fetch(`${API_HOST}/todo/${id}`, {
    method: 'DELETE',
    headers: {
      Cookie: allCookies,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Не вдалося видалити завдання');
  }

  revalidatePath('/todos');
};
