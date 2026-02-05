import { useMutation, useQuery } from '@tanstack/react-query';
import { API_HOST } from '../config';
import { LoginSchemaType } from '@libs';

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (formData: LoginSchemaType) => {
      const response = await fetch(`${API_HOST}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    },
  });
};

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch(`${API_HOST}/auth/profile`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};
