import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ITodoChecklistItem } from '@libs/interface/todo.checklist.interface';
import Image from 'next/image';
import { useState } from 'react';
import addLabel from '../../../../../../public/image/addLabel.svg';
import submitBtn from '../../../../../../public/image/submitBtn.svg';
import cancelBtn from '../../../../../../public/image/cancelBtn.svg';

interface Props {
  items?: ITodoChecklistItem[];
  editMode: boolean;
  onChangeEdit: () => void;
  onChangeValue: (value: ITodoChecklistItem[]) => void;
}

export const CheckList = ({ items = [], onChangeEdit, editMode, onChangeValue }: Props) => {
  const [value, setValue] = useState('');
  const [item, setItem] = useState(items);

  const completed = item.filter((i) => i.isChecked === true).length;
  const total = item.length;

  const handleSubmit = () => {
    if (!value.trim()) {
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      title: value.trim(),
      isChecked: false,
      assigned: 'null',
      date: new Date(),
    };

    const updated = [...item, newItem];

    setItem(updated);
    onChangeValue(updated);
    onChangeEdit();
    setValue('');
  };

  const handleCancel = () => {
    setValue('');
    onChangeEdit();
  };

  const toggleChecked = (id: string) => {
    const updated = item.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );

    setItem(updated);
    onChangeValue(updated);
  };

  return (
    <div className="w-full ml-2 font-normal text-lg flex flex-col gap-y-3">
      <h5>Check List</h5>
      <div className="flex flex-col gap-y-1">
        <span className="text-sm">
          {completed}/{total}
        </span>
        <span className="relative h-1 rounded-full bg-neutral-300">
          <span
            className="absolute h-1 rounded-full bg-green-700 transition-all delay-100"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </span>
      </div>
      {item.map((item) => (
        <div
          key={item.id}
          className="flex flex-row py-2 pr-2 items-center gap-2 font-jakarta text-sm border-b border-neuroal-600"
        >
          <Checkbox
            checked={item.isChecked}
            onCheckedChange={() => toggleChecked(item.id)}
            className="data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
          />
          <div className={`flex flex-row flex-1 ${item.isChecked && 'opacity-50'}`}>
            <p className="flex-3">{item.title}</p>
            <div className="flex-1 text-end">{item.assigned ?? '-'} </div>
            <p className="flex-2 text-end">
              {new Date(item.date).toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}
      <div>
        {editMode ? (
          <div className="flex flex-row">
            <Input
              className="w-full focus-visible:ring-0 focus-visible:border-neutral-300 rounded-r-none bg-gray-200 "
              onChange={(event) => setValue(event.target.value)}
            />
            <Button
              className="rounded-none bg-gray-600 hover:bg-gray-500 p-2 cursor-pointer"
              onClick={handleCancel}
            >
              <Image src={cancelBtn} alt="cancel" width={18} height={18} />
            </Button>
            <Button
              className="rounded-l-none bg-gray-600 hover:bg-gray-500 p-2 cursor-pointer"
              onClick={handleSubmit}
              disabled={!value.trim()}
            >
              <Image src={submitBtn} alt="submit" width={18} height={18} />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-gray-600 hover:bg-gray-500 cursor-pointer font-semibold"
            onClick={onChangeEdit}
          >
            <Image src={addLabel} alt="Add subtask" width={18} height={18} />
            Add Subtask
          </Button>
        )}
      </div>
    </div>
  );
};
