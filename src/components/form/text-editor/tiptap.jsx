"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Strikethrough,
} from "lucide-react";
import HardBreak from "@tiptap/extension-hard-break";
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border shadow-lg flex flex-wrap gap-1focus:outline-none focus:ring-transparent">
      <ToggleGroup type="multiple" className="grid grid-cols-6   ">
        <ToggleGroupItem
          value="h1"
          pressed={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="h2"
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="h3"
          pressed={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="bold"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strike"
          pressed={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default function TextEditor({ onChangeForm, contentForm }) {
  const isInitialized = useRef(false); // Track initialization
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, paragraph: false }),
      Paragraph.configure({
        HTMLAttributes: { class: "text-xs" },
        allowEmpty: true,
      }),
      Heading.configure({ levels: [1, 2, 3] }).extend({
        renderHTML({ node }) {
          const level = node.attrs.level;
          const classMap = {
            1: "text-lg",
            2: "text-md",
            3: "text-sm",
          };
          return [`h${level}`, { class: classMap[level] }, 0];
        },
      }),
      HardBreak.configure({
        keepMarks: true, // Menjaga format teks (bold, italic, dll.)
      }),
    ],
    content: contentForm || { type: "doc", content: [] },
    onUpdate: ({ editor }) => {
      if (editor && onChangeForm) {
        const html = editor.getHTML();
        onChangeForm(html);
      }
    },

    // Setting focus back to editor after every update
    onFocus: () => editor?.commands.focus(),

    // Handling keydown for Enter key
    onKeyDown: (e) => {
      if (e.key === "Enter" && !event.shiftKey) {
        editor.chain().focus().setHardBreak().run();
        return true;
      }
      return false;
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (
      editor &&
      contentForm &&
      typeof contentForm === "object" &&
      contentForm.type === "doc" &&
      !isInitialized.current // Only run once
    ) {
      editor.commands.setContent(contentForm); // Set content when contentForm changes
      isInitialized.current = true; // Mark as initialized
    }
  }, [editor, contentForm]);

  return (
    <div className=" w-lg  rounded-none">
      <ScrollArea className="rounded-lg h-[450px] border bg-white shadow-md border-none focus:outline-none focus:ring-transparent">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="focus:outline-none focus:ring-0 focus:border-none p-5 w-[460px]"
        />
      </ScrollArea>
    </div>
  );
}
