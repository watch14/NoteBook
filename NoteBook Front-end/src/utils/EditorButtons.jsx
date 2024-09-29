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
  LetterText, // Optional: Import an icon for paragraph
} from "lucide-react";

const headingOptions = [
  { value: 1, label: <Heading1 size={24} /> },
  { value: 2, label: <Heading2 size={22} /> },
  { value: 3, label: <Heading3 size={20} /> },
];

const controlOptions = [
  { value: "left", label: <AlignLeft size={24} /> },
  { value: "center", label: <AlignCenter size={24} /> },
  { value: "right", label: <AlignRight size={24} /> },
  { value: "justify", label: <AlignJustify size={24} /> },
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

  const toggleParagraph = () => {
    if (editor) {
      const isParagraphActive = editor.isActive("paragraph");
      if (isParagraphActive) {
        editor.chain().focus().setNode("heading", { level: 1 }).run();
      } else {
        editor.chain().focus().setNode("paragraph").run();
      }
    }
  };

  return (
    <div className="control-group">
      <div className="button-group">
        <Dropdown
          className="dropdown"
          options={headingOptions}
          onChange={handleHeadingChange}
          value={selectedHeading}
          placeholder={<Heading size={24} />}
        />
        <Dropdown
          className="dropdown"
          options={controlOptions}
          onChange={handleTextAlignChange}
          value={selectedTextAlign}
          placeholder={<AlignLeft size={24} />}
        />
        <button onClick={toggleParagraph}>
          <LetterText />
        </button>
        <button
          onClick={toggleBold}
          className={editor?.isActive("bold") ? "is-active" : ""}
        >
          <Bold size={24} />
        </button>

        <button
          onClick={toggleItalic}
          className={editor?.isActive("italic") ? "is-active" : ""}
        >
          <Italic size={24} />
        </button>
        <button onClick={setHorizontalRule}>
          <Minus size={24} />
        </button>
        <button
          onClick={toggleBulletList}
          className={editor?.isActive("bulletList") ? "is-active" : ""}
        >
          <List size={24} />
        </button>

        <input
          className="color-input"
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          data-testid="setColor"
        />
      </div>
    </div>
  );
};

export default EditorButtons;
