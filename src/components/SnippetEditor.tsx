import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { BaseDirectory } from "@tauri-apps/api/path";

function SnippetEditor() {
  const [text, setText] = useState<string | undefined>("");

  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  useEffect(() => {
    const saveText = setTimeout(async () => {
      await writeTextFile(`Code-Notes/${selectedSnippet}.json`, text ?? "", {
        baseDir: BaseDirectory.Document,
      });
      console.log("saving");
    }, 1000);
    return () => {
      clearTimeout(saveText);
    };
  }, [text]);

  return (
    <>
      {selectedSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 20 }}
          onChange={(value) => setText(value)}
        />
      ) : (
        <h1>No snippet</h1>
      )}
    </>
  );
}

export default SnippetEditor;
