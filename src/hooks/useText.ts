import { Mode } from "@/types";
import { create } from "zustand";

interface useTextTypes {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const initialMode: Mode = "text";

export const useText = create<useTextTypes>((set) => ({
  mode: initialMode,
  setMode: (mode) =>
    set({
      mode,
    }),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),

  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));
