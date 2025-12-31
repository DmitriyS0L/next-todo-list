import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  children: React.ReactNode;
}

export const SortableTask = ({ id, children }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'none',
    zIndex: isDragging ? 100 : 'auto',
    boxShadow: 'none',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout={false}
      initial={false}
      animate={false}
    >
      {children}
    </motion.div>
  );
};
