import { TODO_COLOR_LABEL, TODO_COLOR_LABEL_DROPDOWN } from '@/lib/enums/todo-color-label.enum';
import { TodoLabelEnum } from '@libs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import addLabel from '../../../../../../public/image/addLabel.svg';

interface Props {
  label?: TodoLabelEnum[];
  onChange: (label: TodoLabelEnum[]) => void;
}

export const LabelSection = ({ label = [], onChange }: Props) => {
  const [labels, setLabels] = useState<TodoLabelEnum[]>(label);
  const allLabel = Object.values(TodoLabelEnum).filter((item) => !labels.includes(item));

  const handleToggleLabel = (selectedLabel: TodoLabelEnum) => {
    const updated = [...labels, selectedLabel];
    setLabels(updated);
    onChange(updated);
  };

  const handleRemoveLabel = (item: TodoLabelEnum) => {
    const updated = labels.filter((label) => label !== item);
    setLabels(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-wrap gap-y-2 ">
        {labels.map((item) => (
          <div
            key={item}
            className={`flex items-center px-2.5 py-2 mr-2 space-x-2 rounded-sm text-xs font-open-sans font-bold shadow-sm space-x-7x-1 ${TODO_COLOR_LABEL[item]}`}
          >
            <div>{item}</div>
            <div
              className={`h-4 w-4 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 opacity-50 hover:opacity-100`}
              onClick={() => handleRemoveLabel(item)}
            >
              <XIcon />
            </div>
          </div>
        ))}
      </div>
      <DropdownMenu>
        {allLabel.length !== 0 && (
          <DropdownMenuTrigger className="p-2 rounded-sm bg-gray-500 hover:bg-gray-600 shadow-sm transition-all hover:inset-shadow-sm cursor-pointer">
            <Image src={addLabel} alt="add label" width={16} height={16} />
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={5}
          className="min-w-32 py-2 bg-gray-100 shadow-lg rounded-md border border-gray-200 z-10"
        >
          <DropdownMenuLabel className="text-[10px] text-center font-inter font-bold opacity-60">
            SELECT LABEL
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 h-[0.2px] bg-gray-300" />
          <div className="px-2.5">
            {allLabel.map((item) => (
              <DropdownMenuItem
                key={item}
                className={`${TODO_COLOR_LABEL_DROPDOWN[item]} text-xs font-normal px-3 py-1.5 mb-1.5 rounded-xs cursor-pointer `}
                onClick={() => handleToggleLabel(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
