import { Message } from "@/types";
// import { Message } from "@/types";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useLanguageDetect({
  inputText,
  setInputText,
  setMessages,
  setProcessing,
}: {
  inputText: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setProcessing: Dispatch<SetStateAction<boolean>>;
}) {
  const languageTagToHumanReadable = useCallback(
    (languageTag: string, targetLanguage: string) => {
      const displayNames = new Intl.DisplayNames([targetLanguage], {
        type: "language",
      });
      return displayNames.of(languageTag);
    },
    []
  );

  const googleAi = useCallback(async () => {
    if ("ai" in self && "languageDetector" in self.ai) {
      // The Language Detector API is available.
      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;

      let detector;
      if (canDetect === "no") {
        // The language detector isn't usable.
        return;
      }
      if (canDetect === "readily") {
        // The language detector can immediately be used.
        detector = await self.ai.languageDetector.create();
      } else {
        // The language detector can be used after model download.
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              // console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }
      const detectedLanguage = await detector.detect(inputText);
      // console.log(detectedLanguage);
      const readableLanguage = languageTagToHumanReadable(
        detectedLanguage[0].detectedLanguage,
        "en"
      );
      if (!readableLanguage) throw new Error("failed to detetct a language");
      return {
        readableLanguage,
        language: detectedLanguage[0]?.detectedLanguage as string,
      };
    } else {
      console.log("nein");
    }
  }, [inputText, languageTagToHumanReadable]);

  const handleSend = useCallback(async () => {
    if (!inputText.trim()) return;

    setProcessing(true);
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    try {
      // Simulating API calls
      const response = await googleAi();
      if (!response) throw new Error("Failed to detect the language");
      // const  = "en"; // Replace with actual API call
      const updatedMessage = {
        ...newMessage,
        readableLanguage: response.readableLanguage,
        language: response.language,
      };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? updatedMessage : msg))
      );
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setProcessing(false);
    }
  }, [googleAi, inputText, setInputText, setProcessing, setMessages]);

  return { handleSend };
}
