import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetStore";
import { useEffect, useState } from "react";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { BaseDirectory } from "@tauri-apps/api/path";

function SnippetEditor() {
  const [text, setText] = useState<string | undefined>("");

  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  useEffect(() => {
    if (!selectedSnippet) return;
    async function loadFile() {
      const content = await readTextFile(`Code-Notes/${selectedSnippet.name}.json`, {
        baseDir: BaseDirectory.Document,
      });
      setText(content);
    }
    loadFile();
  }, [selectedSnippet]);

  useEffect(() => {
    const saveText = setTimeout(async () => {
      if (!selectedSnippet) return;
      await writeTextFile(`Code-Notes/${selectedSnippet.name}.json`, text ?? "", {
        baseDir: BaseDirectory.Document,
      });
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
          value={text}
        />
      ) : (
        <h1>No snippet</h1>
      )}
    </>
  );
}

export default SnippetEditor;
