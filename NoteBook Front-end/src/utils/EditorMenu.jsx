// src/components/EditorMenu.js
import React from "react";
import { FloatingMenu } from "@tiptap/react";

const EditorMenu = ({ editor }) => (
  <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
);

export default EditorMenu;
