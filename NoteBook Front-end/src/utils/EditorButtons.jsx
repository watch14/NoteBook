// src/components/EditorButtons.js
import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Bold,
  Italic,
  Minus,
  List,
} from "lucide-react";

const headingOptions = [
  { value: 1, label: <Heading1 /> },
  { value: 2, label: <Heading2 /> },
  { value: 3, label: <Heading3 /> },
];

const controlOptions = [
  { value: "left", label: <AlignLeft /> },
  { value: "center", label: <AlignCenter /> },
  { value: "right", label: <AlignRight /> },
  { value: "justify", label: <AlignJustify /> },
];

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
}) => {
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedTextAlign, setSelectedTextAlign] = useState(null);

  const handleHeadingChange = (option) => {
    setSelectedHeading(option);
    toggleHeadingLevel(option.value);
  };

  const handleTextAlignChange = (option) => {
    setSelectedTextAlign(option);
    editor.chain().focus().setTextAlign(option.value).run();
  };

  return (
    <div className="control-group">
      <div className="button-group">
        <Dropdown
          options={headingOptions}
          onChange={handleHeadingChange}
          value={selectedHeading}
          placeholder=<Heading />
        />
        <Dropdown
          options={controlOptions}
          onChange={handleTextAlignChange}
          value={selectedTextAlign}
          placeholder=<AlignLeft />
        />

        <button
          onClick={toggleBold}
          className={editor?.isActive("bold") ? "is-active" : ""}
        >
          <Bold />
        </button>
        <button
          onClick={toggleItalic}
          className={editor?.isActive("italic") ? "is-active" : ""}
        >
          <Italic />
        </button>
        <button onClick={setHorizontalRule}>
          <Minus />
        </button>
        <button
          onClick={toggleBulletList}
          className={editor?.isActive("bulletList") ? "is-active" : ""}
        >
          <List />
        </button>

        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color}
          data-testid="setColor"
        />
      </div>
    </div>
  );
};

export default EditorButtons;
