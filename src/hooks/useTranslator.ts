import { AiCapabilitiesTypes } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export function UseTranslator() {
  const [isTranslating, setIsTranslating] = useState(false);

  async function translator({
    targetlanguage,
    currentLanguage,
    textToBeTranslated,
  }: {
    targetlanguage: string;
    currentLanguage: string;
    textToBeTranslated: string;
  }) {
    setIsTranslating(true);

    try {
      // @ts-expect-error THere is no types for the self.AI api
      if ("ai" in self && "translator" in window.self.ai) {
        const translatorCapabilities =
          // @ts-expect-error THere is no types for the self.AI api
          await window.self.ai.translator.capabilities();
        const canTranslate: AiCapabilitiesTypes =
          translatorCapabilities.languagePairAvailable(
            targetlanguage,
            currentLanguage
          );

        let translator;
        if (canTranslate === "no") {
          toast.error(
            "Your device is not compatible with these experimiantal API's"
          );
        }
        if (canTranslate === "readily") {
          // @ts-expect-error THere is no types for the self.AI api
          translator = await window.self.ai.translator.create({
            sourceLanguage: currentLanguage,
            targetLanguage: targetlanguage,
          });
        } else {
          // @ts-expect-error THere is no types for the self.AI api
          translator = await window.self.ai.translator.create({
            sourceLanguage: currentLanguage,
            targetLanguage: targetlanguage,
          });
          toast.info(
            "Downloading the necessary resources to translate the selected languages"
          );
        }

        return await translator.translate(textToBeTranslated);
      } else {
        toast.error("This feature is not supported in your browser");
        // throw new Error("This feature is not supported in your browser");
      }
    } catch {
      toast.error("An error occurred while translating");
    } finally {
      setIsTranslating(false);
    }
  }

  return {
    translator,
    isTranslating,
  };
}
