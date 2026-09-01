/**
 * ThemeContext.jsx
 * 
 * Este archivo implementa un sistema de gestión de tema (light/dark mode) usando React Context.
 * 
 * ¿Cómo funciona?
 * ===============
 * 1. Almacena el estado del tema en localStorage para persistencia
 * 2. Proporciona funciones para cambiar entre temas
 * 3. Aplica automáticamente el tema al elemento raíz del documento
 * 4. Permite que cualquier componente acceda al estado del tema mediante useTheme()
 */

import { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto que contendrá la información del tema
// Un "contexto" es como una caja global donde guardamos información
// que queremos que muchos componentes puedan acceder sin pasar props
const ThemeContext = createContext();

/**
 * ThemeProvider - Componente proveedor del tema
 * 
 * Este componente envuelve toda la aplicación y proporciona
 * el estado del tema a todos los componentes hijos.
 * 
 * Uso en main.jsx:
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children }) {
  // Estado que controla si estamos en modo oscuro o claro
  // isDark = true → Dark Mode (☀️)
  // isDark = false → Light Mode (🌙)
  const [isDark, setIsDark] = useState(() => {
    // Esta función se ejecuta solo la primera vez (inicialización)
    // Recuperar el tema guardado en localStorage
    const saved = localStorage.getItem('theme');
    
    // Si hay un tema guardado, usarlo. Si no, usar dark mode por defecto
    return saved ? saved === 'dark' : true;
  });

  /**
   * Effect: Sincronizar tema con localStorage y aplicar al documento
   * 
   * Este hook se ejecuta cada vez que isDark cambia y:
   * 1. Guarda la preferencia en localStorage para recordarla la próxima vez
   * 2. Aplica el tema al HTML del documento usando data-theme
   * 
   * El atributo data-theme se usa en CSS para aplicar
   * diferentes estilos según el tema actual
   */
  useEffect(() => {
    // Guardar el tema actual en localStorage
    // "theme" es la clave, "dark" o "light" es el valor
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Obtener el elemento raíz (html) del documento
    const html = document.documentElement;
    
    // Aplicar el atributo data-theme al elemento HTML
    // Esto permite que CSS sepa qué tema aplicar
    // Por ejemplo: [data-theme="dark"] .navbar { ... }
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }, [isDark]); // Se ejecuta cuando isDark cambia

  /**
   * toggleTheme - Función para cambiar entre temas
   * 
   * Simplemente invierte el estado: si es dark, cambia a light y viceversa.
   * El useEffect anterior se encargará de actualizar localStorage y el documento.
   */
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  /**
   * Provider - Proporcionar el contexto a todos los componentes
   * 
   * El value contiene:
   * - isDark: boolean que indica si estamos en dark mode
   * - toggleTheme: función para cambiar de tema
   * 
   * Cualquier componente hijo puede acceder a esto usando useTheme()
   */
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme - Hook personalizado para acceder al tema
 * 
 * Cualquier componente puede usar este hook para:
 * 1. Saber en qué modo estamos: const { isDark } = useTheme()
 * 2. Cambiar de modo: const { toggleTheme } = useTheme()
 * 
 * Ejemplo de uso en un componente:
 * function Header() {
 *   const { isDark, toggleTheme } = useTheme();
 *   return (
 *     <button onClick={toggleTheme}>
 *       {isDark ? '☀️' : '🌙'}
 *     </button>
 *   );
 * }
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Validación: asegurar que useTheme se usa dentro de ThemeProvider
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  
  return context;
}
