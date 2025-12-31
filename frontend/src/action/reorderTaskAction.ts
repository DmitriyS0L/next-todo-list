'use server';

import { revalidatePath } from 'next/cache';
import { ReorderPayload } from '../lib/utils/generateOrderPayload';
import { API_HOST } from '@/config';

export const reorderTaskAction = async (todos: ReorderPayload[]) => {
  await fetch(`${API_HOST}/todo/reorder`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todos }),
  });

  revalidatePath('/todos');
};
