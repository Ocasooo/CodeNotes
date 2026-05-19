import { create } from "zustand";

interface Snippet{
  name: string;
  code:string | null;
}

interface SnippetState {
  snippetsNames: string[];
  selectedSnippet: Snippet | null;
  addSnippetName: (name: string) => void;
  removeSnippetName: (name: string) => void;
  setSnippetsNames: (names: string[]) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsNames: [],
  selectedSnippet: null,
  addSnippetName: (name) =>
    set((state) => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  removeSnippetName: (name) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter((n) => n !== name),
      selectedSnippet:
        state.selectedSnippet?.name === name ? null : state.selectedSnippet,
    })),
  setSnippetsNames: (names) => set({ snippetsNames: names }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
}));
