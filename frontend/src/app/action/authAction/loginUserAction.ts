'use server';

import { LoginSchemaType } from '@libs/shared';
import { cookies } from 'next/headers';
import { API_HOST } from '../../../config';

export const loginUserAction = async (formData: LoginSchemaType) => {
  const { email, password } = formData;
  const response = await fetch(`${API_HOST}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    cache: 'no-cache',
  });
  5;
  if (!response.ok) return null;

  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const tokenMatch = setCookieHeader.match(/access_token=([^;]+);/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 86400,
      });
    }
  }

  return { success: true };
};
