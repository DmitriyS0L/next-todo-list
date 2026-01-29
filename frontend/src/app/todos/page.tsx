import { getTaskAction } from '@/app/action/taskAction/getTaskAction';
import { TodoList } from './_component/views/todo-list';
import { Suspense } from 'react';
import Loading from '../loading';

export default async function TodoPage() {
  const todos = await getTaskAction();

  return (
    <Suspense fallback={Loading()}>
      <div className={`flex justify-center container py-10 bg-stone-300 min-w-full min-h-screen `}>
        <TodoList todos={todos} />
      </div>
    </Suspense>
  );
}
