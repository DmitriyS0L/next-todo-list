'use client';

import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import { MenuBar } from './menu-bar';

const extensions = [
  TextStyleKit,
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];

interface Props {
  content?: string;
  onChange: (content: string) => void;
}

export const Editor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions,
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] text-base bg-gray-300 rounded-sm py-1 px-2.5',
      },
    },
  });

  const handleSave = () => {
    const html = editor?.getHTML() ?? '';
    onChange(html);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap" />
      <Button className="bg-gray-600 hover:bg-gray-700 cursor-pointer" onClick={handleSave}>
        <Save />
      </Button>
    </div>
  );
};
