import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useText } from "@/hooks/useText";
import React from "react";

interface SummarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SummarySheet({ open, onOpenChange }: SummarySheetProps) {
  const messages = useText((text) => text.messages);
  const setActiveMessage = useText((text) => text.setActiveMessage);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-card">
        <SheetHeader>
          <SheetTitle className="text-base lg:text-2xl text-primary font-cursive">
            Your Texts & Summaries
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
          <div className="space-y-4">
            {messages.map((m) => (
              <React.Fragment key={m.id}>
                <div
                  // variant="outline"
                  className="items-start justify-start w-full h-24 p-4 truncate transition-colors border rounded-lg cursor-pointer border-olive text-wrap hover:bg-muted border-primary"
                  onClick={() => {
                    onOpenChange(false);
                    setActiveMessage(m.id);
                  }}
                >
                  <p className="text-xl">{m.readableLanguage}</p>

                  {/* {m.} */}
                  <p className="text-xs">{m.text.slice(0, 50)}...</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
