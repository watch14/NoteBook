import React, { useState } from "react";
import "../css/tiptap.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";

import EditorButtons from "./EditorButtons";
import EditorMenu from "./EditorMenu";

const initialContent = `
<h1 style="text-align: center"><em>Hello 
</em><span style="color: rgb(119, 255, 153)">
<strong>World</strong></span><span style="color: #fdf777">!
</span></h1><ul><li><p>A list item</p></li><li>
<p style="text-align: center">And another one</p>
</li></ul><hr><p>Some more text.</p><p></p><h1
><span style="color: rgb(125, 213, 255)">どこ 勤め先 何 です か
</span></h1><h2><span style="color: rgb(255, 255, 151)">勤め先</span></h2>
`;

const Tiptap = ({ onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // Configure heading levels
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
    onUpdate({ editor }) {
      const elhtml = editor.getHTML();
      if (onContentChange) {
        onContentChange(elhtml); // Notify parent
      }
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
    <div className="tiptape">
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
