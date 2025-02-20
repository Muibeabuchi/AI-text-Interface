import { useCallback } from "react";
import { toast } from "sonner";

export function useLanguageDetect() {
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
    // @ts-expect-error THere is no types for the self.AI api
    if ("ai" in self && "languageDetector" in window.self.ai) {
      // The Language Detector API is available.
      const languageDetectorCapabilities =
        // @ts-expect-error THere is no types for the self.AI api
        await window.self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;

      let detector: Promise<unknown> | (() => Promise<unknown>);
      if (canDetect === "no") {
        // The language detector isn't usable.
        toast.error("The language detector isn't usable");
        return;
      }
      if (canDetect === "readily") {
        // @ts-expect-error THere is no types for the self.AI api
        detector = await window.self.ai.languageDetector.create();
        toast.success("The language detector can immediately be used");
      } else {
        // The language detector can be used after model download.
        // @ts-expect-error THere is no types for the self.AI api
        detector = await window.self.ai.languageDetector.create({});
        // @ts-expect-error THere is no types for the self.AI api
        await detector.ready;
      }
      // @ts-expect-error THere is no types for the self.AI api
      const detectedLanguage = await detector.detect(inputText);

      return {
        // readableLanguage,
        language: detectedLanguage[0]?.detectedLanguage as string,
      };
    } else {
      toast.error(`This device is not compatible with browser feature`);
    }
  }, []);

  return { googleAi, languageTagToHumanReadable };
}
