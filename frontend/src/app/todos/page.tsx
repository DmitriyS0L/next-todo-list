import { getTaskAction } from '@/action/getTaskAction';
import { TodoList } from './_component/views/todo-list';

export default async function TodoPage() {
  const todos = await getTaskAction();

  return (
    <div className={`flex justify-center container py-10 bg-stone-300 min-w-full min-h-screen `}>
      <TodoList todos={todos} />
    </div>
  );
}
