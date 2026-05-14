import { useEffect } from "react";
import { readDir } from "@tauri-apps/plugin-fs";
import { BaseDirectory } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetStore";
import SnippetItem from "./SnippetItem.js";

function snippetList() {
  const setSnippetsNames = useSnippetStore((state) => state.setSnippetsNames);
  const snippetNames = useSnippetStore((state) => state.snippetsNames);

  useEffect(() => {
    async function loadFiles() {
      const files = await readDir("Code-Notes", {
        baseDir: BaseDirectory.Document,
      });
      const fileNames = files.map((file) => file.name!);
      setSnippetsNames(fileNames);
    }
    loadFiles();
  }, []);

  return (
    <div>{snippetNames.map((snippetName) => SnippetItem({ snippetName }))}</div>
  );
}

export default snippetList;
