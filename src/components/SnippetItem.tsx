import { useSnippetStore } from "../store/snippetStore";
import { twMerge } from "tailwind-merge";
import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet,
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  return (
    <div
      className={twMerge(
        "py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer",
        selectedSnippet?.name === snippetName ? "bg-sky-500" : "",
      )}
      onClick={async () => {
        console.log("log1")
        const snippet = await readTextFile(`Code-Notes/${snippetName}.json`,{
          baseDir:BaseDirectory.Document
        })
         console.log("log2")
        setSelectedSnippet({name:snippetName,code: snippet})
      }}
    >
      <h1>{snippetName}</h1>
    </div>
  );
}

export default SnippetItem;
