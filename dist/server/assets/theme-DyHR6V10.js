import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/theme.tsx
var STORAGE_KEY = "ai-study-hub:theme";
function getInitialTheme() {
  if (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  )
    return "dark";
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
var ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() =>
    typeof window === "undefined" ? "light" : getInitialTheme(),
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);
  const setTheme = (t) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  return /* @__PURE__ */ jsx(ThemeContext.Provider, {
    value: {
      theme,
      toggleTheme,
      setTheme,
    },
    children,
  });
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
/** Inline script to set the theme class before paint (avoids a flash of the wrong theme). */
var themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;
//#endregion
export { themeInitScript as n, useTheme as r, ThemeProvider as t };
