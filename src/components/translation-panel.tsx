import { useState } from "react";
import {
  ChevronDown,
  // Loader2,
  Menu,
  RotateCw,
  Trash2,
  Type,
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

export type ModeType = "text" | "translation" | "summary";
interface TranslationPanelProps {
  onSummarize: (text: string) => void;
}

export function TranslationPanel({ onSummarize }: TranslationPanelProps) {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(true);

  const [mode, setMode] = useState<ModeType>("text");

  const handleMode = (mode: ModeType) => setMode(mode);

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

  const wordCount = inputText.trim().split(/\s+/).length;

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
                    "flex items-center justify-between gap-2 rounded-sm py-0.5 px-5 hover-shadow text-sm hover:bg-accent/80 hover:text-primary-foreground ",
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
                      onClick={() => handleTranslate(language.shortName)}
                    >
                      {language.visibleName.toUpperCase()}
                    </DropdownMenuItem>
                  );
                })}
                {/* <DropdownMenuItem onClick={() => handleTranslate()}>
                  Spanish
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTranslate()}>
                  French
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTranslate()}>
                  German
                </DropdownMenuItem> */}
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
        <section className="p-4 m-0">
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
                HELLO WORLD
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
                      <DropdownMenuItem onClick={() => handleTranslate()}>
                        <RotateCw className="w-4 h-4 mr-2" />
                        Re-translate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSummarize(inputText)}>
                        <Type className="w-4 h-4 mr-2" />
                        Summarize
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setInputText("");
                          setShowFileUpload(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
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

          <div className="relative mt-4">
            {showFileUpload && !inputText ? (
              <FileUpload
                onFileContent={(content) => {
                  setInputText(content);
                  setShowFileUpload(false);
                }}
              />
            ) : (
              <Textarea
                placeholder="Enter text to translate..."
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setShowFileUpload(false);
                }}
                className="min-h-[100px] resize-none pr-12 bg-background border-primary rounded-md"
              />
            )}
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
          <div className="mt-2 text-sm text-muted-foreground">
            Word count: {wordCount}
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
