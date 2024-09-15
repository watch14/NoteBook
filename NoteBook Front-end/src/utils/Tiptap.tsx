import React, { useState } from "react";
import "../css/tiptap.css";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";

import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

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
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => toggleHeadingLevel(1)}
            className={
              editor?.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() => toggleHeadingLevel(2)}
            className={
              editor?.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => toggleHeadingLevel(3)}
            className={
              editor?.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>
          <button
            onClick={toggleBold}
            className={editor?.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={toggleItalic}
            className={editor?.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button onClick={setHorizontalRule}>Set Horizontal Rule</button>
          <button
            onClick={toggleBulletList}
            className={editor?.isActive("bulletList") ? "is-active" : ""}
          >
            Toggle Bullet List
          </button>
          <button
            onClick={splitListItem}
            disabled={!editor?.can().splitListItem("listItem")}
          >
            Split List Item
          </button>
          <button
            onClick={sinkListItem}
            disabled={!editor?.can().sinkListItem("listItem")}
          >
            Sink List Item
          </button>
          <button
            onClick={liftListItem}
            disabled={!editor?.can().liftListItem("listItem")}
          >
            Lift List Item
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
    </div>
  );
};

export default Tiptap;
