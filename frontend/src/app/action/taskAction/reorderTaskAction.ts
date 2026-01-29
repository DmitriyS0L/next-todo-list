'use server';

import { revalidatePath } from 'next/cache';
import { ReorderPayload } from '../../../lib/utils/generateOrderPayload';
import { API_HOST } from '@/config';
import { cookies } from 'next/headers';

export const reorderTaskAction = async (todos: ReorderPayload[]) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  await fetch(`${API_HOST}/todo/reorder`, {
    method: 'PATCH',
    headers: { Cookie: allCookies, 'Content-Type': 'application/json' },
    body: JSON.stringify({ todos }),
  });

  revalidatePath('/todos');
};
