import React, { useEffect } from "react";
import "../css/tiptap.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import EditorButtons from "./EditorButtons";
import EditorMenu from "./EditorMenu";

const Tiptap = ({ onContentChange, textContent }) => {
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
    content: textContent || "<p></p>", // Set default content if empty
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

  // Update the editor content when textContent prop changes
  useEffect(() => {
    if (editor) {
      const currentContent = editor.getHTML();
      // Only update if the content is different
      if (textContent !== currentContent) {
        if (textContent === "") {
          editor.commands.setContent("<p></p>"); // Ensure editor is not empty
        } else {
          editor.commands.setContent(textContent);
        }
      }
    }
  }, [textContent, editor]);

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
