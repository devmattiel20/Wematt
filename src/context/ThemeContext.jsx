import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");

    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const html = document.documentElement;

    if (isDark) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
  }, [isDark]); // Se ejecuta cuando isDark cambia

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  // Validación: asegurar que useTheme se usa dentro de ThemeProvider
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de ThemeProvider");
  }

  return context;
}
