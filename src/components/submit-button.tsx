import { Send, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Mode } from "@/types";

interface SubmitButtonProps {
  onClick: () => void;
  loading?: boolean;
  hidden: boolean;
  mode: Mode;
  // disabled:boolean
}

export function SubmitButton({
  onClick,
  loading,
  hidden,
  mode = "text",
}: SubmitButtonProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "absolute bottom-2 right-2 transition-all bg-darkgreen text-cream hover:bg-olive",
        "border border-olive dark:border-cream transition-all duration-300  hover:scale-95 dark:hover:border-cream  rounded-full shadow-md hover:shadow-lg dark:bg-cream",
        "animate-float",
        loading && "opacity-70 cursor-not-allowed",
        hidden && "hidden"
      )}
      onClick={onClick}
      disabled={loading}
    >
      {
        loading ? (
          <div className="w-5 h-5 border-2 rounded-full border-cream border-t-transparent animate-spin" />
        ) : // {
        mode === "summary" ? (
          <Wand2 className="w-5 h-5 dark:text-darkgreen " />
        ) : mode === "text" ? (
          <Send className="w-5 h-5 dark:text-darkgreen " />
        ) : null
        // }
      }
    </Button>
  );
}
