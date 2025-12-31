import { Editor, useEditorState } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  CodeSquare,
  CornerDownLeft,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Undo,
  AlignRight,
  AlignCenter,
  AlignLeft,
  AlignJustify,
} from 'lucide-react';
import { Toggle } from '../ui/toggle';

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      canBold: ctx.editor.can().chain().toggleBold().run(),

      isItalic: ctx.editor.isActive('italic'),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),

      isStrike: ctx.editor.isActive('strike'),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),

      isCode: ctx.editor.isActive('code'),
      canCode: ctx.editor.can().chain().toggleCode().run(),

      isParagraph: ctx.editor.isActive('paragraph'),

      isHeading1: ctx.editor.isActive('heading', { level: 1 }),
      isHeading2: ctx.editor.isActive('heading', { level: 2 }),
      isHeading3: ctx.editor.isActive('heading', { level: 3 }),

      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),

      isCodeBlock: ctx.editor.isActive('codeBlock'),
      isBlockquote: ctx.editor.isActive('blockquote'),

      isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
      isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
      isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),

      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
    }),
  });

  const options = [
    // Marks
    {
      icon: <Bold className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !state.canBold,
      pressed: state.isBold,
    },
    {
      icon: <Italic className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !state.canItalic,
      pressed: state.isItalic,
    },
    {
      icon: <Strikethrough className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !state.canStrike,
      pressed: state.isStrike,
    },
    {
      icon: <Code className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !state.canCode,
      pressed: state.isCode,
    },

    // Headings
    {
      icon: <Heading1 className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: state.isHeading1,
    },
    {
      icon: <Heading2 className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: state.isHeading2,
    },
    {
      icon: <Heading3 className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: state.isHeading3,
    },

    // Lists
    {
      icon: <List className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: state.isBulletList,
    },
    {
      icon: <ListOrdered className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: state.isOrderedList,
    },

    // Blocks
    {
      icon: <CodeSquare className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: state.isCodeBlock,
    },
    {
      icon: <Quote className="size-4 text-white" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: state.isBlockquote,
    },

    //TextAlign

    {
      icon: <AlignLeft className="size-4 text-white" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: state.isAlignRight,
    },
    {
      icon: <AlignCenter className="size-4 text-white" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: state.isAlignRight,
    },
    {
      icon: <AlignRight className="size-4 text-white" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: state.isAlignRight,
    },
    {
      icon: <AlignJustify className="size-4 text-white" />,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      pressed: state.isAlignRight,
    },

    // Utils
    {
      icon: <Minus className="size-4 text-white" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <CornerDownLeft className="size-4 text-white" />,
      onClick: () => editor.chain().focus().setHardBreak().run(),
    },

    // History
    {
      icon: <Undo className="size-4 text-white " />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !state.canUndo,
    },
    {
      icon: <Redo className="size-4 text-white" />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !state.canRedo,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center bg-gray-600 rounded-sm shadow-sm">
      {options.map((opt, i) => (
        <Toggle
          key={i}
          pressed={opt.pressed}
          disabled={opt.disabled}
          onPressedChange={opt.onClick}
          className={`rounded-none cursor-pointer data-[state=on]:bg-gray-700 hover:bg-gray-800`}
        >
          {opt.icon}
        </Toggle>
      ))}
    </div>
  );
};
