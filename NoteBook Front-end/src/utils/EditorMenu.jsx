import React from "react";
import { BubbleMenu } from "@tiptap/react";
import { convertRomajiToKana } from "./maps.js";

const EditorMenu = ({ editor }) => {
  // Function to log, convert, and update the selected text
  const logAndConvertSelectedText = () => {
    const { state } = editor;
    const { from, to } = state.selection;

    // Get the selected text
    const selectedText = state.doc.textBetween(from, to, " ");
    console.log("Selected Text:", selectedText);

    // Convert selected text to Kana
    const kana = convertRomajiToKana(selectedText, "hira"); // Change "hira" to "kata" if you want Katakana
    console.log("Converted Kana:", kana);

    // Update the editor content with converted text
    if (selectedText) {
      editor
        .chain()
        .focus()
        .deleteRange({ from, to }) // Delete selected text
        .insertContent(kana) // Insert converted text
        .run();
    }
  };

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          {/* Button to convert selected text to Kana */}
          <button onClick={logAndConvertSelectedText}>Convert to Kana</button>
        </BubbleMenu>
      )}
    </>
  );
};

export default EditorMenu;
