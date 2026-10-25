import Markdown from "react-markdown";

import { useEffect, useState } from "react";

export default function DocumentationPage() {
  let [md, setMd] = useState("");
  useEffect(function (){
    fetch("/public/README.md")
      .then((res) => res.text())
      .then(text => setMd(text));
  }, []);
  return (
    <div id="markdown">
      <Markdown>{md}</Markdown>
    </div>
  );
}
