import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Wematt</h3>
          <p>
            Tu aplicación favorita para consultar el clima en cualquier lugar
            del mundo.
          </p>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MATTHEW BETTIN.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
