type Task = {
  id: string;
  order: number;
};

export type ReorderPayload = {
  id: string;
  order: number;
};

export function generateOrderPayload(tasks: Task[]): ReorderPayload[] {
  return tasks.map((task, index) => ({
    id: task.id,
    order: index + 1,
  }));
}
