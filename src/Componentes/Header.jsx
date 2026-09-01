import "./Header.css";
import { useTheme } from "../context/ThemeContext";

/**
 * Componente Header
 * 
 * Este componente muestra el navbar y contiene el botón de cambio de tema.
 * 
 * ¿Cómo funciona el botón de tema?
 * =================================
 * 1. Importamos useTheme() del contexto
 * 2. Obtenemos isDark y toggleTheme del hook
 * 3. El botón llama a toggleTheme() cuando se hace clic
 * 4. Esto cambia el estado en ThemeContext
 * 5. El efecto en ThemeContext actualiza data-theme en HTML
 * 6. Todos los CSS con [data-theme="..."] se aplican automáticamente
 */
function Header() {
  // Obtenemos el estado del tema y la función para cambiarlo
  // isDark: true si estamos en dark mode, false si estamos en light mode
  // toggleTheme: función que invierte isDark
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/src/assets/Logo.png" width="120"  alt="Logo" className="logo-img" />
          <span className="logo-text">Wematt</span>
        </div>

        

       

        {/* Right side actions */}
        <div className="navbar-actions">
          {/* 
            Botón de cambio de tema
            
            Al hacer clic:
            1. Llama a toggleTheme()
            2. Cambia isDark en el estado
            3. useEffect en ThemeContext se ejecuta
            4. Se actualiza data-theme en HTML
            5. CSS reacciona y todos los estilos cambian
            
            El emoji cambia según el modo:
            - Dark mode: ☀️ (mostrar sol = cambiar a light mode)
            - Light mode: 🌙 (mostrar luna = cambiar a dark mode)
          */}
          <button 
            className="theme-toggle" 
            title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            onClick={toggleTheme}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;