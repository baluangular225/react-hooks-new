import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Header = () => {

  const updateValue = useSelector((state) => state.counter.value);
  const addValue = useSelector((state) => state.user.value);  // Adding optional chaining to prevent errors
  const cartValue = useSelector((state)=> state.cart)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Use Link for valid navigation */}
          <Link className="navbar-brand" to="/">Navbar</Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home{addValue}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/useEffect1">
                  useEffect {updateValue}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="bi bi-cart3 me-1"></i>{cartValue.length}
                </Link>
              </li>

             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
