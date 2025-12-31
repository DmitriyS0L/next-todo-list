import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  items: {
    image: ReactNode;
    title: string;
  };
  className: string;
  route: string;
}

export const RoundedButton = ({ items, className, route }: Props) => {
  return (
    <Link
      className={`w-45 flex flex-row gap-2 items-center justify-center absolute  text-white  font-bold text-base px-8 py-4 ring-2 ring-[#353c5a] bg-[#353c5a]/80 hover:bg-[#353c5a]/60  rounded-lg cursor-pointer shadow-xl/40 shadow-[#353c5a] hover:scale-95 hover:shadow-xl/20 transition-all duration-300 delay-700 hover:delay-0 hover:opacity-100 ${className}`}
      href={route}
    >
      {items.image}
      <span className="font-jakarta uppercase">{items.title}</span>
    </Link>
  );
};
