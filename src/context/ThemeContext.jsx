import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Permanently lock theme to "light" (White Theme)
  const theme = "light";

  React.useEffect(() => {
    localStorage.setItem("turing_wings_theme", "light");
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: "light", toggleTheme: () => {}, setTheme: () => {} };
  }
  return context;
}
