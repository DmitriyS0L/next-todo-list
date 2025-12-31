import { createTaskAction } from '@/action/createTaskAction';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, CreateTodoInput, TodoPriorityEnum, TodoTypeEnum } from '@libs';
import { SelectLabel } from '@radix-ui/react-select';
import { useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Flip, toast } from 'react-toastify';
import { Input } from '../../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Modal = ({ open, setOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateTodoInput>({ resolver: zodResolver(createTaskSchema) });

  const [state, formAction, isPending] = useActionState<null, CreateTodoInput>(
    async (prevState, data) => {
      try {
        await createTaskAction(data);
        reset();
        setOpen(false);
        toast.success(`Task created successfully!`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'light',
          transition: Flip,
        });
      } catch (error) {
        console.error('Error creating task:', error);
        toast.error('Failed to create task. Please try again.', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'light',
          transition: Flip,
        });
      }
      return prevState;
    },
    null
  ); // ДОДАТИ ТОСТИ ПРО УСПІХ/ПОМИЛКУ

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-106.25 bg-gray-200 font-open-sans">
        <DialogHeader>
          <DialogTitle className="font-medium">Create Task</DialogTitle>
          <DialogDescription>Fill in the data to create a new task.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(formAction)} className="grid gap-4 py-2">
          <Input {...register('title')} className="bg-gray-100" placeholder="Task name" />
          {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger className="w-full bg-gray-100">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-xs outline-hidden select-none opacity-70">
                      Priority
                    </SelectLabel>
                    {Object.values(TodoPriorityEnum).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger className="w-full bg-gray-100">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-xs outline-hidden select-none opacity-70">
                      Type
                    </SelectLabel>
                    {Object.values(TodoTypeEnum).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <DialogFooter>
            <button
              type="button"
              className="bg-red-800 font-medium text-white py-1.5 px-4 rounded transition-hover duration-300 hover:bg-red-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-800 font-medium text-white py-1.5 px-4 rounded transition-hover duration-300 hover:bg-green-700 cursor-pointer"
              disabled={isPending}
            >
              Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
