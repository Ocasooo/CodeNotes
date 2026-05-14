import { create } from "zustand";

interface SnippetState {
  snippetsNames: string[];
  selectedSnippet: string | null;
  addSnippetName: (name: string) => void;
  setSnippetsNames: (names: string[]) => void;
  setSelectedSnippet: (snippet: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsNames: [],
  selectedSnippet: null,
  addSnippetName: (name) =>
    set((state) => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  setSnippetsNames: (names) => set({ snippetsNames: names }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
}));
