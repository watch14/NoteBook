import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="f-logo">
          <img
            className="img-logo"
            src="/icone/notebook-logo-x4.png"
            alt="JP.NoteBook"
          />
          <img className="text-logo" src="icone/logo-text-1.png" alt="" />
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notebooks">Notebooks</Link>
            </li>
            <li>
              <Link to="/keyboard">Keyboard</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>App Info</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social Media</h3>
          <ul>
            <li>
              <a href="404" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="404" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="404" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest features and tips!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 JP.Notebook. All rights reserved.</p>
      </div>
    </footer>
  );
}
