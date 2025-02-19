import { useCallback, useState } from "react";
import {
  ChevronDown,
  // Loader2,
  Menu,
  RotateCw,
  Trash,
  // Trash2,
  Type,
  X,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn, languages } from "../lib/utils";
import { FileUpload } from "./file-upload";
import { translateTypes } from "@/types";
import { SubmitButton } from "./submit-button";
import { Slider } from "./ui/slider";
import { useText } from "@/hooks/useText";
// import { EmptyStateIllustration } from "./empty-state-illustration";
// import { DeviceErrorIllustration } from "./error-state-illustration";

export type ModeType = "text" | "translation" | "summary";
interface TranslationPanelProps {
  onSummarize: (text: string) => void;
}

export function TranslationPanel({ onSummarize }: TranslationPanelProps) {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  // const [showFileUpload, setShowFileUpload] = useState(true);

  // const [mode, setMode] = useState<ModeType>("text");
  // const handleMode = (mode: ModeType) => setMode(mode);

  const mode = useText((state) => state.mode);
  const handleMode = useText((state) => state.setMode);

  const showFileUpload = inputText.length > 0;

  const handleTranslate = async (language: translateTypes) => {
    // check if a text exists
    if (!inputText.trim()) {
      return toast.error("Please enter some text to translate");
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDetectedLanguage("English");
      toast.success("Translation complete!");
      handleMode("translation");
    } catch (err: unknown) {
      setError("Failed to translate text. Please try again.");
      toast.error("Translation failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const countWords = useCallback(() => {
    if (!inputText || typeof inputText !== "string") return 0; // Handle empty or non-string inputs
    return inputText.trim().split(/\s+/).length;
  }, [inputText]);

  return (
    <div className="space-y-4 overflow-hidden border rounded-lg animate-in fade-in-50 border-primary bg-card shadow-soft">
      <section
        // defaultValue={mode}
        // value={mode}
        // onClick={(value: ModeType) => handleMode(value)}
        className="w-full "
      >
        <div className="sticky top-0 z-10 bg-card border-primary">
          <div className="flex items-center justify-center w-full gap-2 p-2 border-b rounded-none border-primary bg-muted">
            <div
              role="button"
              onClick={() => handleMode("text")}
              className={cn(
                " rounded-sm py-0.5 px-5 hover-shadow hover:bg-accent/80 hover:text-primary-foreground text-sm",
                {
                  "bg-accent text-primary-foreground": mode === "text",
                }
              )}
            >
              TEXT
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  role="button"
                  // onClick={() => handleMode("translation")}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-sm py-0.5 px-5 hover-shadow text-sm hover:bg-accent/80 hover:text-primary-foreground ",
                    {
                      "bg-accent text-primary-foreground shadow-sm":
                        mode === "translation",
                    }
                  )}
                >
                  TRANSLATIONS
                  {}
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((language) => {
                  return (
                    <DropdownMenuItem
                      key={language.shortName}
                      onClick={() => handleTranslate(language.shortName)}
                    >
                      {language.visibleName.toUpperCase()}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              role="button"
              onClick={() => handleMode("summary")}
              className={cn(
                " rounded-sm py-0.5 px-5 hover:bg-accent/80 hover:text-primary-foreground  hover-shadow text-sm",
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
        <section className="flex flex-col p-4 m-0 gap-y-3">
          <div className="relative min-h-[300px] rounded-md border border-primary bg-background">
            {loading ? (
              <div className="p-4 space-y-3">
                <div className="w-2/3 h-4 rounded bg-muted animate-pulse" />
                <div className="w-1/2 h-4 rounded bg-muted animate-pulse" />
                <div className="w-3/4 h-4 rounded bg-muted animate-pulse" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 p-4 text-destructive">
                <span className="text-sm">{error}</span>
              </div>
            ) : (
              <div className="p-4 min-h-[200px]">
                {/* {detectedLanguage && (
                  <p className="text-sm text-muted-foreground">
                    Detected language: {detectedLanguage}
                  </p>
                )} */}
                {/* <DeviceErrorIllustration /> */}
                {/* <EmptyStateIllustration /> */}
              </div>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
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
                    <DropdownMenuContent
                      align="end"
                      side="top"
                      className="w-48"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setInputText("");
                          // setShowFileUpload(true);
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear Text
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <RotateCw className="w-4 h-4 mr-2" />
                        Re-translate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSummarize(inputText)}>
                        <Type className="w-4 h-4 mr-2" />
                        Summarize
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="w-4 h-4 mr-2" /> Delete Text
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More actions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {inputText && (
            <div className="flex items-center justify-between w-full">
              <div className="w-full text-sm text-muted-foreground">
                Word count: <span className="rounded-md ">{countWords()}</span>
              </div>
              {/* SHOW THIS ONLY WHEN THERE IS A TEXT TO BE SUMMARIZED */}
              <div className="flex items-center justify-end w-full gap-2">
                <span className="text-xs">Summary Length:</span>
                <Slider className="w-1/4" max={3} step={1} />
              </div>
            </div>
          )}

          <div className="relative flex items-stretch w-full h-full gap-3 mt-4">
            {/* {showFileUpload && !inputText ? (
            ) : ( */}
            <Textarea
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              className="w-full h-full  rounded-md resize-none min-h-[100px] bg-background border-primary"
            />

            <FileUpload
              onFileContent={(content) => {
                setInputText(content);
              }}
              hidden={showFileUpload === false}
            />

            <SubmitButton
              hidden={inputText.length <= 0}
              onClick={() => {}}
              mode={mode}
            />

            {/* )} */}
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild> */}
            {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        className={cn(
                          "absolute bottom-2 right-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
                          loading && "opacity-70 cursor-not-allowed"
                        )}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleTranslate()}>
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTranslate()}>
                        Spanish
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTranslate()}>
                        French
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTranslate()}>
                        German
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
            {/* </TooltipTrigger>
                <TooltipContent>
                  <p>Select language</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
        </section>

        {/* <TabsContent value="translations">
          <div className="p-4">
            <p>Translations content goes here</p>
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="p-4">
            <p>Summary content goes here</p>
          </div>
        </TabsContent> */}
      </section>
    </div>
  );
}
