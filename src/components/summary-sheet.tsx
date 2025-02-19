import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
import { useText } from "@/hooks/useText";

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
          <SheetTitle className="text-2xl text-primary font-cursive">
            Summaries
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
          <div className="space-y-4">
            {messages.map((m) => (
              <>
                <Button
                  key={m.id}
                  variant="outline"
                  className="items-start justify-start w-full h-24 p-4 transition-colors rounded-lg hover:bg-muted border-primary"
                  onClick={() => setActiveMessage(m.id)}
                >
                  {m.readableLanguage}

                  {/* {m.} */}
                  <p>{m.text}</p>
                </Button>
              </>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
