// src/components/ChatInterface.tsx
import { useState } from "react";
import { Card } from "./ui/card";
import MessageInput from "./message-input";
import MessageList from "./message-list";
import { Message } from "@/types";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="h-full flex flex-col gap-4">
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} />
        </div>
        <div className="p-4 border-t">
          <MessageInput
            onSend={(text) => {
              setMessages([
                ...messages,
                {
                  id: Date.now(),
                  text,
                  type: "user",
                  detectedLanguage: "en",
                },
              ]);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
