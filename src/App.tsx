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
import { ThemeToggle } from "./components/toggle-theme";
import ThemeProvider from "./components/theme-provider";

type Message = {
  id: number;
  text: string;
  language?: string;
  summary?: string;
  translation?: string;
};

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

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    try {
      // Simulating API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const detectedLanguage = "en"; // Replace with actual API call
      const updatedMessage = { ...newMessage, language: detectedLanguage };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? updatedMessage : msg))
      );
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsProcessing(false);
    }
  };

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

  const handleTranslate = async (messageId: number) => {
    setIsProcessing(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const translation = "This is a translated version of the text."; // Replace with actual API call
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, translation } : msg
        )
      );
    } catch (error) {
      console.error("Error translating:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen bg-background text-foreground p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">AI-Powered Text Processing</h1>
          <ThemeToggle />
        </div>
        <Card className="flex-grow overflow-auto mb-4">
          <CardContent className="p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <p>{message.text}</p>
                {message.language && (
                  <p className="text-sm text-muted-foreground">
                    Detected language: {message.language}
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
                      size="sm"
                    >
                      Translate
                    </Button>
                  )}
                </div>
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
            className="flex-grow"
          />
          <Button onClick={handleSend} disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
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
