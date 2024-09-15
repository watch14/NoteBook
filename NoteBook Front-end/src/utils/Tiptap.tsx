import React, { useState } from "react";
import "../css/tiptap.css";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import TextAlign from "@tiptap/extension-text-align";

import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Dropcursor from "@tiptap/extension-dropcursor";

import EditorButtons from "./EditorButtons";
import EditorMenu from "./EditorMenu";

const content = `
<h1 style="text-align: center">Hello <span style="color: rgb(119, 255, 153)">
<strong>World</strong></span>!</h1><ul><li><p>A list item</p></li><li>
<p style="text-align: center">And another one</p></li></ul><hr>
<p>Some more text.</p><p></p><h1><span style="color: rgb(125, 213, 255)">
どこ 勤め先 何 です か</span></h1><h2><span style="color: #ffff97">勤め先</span></h2>
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
      Document,
      Paragraph,
      Text,
      Dropcursor,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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
