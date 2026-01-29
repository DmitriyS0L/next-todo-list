'use server';

import { cookies } from 'next/headers';
import { API_HOST } from '../../../config';

export const getProfileAction = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) return null;

  try {
    const response = await fetch(`${API_HOST}/auth/profile`, {
      method: 'GET',
      headers: { Cookie: `access_token=${token}`, 'Content-Type': 'application/json' },

      next: { tags: ['profile'] },
    });

    if (!response.ok) return null;

    const userData = await response.json();
    return userData;
  } catch (error) {
    return null;
  }
};
