import { writeTextFile, mkdir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import { useState } from "react";
function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await mkdir("Code-Notes", {
          baseDir: BaseDirectory.Document,
          recursive: true,
        });

        //if(snippet)

        await writeTextFile(`Code-Notes/${snippetName}.json`, `{}`, {
          baseDir: BaseDirectory.Document,
        });
      }}
    >
      <input
        className="bg-zinc-900 w-full border-none outline-none p-4"
        type="text"
        placeholder="Write a snippet"
        onChange={(e) => {
          setSnippetName(e.target.value);
        }}
      />
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
