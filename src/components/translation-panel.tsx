import { useState } from "react";
import {
  ChevronDown,
  Loader2,
  Menu,
  RotateCw,
  Trash2,
  Type,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
import { cn } from "../lib/utils";
import { FileUpload } from "./file-upload";

interface TranslationPanelProps {
  onSummarize: (text: string) => void;
}

export function TranslationPanel({ onSummarize }: TranslationPanelProps) {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(true);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to translate");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDetectedLanguage("English");
      toast.success("Translation complete!");
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
      <Tabs defaultValue="text" className="w-full">
        <div className="sticky top-0 z-10 border-b bg-card border-primary">
          <TabsList className="justify-center w-full border-b rounded-none border-primary bg-muted">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-t-lg hover-shadow"
            >
              TEXT
            </TabsTrigger>
            <TabsTrigger
              value="translations"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-t-lg hover-shadow"
            >
              TRANSLATIONS
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-t-lg hover-shadow"
            >
              SUMMARY
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="text" className="p-4 m-0">
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
                {detectedLanguage && (
                  <p className="text-sm text-muted-foreground">
                    Detected language: {detectedLanguage}
                  </p>
                )}
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
                        className="absolute border rounded-full bottom-2 right-2 hover:bg-muted border-primary"
                      >
                        <Menu className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
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
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select language</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Word count: {wordCount}
          </div>
        </TabsContent>

        <TabsContent value="translations">
          <div className="p-4">
            <p>Translations content goes here</p>
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="p-4">
            <p>Summary content goes here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
