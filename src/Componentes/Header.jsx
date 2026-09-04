import "./Header.css";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img
            src="/src/assets/Logo.png"
            width="120"
            alt="Logo"
            className="logo-img"
          />
          <span className="logo-text">Wematt</span>
        </div>

        {/* Right side actions */}
        <div className="navbar-actions">
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
