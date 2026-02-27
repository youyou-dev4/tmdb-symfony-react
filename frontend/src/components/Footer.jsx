import React from "react";

function Footer() {
  return (
    <footer className="footer">

      <p className="footer-copy">
        © {new Date().getFullYear()} Younes MATOUB
      </p>

      <a
        className="footer-github"
        href="https://github.com/youyou-dev4"
        target="_blank"
        rel="noreferrer"
      >
        GitHub ↗
      </a>

    </footer>
  );
}

export default Footer;