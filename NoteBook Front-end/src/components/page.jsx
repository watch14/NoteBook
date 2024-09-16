import React from "react";
import Sketch from "./sketch";
import TextPage from "./TextPage";

const Page = () => {
  return (
    <div>
      <h1>Welcome to NoteBook</h1>
      <p>This is your personal notebook application.</p>
      <Sketch />
      <TextPage />
    </div>
  );
};

export default Page;
