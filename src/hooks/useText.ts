import { Message, Mode } from "@/types";
import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

interface useTextTypes {
  mode: Mode;
  setMode: (mode: Mode) => void;
  messages: Message[];
  addMessage: (newMessage: Message) => void;
}

const initialMode: Mode = "text";

export const useText = create<useTextTypes>()(
  persist(
    (set) => ({
      mode: initialMode,
      setMode: (mode) =>
        set({
          mode,
        }),
      messages: [],
      addMessage: (newMessage) =>
        set((state) => ({ messages: [...state.messages, newMessage] })),
      // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),

      // removeAllBears: () => set({ bears: 0 }),
      // updateBears: (newBears) => set({ bears: newBears }),
    }),
    {
      name: "ai-text-translator", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
