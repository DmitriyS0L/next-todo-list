import { updateTaskAction } from '@/app/action/taskAction/updateTaskAction';
import { Editor } from '@/components/editor-area/editor';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useAutoFocus } from '@/hooks/use.auto.focus';
import { ITodo, TodoTypeEnum, UpdateTodoDto } from '@libs';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Trash2, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { TodoPriorityEnum } from '../../../../../../../libs/dist/enums/todo-priority.enum';
import { TodoStatusEnum } from '../../../../../../../libs/dist/enums/todo-status.enum';
import attachments from '../../../../../../public/image/attachments.svg';
import avatar from '../../../../../../public/image/avatar.svg';
import comment from '../../../../../../public/image/comment.svg';
import deadline from '../../../../../../public/image/deadline.svg';
import edit from '../../../../../../public/image/edit.svg';
import label from '../../../../../../public/image/label.svg';
import checkList from '../../../../../../public/image/listCheck.svg';
import priority from '../../../../../../public/image/priority.svg';
import status from '../../../../../../public/image/status.svg';
import textAlignLeft from '../../../../../../public/image/text-align-left.svg';
import title from '../../../../../../public/image/title.svg';
import typeImg from '../../../../../../public/image/type.svg';
import { LabelSection } from '../task-card-modal/modal-label-section';
import { TaskCardAttachments } from './modal-attachments';
import { TaskCardModalDropdownMenu } from './modal-attachments-dropdownmenu';
import { CheckList } from './modal-checklist-section';
import { DeadlineSection } from './modal-deadline-section';
import { SelectSection } from './modal-select-section';
import { deleteTaskAction } from '@/app/action/taskAction/deleteTaskAction';

interface Props {
  open: boolean;
  todo: ITodo;
  setOpen: (open: boolean) => void;
}

type EditMode = {
  title: boolean;
  description: boolean;
  deadline: boolean;
  type: boolean;
  priority: boolean;
  labels: boolean;
  comment: boolean;
  checklist: boolean;
};

