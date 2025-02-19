import * as React from "react";
import { ChevronDown, Menu, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function TranslationInterface() {
  const [detectedLanguage, setDetectedLanguage] = React.useState("English");
  const [inputText, setInputText] = React.useState("");

  return (
    <div className="min-h-screen p-6 text-white bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-[1fr_300px] gap-6 border border-neutral-700 rounded-lg p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Tabs defaultValue="text" className="flex-1">
              <TabsList className="bg-transparent border border-neutral-700">
                <TabsTrigger
                  value="text"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500"
                >
                  TEXT
                </TabsTrigger>
                <TabsTrigger
                  value="translations"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-green-500"
                >
                  translations
                  <ChevronDown className="w-4 h-4 ml-1" />
                </TabsTrigger>
                <TabsTrigger
                  value="summary"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500"
                >
                  summary
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="min-h-[200px] rounded border border-neutral-700 p-4 relative">
            <div className="absolute text-sm bottom-2 left-2 text-neutral-400">
              detected language: {detectedLanguage}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 hover:bg-neutral-800"
                >
                  <Menu className="w-5 h-5 text-green-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-900 border-neutral-700">
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative">
            <Textarea
              placeholder="input text to be detected"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[100px] bg-transparent border-neutral-700 resize-none"
            />
            <Button
              size="icon"
              className="absolute bg-green-600 bottom-2 right-2 hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="pl-4 border-l border-neutral-700">
          <h2 className="mb-4 text-blue-400">summaries</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 border rounded border-blue-400/20 bg-blue-950/20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
