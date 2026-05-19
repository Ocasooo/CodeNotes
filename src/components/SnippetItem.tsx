import { useState } from "react";
import { useSnippetStore } from "../store/snippetStore";
import { twMerge } from "tailwind-merge";
import { BaseDirectory, readTextFile, remove } from "@tauri-apps/plugin-fs";
import ConfirmModal from "./ConfirmModal";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet,
  );
  const removeSnippetName = useSnippetStore(
    (state) => state.removeSnippetName,
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  return (
    <>
      <div
        className={twMerge(
          "flex justify-between items-center py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer",
          selectedSnippet?.name === snippetName ? "bg-sky-500" : "",
        )}
        onClick={async () => {
          const snippet = await readTextFile(`Code-Notes/${snippetName}.json`,{
            baseDir:BaseDirectory.Document
          })
          setSelectedSnippet({name:snippetName,code: snippet})
        }}
      >
        <h1>{snippetName}</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="text-red-400 hover:text-red-300 px-2"
        >
          ✕
        </button>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        message={`¿Eliminar "${snippetName}"?`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={async () => {
          setShowConfirm(false);
          await remove(`Code-Notes/${snippetName}.json`, {
            baseDir: BaseDirectory.Document,
          });
          removeSnippetName(snippetName);
        }}
      />
    </>
  );
}

export default SnippetItem;
