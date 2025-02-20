import { useCallback, useState } from "react";
import { ChevronDown, Menu, Trash, Type } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn, languages } from "../lib/utils";
import { FileUpload } from "./file-upload";
import { Message, translateTypes } from "@/types";
import { SubmitButton } from "./submit-button";
import { Slider } from "./ui/slider";
import { useText } from "@/hooks/useText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguageDetect } from "@/hooks/UseLanguageDetect";
import LoadingSkeleton from "./empty-text-skeleton";
import { EmptyStateIllustration } from "./empty-state-illustration";
import { UseTranslator } from "@/hooks/useTranslator";

export type ModeType = "text" | "translation" | "summary";

export function TranslationPanel() {
  const [inputText, setInputText] = useState("");

  const [summaryType, setSummaryType] = useState("key-points");
  const [summaryLength, setSummaryLength] = useState([0]);
  const mode = useText((state) => state.mode);
  const handleMode = useText((state) => state.setMode);
  const addMessage = useText((state) => state.addMessage);
  const activeMessage = useText((state) => state.activeMessage);
  const deleteText = useText((state) => state.DeleteText);
  const deleteSummary = useText((state) => state.DeleteSummary);
  const addTranslation = useText((state) => state.addTranslation);
  const resetDectectedLanguage = useText(
    (state) => state.resetDectectedLanguage
  );

  const { translator, isTranslating } = UseTranslator();

  const { googleAi, languageTagToHumanReadable } = useLanguageDetect();

  const showFileUpload = inputText.length > 0;

  const shouldHideSubmitButton = () => {
    if (mode === "summary") {
      return false;
    }
    if (mode === "text" && inputText.length > 0) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (mode === "translation") return;

    if (mode === "text") {
      // logic for detecting language
      addText();
    }
    if (mode === "summary") {
      // logic for summarizing text
    }
  };

  const handleDelete = () => {
    if (!activeMessage) return;
    if (mode === "summary" && !activeMessage.summary) return;
    if (mode === "text") {
      deleteText(activeMessage.id);
    } else if (mode == "summary") {
      deleteSummary(activeMessage.id);
    }
  };

  async function addText() {
    if (!inputText.trim()) return;
    try {
      // Simulating API calls

      const response = await googleAi(inputText);
      if (!response) throw new Error("Failed to detect the language");

      const readableLanguage = languageTagToHumanReadable(
        response.language,
        "en"
      );
      if (!readableLanguage) throw new Error("failed to detect the language");
      const updatedMessage: Message = {
        // ...newMessage,
        id: Date.now(),
        text: inputText,

        readableLanguage,
        detectedLanguage: response.language,
      };
      addMessage(updatedMessage);
      setInputText("");
      toast.success(
        ` Successfully deciphered the language: ---- ${readableLanguage}`
      );
    } catch {
      toast.error("Failed to detect the language");
    }
  }

  const handleTranslate = async (language: translateTypes) => {
    // check if a text exists
    if (!activeMessage) return;

    const translation = await translator({
      textToBeTranslated: activeMessage.text,
      targetlanguage: language,
      currentLanguage: activeMessage.detectedLanguage,
    });

    if (!translation) {
      toast.error(
        `Failed to translate your text from ${
          activeMessage.readableLanguage
        } ${languageTagToHumanReadable(language, "en")}  `
      );
    }

    // ?write the translation to state and Add the active translation language
    // ? Mode will be changed in the hook
    addTranslation({
      translation,
      messageId: activeMessage.id,
      language,
    });
  };

  function handleOutputDisplay() {
    if (!activeMessage) return <EmptyStateIllustration mode={mode} />;

    if (mode === "text") {
      return <p>{activeMessage.text}</p>;
    }
    if (mode === "summary" && activeMessage.summary) {
      return <p>{activeMessage.summary}</p>;
    } else if (mode === "summary" && !activeMessage.summary) {
      return <EmptyStateIllustration mode={mode} />;
    }

    if (mode === "translation" && !activeMessage.translations)
      return <EmptyStateIllustration mode={mode} />;

    if (mode === "translation" && activeMessage.activeTranslationLanguage) {
      // ? if an activeTranslationLanguage exists , then a translation exists
      if (!activeMessage.translations)
        throw new Error(
          "An activeTranslationLanguage must exist for there to be translations for the current activeMessage"
        );
      return (
        <p>
          {activeMessage.translations[activeMessage.activeTranslationLanguage]}
        </p>
      );
    }
    if (!activeMessage.activeTranslationLanguage)
      return <EmptyStateIllustration mode={mode} />;

    // return activeMessage ? (
    //   mode === "text" ? (
    //     <p>{activeMessage.text}</p>
    //   ) : mode === "summary" && activeMessage.summary ? (
    //     <p>{activeMessage.summary}</p>
    //   ) : (
    //     <EmptyStateIllustration mode={mode} />
    //   )
    // ) : (
    //   <EmptyStateIllustration mode={mode} />
    // );
  }

  const handleShowTranslatedLanguage = () => {
    if (!activeMessage) return "Translations";

    if (activeMessage.activeTranslationLanguage) {
      return languageTagToHumanReadable(
        activeMessage.activeTranslationLanguage,
        "en"
      );
    }

    if (
      !activeMessage.activeTranslationLanguage &&
      activeMessage.detectedLanguage
    ) {
      return activeMessage.readableLanguage.split(" ")[0];
    }
    //?  Since there cannot be an activeTranslationLanguage without a detectedLanguage
  };

  const countWords = useCallback(() => {
    if (!inputText || typeof inputText !== "string") return 0; // Handle empty or non-string inputs
    return inputText.trim().split(/\s+/).length;
  }, [inputText]);

  const showDropdown = () => {
    if (!activeMessage) return false;
    if (mode === "text") {
      if (activeMessage.text) return true;
    }
    if (mode === "summary") {
      if (activeMessage.summary) return true;
      if (!activeMessage.summary) return false;
    }
    return false;
  };

  return (
    <div className="space-y-4 overflow-hidden border rounded-lg animate-in fade-in-50 border-primary bg-card shadow-soft">
      <section className="w-full ">
        <div className="sticky top-0 z-10 bg-card border-primary">
          <div className="flex items-center justify-between  md:justify-center w-full h-[50px] gap-2 p-2 border-b rounded-none border-primary bg-muted">
            <div
              role="button"
              onClick={() => {
                handleMode("text");
                resetDectectedLanguage?.();
              }}
              className={cn(
                " rounded-sm py-0.5 lg:px-5 px-2 hover-shadow hover:bg-accent/80 flex items-center justify-center  h-full hover:text-primary-foreground text-sm",
                {
                  "bg-accent text-primary-foreground": mode === "text",
                }
              )}
            >
              TEXT
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                disabled={!activeMessage}
                className="disabled:cursor-not-allowed"
                asChild
              >
                <div
                  role="button"
                  className={cn(
                    "flex items-center justify-between disabled:cursor-not-allowed gap-4 rounded-sm py-0.5 lg:px-5 px-2 hover-shadow text-sm hover:bg-accent/80 hover:text-primary-foreground ",
                    {
                      "bg-accent text-primary-foreground shadow-sm":
                        mode === "translation",
                      " hover:shadow-none text-black cursor-not-allowed dark:text-inherit ":
                        !activeMessage,
                    }
                  )}
                >
                  {handleShowTranslatedLanguage()}

                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((language) => {
                  // if language.shortName !== message.detectedLanguage
                  // else return null
                  const canShowLanguage =
                    activeMessage &&
                    activeMessage.detectedLanguage === language.shortName;
                  if (!canShowLanguage) {
                    return (
                      <DropdownMenuItem
                        key={language.shortName}
                        onClick={() => handleTranslate(language.shortName)}
                      >
                        {language.visibleName.toUpperCase()}
                      </DropdownMenuItem>
                    );
                  } else return null;
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              role="button"
              onClick={() => {
                if (!activeMessage) {
                  toast.info("Select a text to be summarized");
                } else {
                  handleMode("summary");
                }
              }}
              className={cn(
                " rounded-sm py-0.5 lg:px-5 px-2 hover:bg-accent/80 h-full flex items-center justify-center hover:text-primary-foreground  hover-shadow text-sm",
                {
                  "bg-accent text-primary-foreground ": mode === "summary",
                }
              )}
            >
              SUMMARY
            </div>
          </div>
        </div>

        {/* OUTPUT BOX */}
        <section className="flex flex-col p-1 m-0 md:p-2 lg:p-4 gap-y-3">
          <div className="relative min-h-[300px] rounded-md border border-primary bg-background">
            {isTranslating ? (
              <LoadingSkeleton />
            ) : (
              <div className="p-4 min-h-[200px]">{handleOutputDisplay()}</div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute border rounded-full bottom-2 right-2 border-primary"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-48">
                {activeMessage && activeMessage?.summary ? null : (
                  <DropdownMenuItem onClick={() => handleMode("summary")}>
                    <Type className="w-4 h-4 mr-2" />
                    Summarize
                  </DropdownMenuItem>
                )}
                {showDropdown() ? (
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash className="w-4 h-4 mr-2" />
                    {mode === "text" ? "Delete Text" : "Delete Summary"}
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative flex w-full h-full gap-3 ">
            {mode === "translation" ? null : (
              <div className="w-full  lg:h-[150px] h-[300px] flex items-stretch flex-col   lg:flex-row gap-3">
                <Textarea
                  placeholder={
                    mode === "text"
                      ? "Enter text to be deciphered..."
                      : "input a context for the summary"
                  }
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                  }}
                  className="items-stretch w-full h-full rounded-md resize-none placeholder:text-darkgreen/50 bg-background border-primary"
                />

                <FileUpload
                  onFileContent={(content) => {
                    setInputText(content);
                  }}
                  hidden={showFileUpload || mode === "summary"}
                />

                <SubmitButton
                  hidden={shouldHideSubmitButton()}
                  onClick={handleSubmit}
                  mode={mode}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            {inputText && mode === "text" && (
              <div className="w-full text-sm text-muted-foreground">
                Word count: <span className="rounded-md ">{countWords()}</span>
              </div>
            )}
            {/* SHOW THIS ONLY WHEN THERE IS A TEXT TO BE SUMMARIZED AND WE ARE ON SUMMARY MODE*/}
            {mode === "summary" && (
              <>
                <Select value={summaryType} onValueChange={setSummaryType}>
                  <SelectTrigger className="w-[180px] bg-primary text-white">
                    <SelectValue placeholder="Summary Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="key-points">KeyPoints</SelectItem>
                    <SelectItem value="tl;dr">TL;DR</SelectItem>
                    <SelectItem value="teaser">Teaser</SelectItem>
                    <SelectItem value="headline">Headline</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center justify-end w-full gap-2">
                  <span className="text-xs">Summary Length:</span>
                  <Slider
                    className="w-1/4"
                    max={2}
                    value={summaryLength}
                    onValueChange={setSummaryLength}
                    step={1}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
