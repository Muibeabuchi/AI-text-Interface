import { initialState, ThemeProviderState } from "@/types";
import { createContext } from "react";

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
