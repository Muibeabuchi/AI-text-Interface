export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export type AiCapabilitiesTypes = "no" | "readily" | "after-download";

export type translateTypes = "en" | "pt" | "es" | "ru" | "tr" | "fr";

export interface LanguageObjectType {
  visibleName: string;
  shortName: translateTypes;
}

export type Message = {
  id: number;
  text: string;
  detectedLanguage: string;
  summary?: string;
  translations?: Record<string, string>;
  readableLanguage: string;
  activeTranslationLanguage?: string;
  // isTranslating?: boolean;
  // translationError?: boolean;
};

export type Mode = "summary" | "text" | "translation";
