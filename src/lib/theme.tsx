// src/lib/theme.tsx
import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "ai-study-hub:theme";

function getInitialTheme(): Theme {
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // ignore
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? "light" : getInitialTheme(),
  );

  // useLayoutEffect (not useEffect) so the <html> class is updated
  // synchronously before the browser paints — this avoids a visible
  // flash of the wrong theme when the theme value changes.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Module-level (not component-level) bookkeeping so that navigating
// directly between two "always light" pages (e.g. trang chủ -> đăng nhập)
// never restores the user's dark theme in between — it's only restored
// once we leave the last forced-light page on the stack.
let forceLightDepth = 0;
let savedTheme: Theme | null = null;

/**
 * Forces the page to render in light mode for as long as the calling
 * component is mounted, restoring the user's previous theme once no
 * forced-light page is mounted anymore.
 * Use on pages that should never show dark mode (landing page, auth pages).
 */
export function useForceLightTheme() {
  const { theme, setTheme } = useTheme();
  useLayoutEffect(() => {
    if (forceLightDepth === 0) {
      savedTheme = theme;
    }
    forceLightDepth++;
    setTheme("light");
    return () => {
      forceLightDepth--;
      if (forceLightDepth === 0 && savedTheme) {
        setTheme(savedTheme);
        savedTheme = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;
