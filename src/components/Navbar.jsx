import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Image } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { IconBrandInstagram, IconMail } from "@tabler/icons-react";

function NavBar() {
  const { isAuthenticated, logout } = useContext(SessionContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <section className="navbar-section-outer">
      <div className="navbar-section-inner">
        <nav className="navbar-nav-group navbar-nav-group-left">
          <NavLink className="navbar-comp-style" to="/">
            home
          </NavLink>
          <NavLink className="navbar-comp-style" to="/resources">
            resources
          </NavLink>
          <NavLink className="navbar-comp-style" to="/info">
            info
          </NavLink>
          <NavLink className="navbar-comp-style" to="/about">
            about
          </NavLink>
        </nav>

        <div className="navbar-center">
          <Image
            width={180}
            className="style-logo"
            src="../../images/logo-purple.png"
            alt="logo empowered"
          />
        </div>

        <nav className="navbar-nav-group navbar-nav-group-right">
          <NavLink className="navbar-comp-style" to="/quiz">
            quiz
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink className="navbar-comp-style" to="/forum">
                forum
              </NavLink>
              <NavLink className="navbar-comp-style" to="/profile">
                profile
              </NavLink>
              <NavLink className="navbar-comp-style" to="/" onClick={handleLogout}>
                logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="navbar-comp-style" to="/signup">
                sign up
              </NavLink>
              <NavLink className="navbar-comp-style" to="/login">
                login
              </NavLink>
            </>
          )}

          <a
            className="navbar-icon-link"
            href="https://www.instagram.com/empoweredemp/"
            aria-label="Empowered Instagram"
          >
            <IconBrandInstagram className="navbar-icon" />
          </a>

          <a
            className="navbar-icon-link"
            href="mailto:empowered9876@gmail.com"
            aria-label="Email Empowered"
          >
            <IconMail className="navbar-icon" />
          </a>
        </nav>
      </div>
    </section>
  );
}

export default NavBar;
