import { Message, Mode, translateTypes } from "@/types";
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
  DeleteSummary: (messageId: number) => void;
  resetDectectedLanguage?: () => void;
  addTranslation: ({
    language,
    translation,
    messageId,
  }: {
    language: translateTypes;
    translation: string;
    messageId: number;
  }) => void;
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
          mode: "text",
        })),
      DeleteText: (messageId) =>
        set((state) => ({
          activeMessage: undefined,
          messages: state.messages.find((m) => m.id === messageId)
            ? state.messages.filter((m) => m.id !== messageId)
            : state.messages,
        })),
      DeleteSummary: (messageId) =>
        set((state) => ({
          messages: state.messages.find((m) => m.id === messageId)
            ? state.messages.map((m) =>
                m.id === messageId ? { ...m, summary: undefined } : m
              )
            : state.messages,
          activeMessage: state.activeMessage
            ? (state.activeMessage.summary = undefined)
            : undefined,
          mode: "text",
        })),
      addTranslation: ({ language, translation, messageId }) =>
        set((state) => {
          // messages: () => {
          //   // ensure there is an active translation
          if (!state.activeMessage) return state;
          const isActiveMessage = state.activeMessage.id === messageId;
          if (!isActiveMessage) return state;
          // grab the active message from the messages
          const message = state.messages.find(
            (message) => message.id === messageId
          );
          if (!message) return state;
          // },

          return {
            ...state,
            activeMessage: {
              ...state.activeMessage,
              activeTranslationLanguage: language,
              translations: {
                ...state.activeMessage.translations,
                // !Failed to make the language type stricter
                [language]: translation,
              },
              // activeTranslationLanguage: language,
            },
            mode: "translation",
            messages: state.messages.map((text) => {
              if (text.id === message.id) {
                return {
                  ...text,
                  translations: {
                    ...text.translations,
                    // !Failed to make the language type stricter
                    [language]: translation,
                  },
                  activeTranslationLanguage: language,
                };
              } else return text;
            }),
            resetDectectedLanguage: () =>
              set((state) => ({
                // ...state,
                activeMessage: state.activeMessage
                  ? {
                      ...state.activeMessage,
                      activeTranslationLanguage:
                        state.activeMessage.detectedLanguage,
                    }
                  : state.activeMessage,
              })),

            // resetDectectedLanguage: set((state) => ({
            //   // ...state,
            //   activeMessage: state.activeMessage
            //     ? {
            //         ...state.activeMessage,
            //         // activeTranslationLanguage: state.activeMessage
            //         //   .activeTranslationLanguage
            //         //   ? state.activeMessage.detectedLanguage
            //         //   : state.activeMessage.activeTranslationLanguage,
            //       }
            //     : state.activeMessage,
            // })),
            // resetDectectedLanguage: () =>
            //   set((state) => ({
            //     ...state,
            //     activeMessage:{
            //        activeTranslationLanguage: state.activeMessage ? state.activeMessage.detectedLanguage : state.activeMessage. ;
            //     }
            //   })),
            // [
            //   ...state.messages,
            //   {
            //     ...message,
            //     translations: {
            //       // !Failed to make the language type stricter
            //       [language]: translation,
            //     },
            //   },
            // ],
          };
        }),
    }),
    {
      name: "ai-text-translator", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
