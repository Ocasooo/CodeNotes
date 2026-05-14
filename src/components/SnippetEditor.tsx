import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetStore";

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  return (
    <>
      {selectedSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 20 }}
        />
      ) : (
        <h1>No snippet</h1>
      )}
    </>
  );
}

export default SnippetEditor;
