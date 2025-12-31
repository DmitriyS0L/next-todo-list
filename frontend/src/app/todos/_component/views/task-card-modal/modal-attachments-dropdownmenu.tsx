import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import addButton from '../../../../../../public/image/addButton.svg';

export const TaskCardModalDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
        <Image src={addButton} alt="add" width={18} height={18} className="opacity-80" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-32 py-2 bg-gray-100 shadow-lg rounded-md border border-gray-200"
      >
        <DropdownMenuItem className="hover:bg-blue-100 text-xs font-normal px-3 py-1.5 cursor-pointer">
          Computer
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-blue-100 text-xs font-normal px-3 py-1.5 cursor-pointer">
          Google Disk
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-[0.1px] bg-gray-300" />
        <DropdownMenuItem className="hover:bg-blue-100 text-xs font-normal px-3 py-1.5 cursor-pointer">
          Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
