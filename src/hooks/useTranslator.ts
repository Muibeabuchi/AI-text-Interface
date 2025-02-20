import { AiCapabilitiesTypes } from "@/types";
// import { useState } from "react";

export function UseTranslator() {
  // const [translatorError, setTranslatorError] = useState("");
  // const [isTranslating, setIsTranslating] = useState(false);

  async function translator({
    targetlanguage,
    currentLanguage,
    textToBeTranslated,
    handleTranslationState,
    messageId,
    handleTranslationError,
  }: {
    targetlanguage: string;
    currentLanguage?: string;
    textToBeTranslated: string;
    handleTranslationState: (messageId: number, status: boolean) => void;
    handleTranslationError: (messageId: number, errorStatus: boolean) => void;
    messageId: number;
  }) {
    // console.log("targetLanguage", targetlanguage);
    // console.log("currentLanguage", currentLanguage);
    // console.log("text to translated", textToBeTranslated);
    try {
      handleTranslationState(messageId, true);
      if ("ai" in self && "translator" in window.self.ai) {
        // The Translator API is supported.

        const translatorCapabilities =
          await window.self.ai.translator.capabilities();
        const canTranslate: AiCapabilitiesTypes =
          translatorCapabilities.languagePairAvailable(
            targetlanguage,
            currentLanguage
          );

        console.log(canTranslate);
        let translator;
        if (canTranslate === "no") {
          // throw new Error("Failed to translate the languages");
          handleTranslationError(messageId, true);
        }
        if (canTranslate === "readily") {
          translator = await window.self.ai.translator.create({
            sourceLanguage: currentLanguage,
            targetLanguage: targetlanguage,
          });
          console.log("i am in the readily block");
        } else {
          console.log("i am in the after download execution block");

          translator = await window.self.ai.translator.create({
            sourceLanguage: currentLanguage,
            targetLanguage: targetlanguage,
            monitor(m) {
              m.addEventListener("downloadprogress", (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
          console.log("i am in the after download execution block");
          // await translator.ready;
        }
        console.log(translator);

        return await translator.translate(textToBeTranslated);
      } else {
        // Todo: use toast to show this error
        throw new Error("This feature is not supported in your browser");
      }
    } catch (error) {
      // Todo: use toast to show this error
      // handleTranslationError(messageId,);
      console.log(error);
    } finally {
      handleTranslationState(messageId, false);
    }
  }

  return {
    translator,
  };
}
