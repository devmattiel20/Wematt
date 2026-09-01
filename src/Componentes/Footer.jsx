import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección de información */}
        <div className="footer-section">
          <h3>Weather Finder</h3>
          <p>
            Tu aplicación favorita para consultar el clima en cualquier lugar
            del mundo.
          </p>
        </div>

        {/* Sección de enlaces útiles */}
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#clima">Clima</a>
            </li>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
          </ul>
        </div>

        {/* Sección de redes sociales */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#twitter" aria-label="Twitter" title="Twitter">
              𝕏
            </a>
            <a href="#facebook" aria-label="Facebook" title="Facebook">
              📘
            </a>
            <a href="#instagram" aria-label="Instagram" title="Instagram">
              📷
            </a>
          </div>
        </div>
      </div>

      {/* Línea separadora */}
      <hr className="footer-divider" />

      {/* Información de copyright */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Weather Finder. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ por tu equipo de desarrollo</p>
      </div>
    </footer>
  );
}

export default Footer;