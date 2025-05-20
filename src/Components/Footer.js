import React from "react";
import './Footer.css'; // Import your custom CSS if you placed the styles in an external file

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <span className="text-muted">© 2021 Company, Inc</span>

          <ul className="nav justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="#"><i className="bi bi-twitter"></i></a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#"><i className="bi bi-instagram"></i></a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#"><i className="bi bi-facebook"></i></a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
