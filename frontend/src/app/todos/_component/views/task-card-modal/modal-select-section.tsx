import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GenericSelectProps<T extends string> {
  value?: T;
  options: T[];
  label?: string;
  onChange?: (val: T) => void;
}

export const SelectSection = <T extends string>({
  value,
  label,
  options,
  onChange,
}: GenericSelectProps<T>) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-2/3 bg-transparent hover:bg-neutral-200 cursor-pointer transition-all">
        <SelectValue placeholder="Select Type" className="cursor-pointer" />
      </SelectTrigger>
      <SelectContent className="w-30px ">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item} value={item} className="cursor-pointer focus:bg-gray-200 ">
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
