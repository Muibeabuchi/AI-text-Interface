import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center justify-between gap-2 p-1.5 border rounded-full shadow-sm border-input bg-background ">
      <Button
        variant="ghost"
        className={cn(`w-1 h-1 p-4 rounded-full`, {
          "bg-accent text-accent-foreground": theme === "light",
        })}
        onClick={() => setTheme("light")}
      >
        <Sun className="w-2 h-2 transition-all rounded-full" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => setTheme("dark")}
        className={cn(`w-1 h-1 p-4 rounded-full`, {
          "bg-accent text-accent-foreground": theme === "dark",
        })}
      >
        <Moon className="w-3 h-3 transition-all rounded-full " />
      </Button>
      <Button
        variant="ghost"
        onClick={() => setTheme("system")}
        className={cn(`w-1 h-1 p-4 rounded-full`, {
          "bg-accent text-accent-foreground": theme === "system",
        })}
      >
        <Monitor className="w-3 h-3 transition-all rounded-full " />
      </Button>
      {/* <Button onClick={() => setTheme("dark")}>Dark</Button>
      <Button onClick={() => setTheme("system")}>System</Button> */}
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
