import { useSnippetStore } from "../store/snippetStore";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet,
  );

  return (
    <div
      className="py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer"
      onClick={() => {
        setSelectedSnippet(snippetName);
      }}
    >
      <h1>{snippetName}</h1>
    </div>
  );
}

export default SnippetItem;
