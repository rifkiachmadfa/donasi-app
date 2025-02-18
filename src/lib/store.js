import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchQuery: "",
  results: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setResults: (data) => set({ results: data }),
}));

export default useSearchStore;
