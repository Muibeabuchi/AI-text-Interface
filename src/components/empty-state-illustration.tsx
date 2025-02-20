import { Mode } from "@/types";
import { useTheme } from "next-themes";

export function EmptyStateIllustration({ mode }: { mode: Mode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center justify-center ">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <rect
          width="200"
          height="200"
          fill={isDark ? "#fefae0" : "#283618"}
          fillOpacity="0.1"
        />
        <path
          d="M60 100C60 77.9086 77.9086 60 100 60C122.091 60 140 77.9086 140 100C140 122.091 122.091 140 100 140C77.9086 140 60 122.091 60 100Z"
          fill={isDark ? "#fefae0" : "#283618"}
          fillOpacity="0.2"
        />
        <path
          d="M80 100C80 88.9543 88.9543 80 100 80C111.046 80 120 88.9543 120 100C120 111.046 111.046 120 100 120C88.9543 120 80 111.046 80 100Z"
          fill={isDark ? "#fefae0" : "#283618"}
        />
        <path
          d="M95 95L105 105M105 95L95 105"
          stroke={isDark ? "#283618" : "#fefae0"}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M70 70L75 75M130 70L125 75M70 130L75 125M130 130L125 125"
          stroke={isDark ? "#fefae0" : "#283618"}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-lg font-medium text-center text-foreground">
        No {mode.toUpperCase()} to display yet
      </p>
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Start by entering some text or uploading a file
      </p>
    </div>
  );
}
