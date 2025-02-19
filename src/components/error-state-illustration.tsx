import { useTheme } from "next-themes";

export function DeviceErrorIllustration() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center justify-center p-8">
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
        <rect
          x="40"
          y="60"
          width="120"
          height="80"
          rx="8"
          fill={isDark ? "#fefae0" : "#283618"}
        />
        <rect
          x="50"
          y="70"
          width="100"
          height="60"
          rx="4"
          fill={isDark ? "#283618" : "#fefae0"}
        />
        <path
          d="M70 100L85 115L100 100L115 115L130 100"
          stroke={isDark ? "#fefae0" : "#283618"}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="140" r="5" fill={isDark ? "#fefae0" : "#283618"} />
        <path
          d="M60 40L65 45M140 40L135 45M60 160L65 155M140 160L135 155"
          stroke={isDark ? "#fefae0" : "#283618"}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-lg font-medium text-center text-foreground">
        Oops! Device Incompatibility
      </p>
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Your device might not be compatible with our translation models
      </p>
    </div>
  );
}
