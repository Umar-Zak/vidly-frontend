import React from "react";
import { NavLink, Link } from "react-router-dom";
const Nav = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Vidly
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <NavLink to="/movies" className="nav-item nav-link">
            Movies
          </NavLink>
          <NavLink to="/customers" className="nav-item nav-link">
            Customers
          </NavLink>
          <NavLink to="/rentals" className="nav-item nav-link">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item nav-link">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink to="/profile" className="nav-item nav-link">
                {user.name}
              </NavLink>
              <NavLink to="/logout" className="nav-item nav-link">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
