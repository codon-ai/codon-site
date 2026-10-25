import React from "react";
import Markdown from "react-markdown";
import Navbar from "./Navbar";

const md = ``;

export default function DocumentationPage() {
  return (
    <div id="markdown">
      <Markdown>{"# Hello World\nThis is **markdown**."}</Markdown>
    </div>
  );
}
