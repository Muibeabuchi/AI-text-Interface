// src/components/MessageInput.tsx
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2">
      <Textarea
        className="resize-none"
        placeholder="Type your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        size="icon"
        onClick={() => {
          if (text.trim()) {
            onSend(text);
            setText("");
          }
        }}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MessageInput;
