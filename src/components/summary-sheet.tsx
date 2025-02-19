import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SummarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SummarySheet({ open, onOpenChange }: SummarySheetProps) {
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
            {[1, 2, 3, 4].map((i) => (
              <Button
                key={i}
                variant="outline"
                className="items-start justify-start w-full h-24 p-4 transition-colors rounded-lg hover:bg-muted border-primary"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Summary {i}</h4>
                    <p className="text-xs text-muted-foreground">
                      Created at {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
