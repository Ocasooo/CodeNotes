import { writeTextFile, mkdir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { useState } from "react";
import { useSnippetStore } from "../store/snippetStore";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  const addSnippetName = useSnippetStore(state=>state.addSnippetName)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await mkdir("Code-Notes", {
          baseDir: BaseDirectory.Document,
          recursive: true,
        });

        //if(snippet)

        await writeTextFile(`Code-Notes/${snippetName}.json`, ``, {
          baseDir: BaseDirectory.Document,
        });
        setSnippetName('')
        addSnippetName(snippetName)
      }}
    >
      <input
        className="bg-zinc-900 w-full border-none outline-none p-4"
        type="text"
        placeholder="Write a snippet"
        value={snippetName}
        onChange={(e) => {
          setSnippetName(e.target.value);
        }}
      />
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
