import { TodoStatusEnum } from '@libs';
import { useDroppable } from '@dnd-kit/core';

export const EmptyColumnDropZone = ({ id }: { id: TodoStatusEnum }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="text-center font-medium text-gray-400 bg-gray-100 py-2 rounded-sm opacity-70 select-none"
    >
      Move here
    </div>
  );
};
