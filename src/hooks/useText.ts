import { Message, Mode } from "@/types";
import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

interface useTextTypes {
  mode: Mode;
  setMode: (mode: Mode) => void;
  messages: Message[];
  addMessage: (newMessage: Message) => void;
  activeMessage?: Message;
  setActiveMessage: (messageId: number) => void;
  DeleteText: (messageId: number) => void;
}

const initialMode: Mode = "text";

export const useText = create<useTextTypes>()(
  persist(
    (set) => ({
      mode: initialMode,
      setMode: (mode) =>
        set((state) => ({
          mode:
            mode === "summary" ? (!state.activeMessage ? "text" : mode) : mode,
        })),
      messages: [],
      addMessage: (newMessage) =>
        set((state) => ({
          messages: [...state.messages, newMessage],
          activeMessage: newMessage,
        })),
      setActiveMessage: (messageId) =>
        set((state) => ({
          activeMessage: state.messages.find((item) => item.id === messageId),
        })),
      DeleteText: (messageId) =>
        set((state) => ({
          activeMessage: undefined,
          messages: state.messages.find((m) => m.id === messageId)
            ? state.messages.filter((m) => m.id !== messageId)
            : state.messages,
        })),
    }),
    {
      name: "ai-text-translator", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
