'use client';

import { reorderTaskAction } from '@/app/action/taskAction/reorderTaskAction';
import { Modal } from '@/app/todos/_component/views/create-task-modal';
import { Button } from '@/components/ui/button';
import { TODO_COLOR_STATUS } from '@/lib/enums/todo-color-status.enum';
import { generateOrderPayload } from '@/lib/utils/generateOrderPayload';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ITodo, TodoStatusEnum } from '@libs';
import { ArrowBigLeftDash } from 'lucide-react';
import { startTransition, useMemo, useOptimistic, useState } from 'react';
import { createPortal } from 'react-dom';
import { EmptyColumnDropZone } from '../board/empty-column';
import { SortableItem } from '../board/sortable-item';
import { SortableTask } from '../board/sortable-task';
import { TaskCardModal } from './task-card-modal/task-card-modal';
import { useRouter } from 'next/navigation';

export const TodoList = ({ todos: initialTodos }: { todos: ITodo[] }) => {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<ITodo[], ITodo[]>(
    initialTodos,
    (_state, newTodos) => newTodos
  );
  const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);
  const [isModalOpen, setIsModalCreateOpen] = useState(false);
  const [isModalTaskDetailsOpen, setIsModalTaskDetailsOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const router = useRouter();

  const groups = useMemo(() => {
    const map: Record<TodoStatusEnum, ITodo[]> = {
      [TodoStatusEnum.PENDING]: [],
      [TodoStatusEnum.IN_PROGRESS]: [],
      [TodoStatusEnum.COMPLETED]: [],
      [TodoStatusEnum.DONE]: [],
    };

    optimisticTodos?.forEach((todo) => map[todo.status].push(todo));
    return map;
  }, [optimisticTodos]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const activeId = active.id;

    const activeTodo = optimisticTodos.find((todo) => todo.id === activeId) || null;
    setActiveTodo(activeTodo);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTodo(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTodoIndex = optimisticTodos.findIndex((todo) => todo.id === activeId);
    const overTodoIndex = optimisticTodos.findIndex((todo) => todo.id === overId);

    const newTodos = arrayMove(optimisticTodos, activeTodoIndex, overTodoIndex);

    startTransition(() => {
      addOptimisticTodo(newTodos);
    });

    startTransition(async () => {
      await reorderTaskAction(generateOrderPayload(newTodos));
    });
  };

  // ------------------ modals ------------------
  const handleOpenCreateModal = () => setIsModalCreateOpen((p) => !p);
  const handleOpenTaskDetailsModal = (todo: ITodo) => {
    setActiveTodo(todo);
    setIsModalTaskDetailsOpen(true);
  };
  const handleCloseTaskDetailsModal = () => {
    setActiveTodo(null);
    setIsModalTaskDetailsOpen(false);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center font-open-sans font-light">
      <div className="flex flex-row justify-between items-center w-full my-2">
        <ArrowBigLeftDash
          height={32}
          width={36}
          className="bg-red-500 font-medium text-white text-sm rounded hover:bg-red-600 transition shadow-sm shadow-red-500 cursor-pointer"
          onClick={handleBack}
        />
        <Button
          className="px-4 py-1.5 bg-blue-600 font-medium text-white text-sm rounded hover:bg-blue-700 transition shadow-sm shadow-slate-700 cursor-pointer "
          type="button"
          onClick={handleOpenCreateModal}
        >
          Add Task
        </Button>
      </div>
      <Modal open={isModalOpen} setOpen={handleOpenCreateModal} />
      {activeTodo && (
        <TaskCardModal
          open={isModalTaskDetailsOpen}
          setOpen={handleCloseTaskDetailsModal}
          todo={activeTodo}
        />
      )}
      <div className="grid grid-cols-4 justify-center gap-6 min-w-3/4 overflow-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          {(Object.keys(groups) as TodoStatusEnum[]).map((status: string) => (
            <div key={status} className="flex flex-col gap-4 w-80">
              <div
                className={`flex flex-row items-center justify-between gap-2 font-bold text-lg rounded-sm  text-white py-1 px-2 ${TODO_COLOR_STATUS[status as TodoStatusEnum]}`}
              >
                <h2>{status}</h2>
                <span className="flex items-center justify-center text-xs font-medium w-5 h-5 bg-[#b1b1b1a9] rounded-full">
                  {groups[status as TodoStatusEnum].length}
                </span>
              </div>
              <SortableContext
                items={groups[status as TodoStatusEnum].map((todo) => todo.id)}
                key={status}
                strategy={verticalListSortingStrategy}
              >
                {groups[status as TodoStatusEnum].map((todo) => (
                  <div key={todo.id}>
                    <SortableTask id={todo.id} key={todo.id}>
                      <SortableItem
                        id={todo.id}
                        todo={todo}
                        onClick={() => handleOpenTaskDetailsModal(todo)}
                      />
                    </SortableTask>
                  </div>
                ))}

                {groups[status as TodoStatusEnum].length === 0 && (
                  <EmptyColumnDropZone id={status as TodoStatusEnum} />
                )}
              </SortableContext>
            </div>
          ))}
          {typeof window !== 'undefined' &&
            createPortal(
              <DragOverlay>
                {activeTodo ? <SortableItem id={activeTodo.id} todo={activeTodo} /> : null}
              </DragOverlay>,
              document.body
            )}
        </DndContext>
      </div>
    </div>
  );
};
