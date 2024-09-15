// src/components/EditorButtons.js
import React from "react";

const EditorButtons = ({
  toggleHeadingLevel,
  toggleBold,
  toggleItalic,
  setHorizontalRule,
  toggleBulletList,
  splitListItem,
  sinkListItem,
  liftListItem,
  editor,
}) => (
  <div className="control-group">
    <div className="button-group">
      <button
        onClick={() => toggleHeadingLevel(1)}
        className={editor?.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        onClick={() => toggleHeadingLevel(2)}
        className={editor?.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        onClick={() => toggleHeadingLevel(3)}
        className={editor?.isActive("heading", { level: 3 }) ? "is-active" : ""}
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
    </div>
  </div>
);

export default EditorButtons;
