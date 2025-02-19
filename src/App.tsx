import { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Card, CardContent } from "./components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { ToggleTheme } from "./components/toggle-theme";
import ThemeProvider from "./components/theme-provider";
import { UseTranslator } from "./hooks/useTranslator";
import { Message } from "./types";
import { useLanguageDetect } from "./hooks/UseLanguageDetect";

const languages = [
  { value: "en", label: "English" },
  { value: "pt", label: "Portuguese" },
  { value: "es", label: "Spanish" },
  { value: "ru", label: "Russian" },
  { value: "tr", label: "Turkish" },
  { value: "fr", label: "French" },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const { translator } = UseTranslator();
  const { handleSend } = useLanguageDetect({
    inputText,
    setInputText,
    setMessages,
    setProcessing: setIsProcessing,
  });

  const handleSummarize = async (messageId: number) => {
    setIsProcessing(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const summary = "This is a summary of the text."; // Replace with actual API call
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, summary } : msg))
      );
    } catch (error) {
      console.error("Error summarizing:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslationState = (messageId: number, status: boolean) => {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === messageId ? { ...item, isTranslating: status } : item
      )
    );
  };
  const handleTranslationError = (messageId: number, errorStatus: boolean) => {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === messageId ? { ...item, isTranslating: errorStatus } : item
      )
    );
  };

  const handleTranslate = async (messageId: number) => {
    const message = messages.find((item) => item.id === messageId);
    if (!message) return;
    const textToBeTranslated = message.text;
    const currentLanguage = message.language;
    // console.log("text", text);
    // console.log("messageId", messageId);
    // setIsProcessing(true);
    try {
      // Simulating API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const translation = await translator({
        targetlanguage: selectedLanguage,
        currentLanguage,
        textToBeTranslated,
        handleTranslationState,
        messageId,
        handleTranslationError,
      });
      // const translation = "This is a translated version of the text."; // Replace with actual API call
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, translation } : msg
        )
      );
    } catch (error) {
      console.error("Error translating:", error);
    } finally {
      // setIsProcessing(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen p-4 bg-background text-foreground">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">AI-Powered Text Processing</h1>
          {/* <ThemeToggle /> */}
          <ToggleTheme />
        </div>
        <Card className="flex-grow mb-4 overflow-auto">
          <CardContent className="p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <p>{message.text}</p>
                {message.language && (
                  <p className="text-sm text-muted-foreground">
                    Detected language: {message.readableLanguage}
                  </p>
                )}
                <div className="space-x-2">
                  {message.text.length > 150 &&
                    message.language === "en" &&
                    !message.summary && (
                      <Button
                        onClick={() => handleSummarize(message.id)}
                        variant="outline"
                        size="sm"
                      >
                        Summarize
                      </Button>
                    )}
                  {!message.translation && (
                    <Button
                      onClick={() => handleTranslate(message.id)}
                      variant="outline"
                      disabled={message.isTranslating}
                      size="sm"
                    >
                      {message.isTranslating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        "Translate"
                      )}
                    </Button>
                  )}
                </div>
                {/* Todo: Place an error alert somewhere here */}
                {message.summary && (
                  <Card className="bg-muted">
                    <CardContent className="p-2 text-sm">
                      <strong>Summary:</strong> {message.summary}
                    </CardContent>
                  </Card>
                )}
                {message.translation && (
                  <Card className="bg-muted">
                    <CardContent className="p-2 text-sm">
                      <strong>Translation:</strong> {message.translation}
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex items-center space-x-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            required
            minLength={10}
            className="flex-grow"
          />
          <Button onClick={handleSend} disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <div className="mt-2">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
