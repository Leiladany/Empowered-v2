import React from "react";
import { NavLink } from "react-router-dom";
import { IconBrandInstagram } from "@tabler/icons-react";

function Footer() {
  return (
    <section className="section-footer">
      <div className="container-footer">
        <p className="footer-copy">
          © 2023 feel empowered. All Rights Reserved. Made with love by Leila,
          Anna, and Diana
          <br />
          <span className="footer-small-copy">only Love - no Hate</span>
        </p>

        <div className="footer-links">
          <NavLink className="footer-about-follow" to="/about">
            About
          </NavLink>

          <div className="footer-link-row">
            <a
              className="footer-about-follow"
              href="https://www.instagram.com/empoweredemp/"
              target="_blank"
              rel="noreferrer"
            >
              Follow us
            </a>
            <IconBrandInstagram />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
