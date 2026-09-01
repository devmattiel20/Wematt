import "./Header.css";

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/src/assets/Logo.png" width="100"  alt="Logo" className="logo-img" />
          <span className="logo-text">Weather Finder</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <a href="#inicio" className="nav-link active">
            Inicio
          </a>
          <a href="#clima" className="nav-link">
            Clima
          </a>
          <a href="#sobre" className="nav-link">
            Sobre
          </a>
        </nav>

        {/* Right side actions */}
        <div className="navbar-actions">
          <button className="theme-toggle" title="Toggle dark mode">
            🌙
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;