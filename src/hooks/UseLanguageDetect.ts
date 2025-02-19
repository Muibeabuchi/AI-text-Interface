import { Message } from "@/types";
// import { Message } from "@/types";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useText } from "./useText";
import { toast } from "sonner";

export function useLanguageDetect() {
  // const addMessage = useText((text) => text.addMessage);
  const languageTagToHumanReadable = useCallback(
    (languageTag: string, targetLanguage: string) => {
      const displayNames = new Intl.DisplayNames([targetLanguage], {
        type: "language",
      });
      return displayNames.of(languageTag);
    },
    []
  );

  const googleAi = useCallback(async (inputText: string) => {
    if ("ai" in self && "languageDetector" in self.ai) {
      // The Language Detector API is available.
      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;

      let detector: Promise<unknown> | (() => Promise<unknown>);
      if (canDetect === "no") {
        // The language detector isn't usable.
        toast.error("The language detector isn't usable");
        return;
      }
      if (canDetect === "readily") {
        detector = await self.ai.languageDetector.create();
        toast.success("The language detector can immediately be used");
      } else {
        // The language detector can be used after model download.
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              toast.promise(detector, {
                loading: `Downloading the required data.`,
                success: () => {
                  return `language detector is ready for use `;
                },
                error: "Error deciphering the language from text",
              });
            });
          },
        });

        await detector.ready;
      }

      const detectedLanguage = await detector.detect(inputText);

      return {
        // readableLanguage,
        language: detectedLanguage[0]?.detectedLanguage as string,
      };
    }
    // }
    else {
      toast.error(`This device is not compatible with browser feature`);
    }
  }, []);

  // const readableLanguage = languageTagToHumanReadable(
  //   detectedLanguage[0].detectedLanguage,
  //   "en"
  // );
  // if (!readableLanguage) throw new Error("failed to detetct a language");

  // const handleSend = useCallback(async () => {

  // }, [googleAi, inputText, setInputText, setProcessing, setMessages]);

  return { googleAi, languageTagToHumanReadable };
}
