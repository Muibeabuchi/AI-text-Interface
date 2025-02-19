import { useState } from "react";
import { TranslationPanel } from "@/components/translation-panel";
import { SummarySheet } from "@/components/summary-sheet";
import { Button } from "./components/ui/button";
import { PanelRightOpen } from "lucide-react";
import { AppIcon } from "@/components/app-icon";
import ThemeProvider from "./components/theme-provider";
import { ToggleTheme } from "./components/toggle-theme";

function App() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSummarize = (text: string) => {
    if (!text) return;
    setSheetOpen(true);
  };

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen transition-colors duration-300 bg-background text-foreground">
        {/* <Toaster position="top-center" /> */}
        <div className="max-w-4xl p-6 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AppIcon />
              <h1 className="text-2xl font-cursive text-primary">
                AI Translator
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ToggleTheme />
              <Button
                variant="outline"
                onClick={() => setSheetOpen(true)}
                className="gap-2 rounded-full hover-shadow"
              >
                <PanelRightOpen className="w-4 h-4" />
                View Summaries
              </Button>
            </div>
          </div>

          <TranslationPanel onSummarize={handleSummarize} />
          <SummarySheet open={sheetOpen} onOpenChange={setSheetOpen} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
