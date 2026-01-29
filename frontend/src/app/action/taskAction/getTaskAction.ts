import { API_HOST } from '@/config';

import { cookies } from 'next/headers';

export const getTaskAction = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const data = await fetch(`${API_HOST}/todo`, {
    method: 'GET',
    headers: {
      Cookie: allCookies,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });

  if (data.status === 401) {
    // Тут можна обробити редирект на логін
    return null;
  }

  if (!data.ok) throw new Error('Failed to load todos');

  return await data.json();
};
