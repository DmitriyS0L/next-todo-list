import { API_HOST } from '@/config';

export const getTaskAction = async () => {
  const data = await fetch(`${API_HOST}/todo`, { cache: 'no-cache' });
  if (!data.ok) throw new Error('Failed to load todos');
  const todos = await data.json();
  return todos;
};
