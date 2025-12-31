'use client';

import { todoPriorityStyles } from '@/lib/enums/todo-color-priority.enum';
import { TodoPriorityEnum } from '@libs';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface Props {
  id: string;
  todo: {
    title?: string;
    description?: string;
    priority?: string;
    deadline?: Date;
  };
  onClick?: () => void;
}
export const SortableItem = ({ id, todo, ...props }: Props) => {
  const date = todo.deadline && new Date(todo.deadline);
  const formattedDate = date?.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      key={id}
      className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md select-none w-80 cursor-pointer hover:bg-neutral-200 transition-all duration-150"
      {...props}
    >
      <div className="flex justify-between">
        <span
          className={`w-max px-1.5 py-0.5  text-xs rounded-xl font-semibold font-jakarta ${todoPriorityStyles[todo.priority as TodoPriorityEnum]}`}
        >
          {todo.priority}
        </span>
        {todo.deadline && (
          <span className="w-max px-1.5 py-0.5 text-xs rounded-xl font-semibold font-jakarta bg-blue-100 text-blue-500 border border-blue-300">
            {formattedDate}
          </span>
        )}
      </div>

      <span className="text-lg font-normal border-b border-gray-400 pb-2">{todo.title}</span>

      <div className="flex justify-between items-center">
        <div className="flex -ml-2">
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://i.pravatar.cc/300"
              alt="@shadcn"
              className="w-6 h-6 rounded-full border border-white"
            />
            <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
          </Avatar>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://i.pravatar.cc/300"
              alt="@shadcn"
              className="w-6 h-6 rounded-full border border-white"
            />
            <AvatarFallback className="bg-amber-500 text-white">CN</AvatarFallback>
          </Avatar>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://i.pravatar.cc/300"
              alt="@shadcn"
              className="w-6 h-6 rounded-full border border-white"
            />
            <AvatarFallback className="bg-green-500 text-white">CN</AvatarFallback>
          </Avatar>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://i.pravatar.cc/300"
              alt="@shadcn"
              className="w-6 h-6 rounded-full border border-white"
            />
            <AvatarFallback className="bg-red-500 text-white">CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5L15 12L8 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
