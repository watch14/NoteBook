// src/components/Tiptap.js
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

import EditorButtons from "./EditorButtons";
import EditorMenu from "./EditorMenu";

import "../css/tiptap.css";

const content = `
    <p>Hello World!</p>
    <ul>
      <li>A list item</li>
      <li>And another one</li>
    </ul>
    <hr>
    <p>Some more text.</p>
`;

const Tiptap = () => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // Configure heading levels
        },
      }),
      Bold,
      Italic,
      HorizontalRule,
      BulletList,
      ListItem,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  const toggleHeadingLevel = (level) => {
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const toggleBold = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  };

  const toggleItalic = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  const setHorizontalRule = () => {
    if (editor) {
      editor.chain().focus().setHorizontalRule().run();
    }
  };

  const toggleBulletList = () => {
    if (editor) {
      editor.chain().focus().toggleBulletList().run();
    }
  };

  const splitListItem = () => {
    if (editor) {
      editor.chain().focus().splitListItem("listItem").run();
    }
  };

  const sinkListItem = () => {
    if (editor) {
      editor.chain().focus().sinkListItem("listItem").run();
    }
  };

  const liftListItem = () => {
    if (editor) {
      editor.chain().focus().liftListItem("listItem").run();
    }
  };

  return (
    <div className="tiptap">
      <EditorButtons
        toggleHeadingLevel={toggleHeadingLevel}
        toggleBold={toggleBold}
        toggleItalic={toggleItalic}
        setHorizontalRule={setHorizontalRule}
        toggleBulletList={toggleBulletList}
        splitListItem={splitListItem}
        sinkListItem={sinkListItem}
        liftListItem={liftListItem}
        editor={editor}
      />
      <EditorContent editor={editor} />
      <EditorMenu editor={editor} />
    </div>
  );
};

export default Tiptap;
