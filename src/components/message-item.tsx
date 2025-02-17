// src/components/MessageItem.tsx
import { Message } from "@/types";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const showSummarize =
    message.text.length > 150 && message.detectedLanguage === "en";

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <p className="text-foreground">{message.text}</p>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            Language: {message.detectedLanguage}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {showSummarize && (
            <Button variant="secondary" size="sm">
              Summarize
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="tr">Turkish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" size="sm">
              Translate
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MessageItem;
