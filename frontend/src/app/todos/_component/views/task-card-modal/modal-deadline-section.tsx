'use client';

import { CalendarDays } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';

type OptionalDate = Date | undefined;

interface Props {
  deadline: OptionalDate;
  onChange: (date: Date) => void;
}

export const DeadlineSection = ({ deadline, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<OptionalDate>(undefined);

  useEffect(() => {
    if (deadline) {
      setDate(new Date(deadline));
    } else {
      setDate(undefined);
    }
  }, [deadline]);

  const handleSelectDate = (selectedDate: Date) => {
    if (selectedDate instanceof Date) {
      setDate(selectedDate);
      onChange(selectedDate);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal bg-transparent hover:bg-neutral-200 cursor-pointer"
          >
            {date instanceof Date
              ? date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })
              : 'Select date'}

            <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelectDate}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