export const TaskCardModal = ({ open, setOpen, todo }: Props) => {
  const initialEditMode = (): EditMode => ({
    title: false,
    description: false,
    deadline: false,
    type: false,
    priority: false,
    labels: false,
    comment: false,
    checklist: false,
  });

  const mapTodoUpdate = (todo?: ITodo): UpdateTodoDto => ({
    title: todo?.title,
    description: todo?.description,
    labels: todo?.labels,
    deadline: todo?.deadline,
    type: todo?.type,
    priority: todo?.priority,
    status: todo?.status,
    comment: todo?.comment,
    checklist: todo?.checklist,
  });

  const [editMode, setEditMode] = useState(() => initialEditMode());

  const originalRef = useRef<UpdateTodoDto>(mapTodoUpdate(todo));
  const [draft, setDraft] = useState<UpdateTodoDto>(() => mapTodoUpdate(todo));
  const isEqual = (a: unknown, b: unknown) => {
    if (a === b) return true;

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, i) => Object.is(item, b[i]));
    }

    return false;
  };

  const getChangedFields = <T extends Record<string, unknown>>(
    original: T,
    draft: Partial<T>
  ): Partial<T> => {
    const result: Partial<T> = {};

    for (const key in draft)
      if (!isEqual(original[key], draft[key])) {
        result[key] = draft[key];
      }
    return result;
  };

  const titleRef = useRef<HTMLInputElement>(null);

  useAutoFocus(titleRef, editMode.title);

  const handleChangeEdit = (field: keyof EditMode) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    const patch = getChangedFields(originalRef.current, draft);

    if (Object.keys(patch).length === 0) {
      setOpen(false);
      return;
    }

    await updateTaskAction(todo.id, patch);

    setOpen(false);
  };

  const handleDeleteTask = async () => {
    await deleteTaskAction(todo.id);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setEditMode(initialEditMode());
      setDraft(originalRef.current);
    }
    setOpen(nextOpen);
  };
  // переробити

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal>
      <DialogClose>
        <span className="sr-only">Close</span>
      </DialogClose>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="flex flex-col gap-6 sm:max-w-4xl bg-gray-100 rounded-md shadow-lg font-open-sans"
        >
          <DialogHeader className="flex flex-col gap-0 font-extralight">
            <div className="flex flex-row  ">
              <DialogTitle className="text-2xl font-bold">Task Details</DialogTitle>
              <DialogClose className="cursor-pointer opacity-60 hover:opacity-90 p-2 rounded-full hover:bg-gray-200 ">
                <XIcon height={20} width={20} />
              </DialogClose>
            </div>
          </DialogHeader>
          <ScrollArea className="h-[72vh]">
            <div className="flex flex-col p-4">
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image src={title} alt="title" width={18} height={18} className="opacity-80" />
                </div>
                <div className="w-full ml-2 font-normal text-xl">
                  <div className="flex flex-row justify-between items-center">
                    <h5 className="mb-2">Title</h5>
                    <span
                      className={`rounded-full hover:bg-gray-200 p-2 cursor-pointer ${editMode.title ? 'hidden' : 'block'}`}
                      onClick={() => handleChangeEdit('title')}
                    >
                      <Image src={edit} alt="edit" width={18} height={18} className="opacity-80 " />
                    </span>
                  </div>
                  {editMode.title ? (
                    <Input
                      ref={titleRef}
                      name="title"
                      className="bg-gray-200 border break-all py-5 focus-visible:ring-0 focus-visible:bg-gray-200 mt-1"
                      defaultValue={draft.title}
                      onBlur={() => setEditMode((prev) => ({ ...prev, title: false }))}
                      onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  ) : (
                    <p className="text-base font-light text-gray-600 my-2">{draft.title}</p>
                  )}

                  <hr className="my-4" />
                </div>
              </div>
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image src={avatar} alt="avatar" width={18} height={18} className="opacity-80" />
                </div>
                <div className="w-full ml-2 font-normal text-lg">
                  <h5 className="mb-2 ">Reviewers</h5>
                  <div className="flex">
                    <Avatar className="-ml-1 first:ml-0 cursor-pointer ">
                      <AvatarImage
                        src="https://i.pravatar.cc/300"
                        alt="@shadcn"
                        className="w-8 h-8 rounded-full  border-white"
                      />
                      <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-1 first:ml-0 cursor-pointer">
                      <AvatarImage
                        src="https://i.pravatar.cc/300"
                        alt="@shadcn"
                        className="w-8 h-8 rounded-full  border-white"
                      />
                      <AvatarFallback className="bg-amber-500 text-white">CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-1 first:ml-0 cursor-pointer">
                      <AvatarImage
                        src="https://i.pravatar.cc/300"
                        alt="@shadcn"
                        className="w-8 h-8 rounded-full  border-white"
                      />
                      <AvatarFallback className="bg-green-500 text-white">CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-1 first:ml-0 cursor-pointer">
                      <AvatarImage
                        src="https://i.pravatar.cc/300 "
                        alt="@shadcn"
                        className="w-8 h-8 rounded-full  border-white"
                      />
                      <AvatarFallback className="bg-red-500 text-white">CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image src={label} alt="label" width={18} height={18} className="opacity-80" />
                </div>
                <div className="w-full ml-2 font-normal text-lg">
                  <h5>Labels</h5>
                  <div className="flex flex-row my-2">
                    <LabelSection
                      label={draft.labels}
                      onChange={(labels) => setDraft((prev) => ({ ...prev, labels }))}
                    />
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image
                    src={textAlignLeft}
                    alt="description"
                    width={18}
                    height={18}
                    className="opacity-80"
                  />
                </div>
                <div className="w-full ml-2 font-normal text-lg">
                  <div className="flex flex-col gap-2 max-w-190">
                    <h5>Description</h5>
                    <Editor
                      content={draft.description}
                      onChange={(content) =>
                        setDraft((prev) => ({ ...prev, description: content }))
                      }
                    />
                  </div>

                  <hr className="my-4" />
                </div>
              </div>
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image
                    src={attachments}
                    alt="attachments"
                    width={16}
                    height={16}
                    className="opacity-80"
                  />
                </div>
                <div className="w-full ml-2 font-normal text-lg">
                  <div className="flex justify-between items-center">
                    <h5 className="mb-2">Attachments</h5>
                    <TaskCardModalDropdownMenu />
                  </div>
                  <TaskCardAttachments />
                  <hr className="my-4" />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-row items-start mb-4">
                  <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                    <Image
                      src={deadline}
                      alt="deadline"
                      width={18}
                      height={18}
                      className="opacity-80"
                    />
                  </div>
                  <div className="w-full ml-2 font-normal text-lg">
                    <h5>Deadline</h5>
                    <div className="text-sm font-light text-gray-600 my-2">
                      <DeadlineSection
                        deadline={draft.deadline}
                        onChange={(date) => setDraft((prev) => ({ ...prev, deadline: date }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start mb-4">
                  <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                    <Image src={typeImg} alt="type" width={18} height={18} className="opacity-80" />
                  </div>
                  <div className="w-full ml-2 font-normal text-lg">
                    <h5>Type</h5>
                    <div className="text-sm font-light text-gray-600 my-2">
                      <SelectSection
                        label="SELECT TYPE"
                        options={Object.values(TodoTypeEnum)}
                        value={draft.type}
                        onChange={(item) => setDraft((prev) => ({ ...prev, type: item }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start mb-4">
                  <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                    <Image
                      src={priority}
                      alt="priority"
                      width={18}
                      height={18}
                      className="opacity-80"
                    />
                  </div>
                  <div className="w-full ml-2 font-normal text-lg">
                    <h5>Priority</h5>
                    <div className="text-sm font-light text-gray-600 my-2">
                      <SelectSection
                        label="SELECT PRIORITY"
                        options={Object.values(TodoPriorityEnum)}
                        value={draft.priority}
                        onChange={(item) => setDraft((prev) => ({ ...prev, priority: item }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start mb-4">
                  <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                    <Image
                      src={status}
                      alt="status"
                      width={18}
                      height={18}
                      className="opacity-80"
                    />
                  </div>
                  <div className="w-full ml-2 font-normal text-lg">
                    <h5>Status</h5>
                    <div className="text-sm font-light text-gray-600 my-2">
                      <SelectSection
                        label="SELECT STATUS"
                        options={Object.values(TodoStatusEnum)}
                        value={draft.status}
                        onChange={(item) => setDraft((prev) => ({ ...prev, status: item }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image src={checkList} alt="check list" width={18} height={18} />
                </div>
                <CheckList
                  items={draft.checklist}
                  onChangeEdit={() => handleChangeEdit('checklist')}
                  editMode={editMode.checklist}
                  onChangeValue={(value) => setDraft((prev) => ({ ...prev, checklist: value }))}
                />
              </div>
              <div className="flex flex-row items-start mb-4">
                <div className="flex rounded-full bg-gray-200 p-2 shadow-sm mr-3">
                  <Image
                    src={comment}
                    alt="comments"
                    width={18}
                    height={18}
                    className="opacity-80"
                  />
                </div>
                <div className="w-full ml-2 font-normal text-lg">
                  <h5>Comments</h5>
                  <div className="border border-gray-200 rounded-xs my-2">
                    <Textarea
                      className="resize-none bg-gray-100 border-none focus-visible:ring-0 focus-visible:outline-none h-24 break-all "
                      placeholder="Write a comment"
                      tabIndex={-1}
                    />
                    <div className=" bg-gray-200 border-t-2 p-2 flex">
                      <Button className="bg-gray-600 rounded-md text-sm px-3 py-1.5 text-white hover:bg-gray-700">
                        Save
                      </Button>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="flex justify-between px-4">
            <DialogClose asChild>
              <Button
                className="cursor-pointer  bg-gray-400 hover:bg-red-500 "
                onClick={handleDeleteTask}
              >
                <Trash2 />
                <span>Delete</span>
              </Button>
            </DialogClose>
            <div className="space-x-4">
              <DialogClose asChild>
                <Button className="cursor-pointer bg-gray-400 hover:bg-gray-500">Discard</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
