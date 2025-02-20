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

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen transition-colors duration-300 bg-background text-foreground">
        <div className="max-w-4xl p-6 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AppIcon />
              <h1 className="text-sm lg:text-2xl font-cursive text-primary">
                AI Translator
              </h1>
            </div>
            <div className="flex gap-2 h-[37px] lg:h-[45.7955px] items-stretch">
              <ToggleTheme />
              <Button
                variant="outline"
                onClick={() => setSheetOpen(true)}
                className="h-full gap-2 px-3 py-1 lg:rounded-full lg:p-2 rounded-xl hover-shadow "
              >
                <PanelRightOpen className="w-4 h-4" />

                <span className="hidden lg:block"> View Summaries</span>
              </Button>
            </div>
          </div>

          <TranslationPanel />
          <SummarySheet open={sheetOpen} onOpenChange={setSheetOpen} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
