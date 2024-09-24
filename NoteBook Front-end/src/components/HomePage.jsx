import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1>Welcome to JP.Notebook</h1>
          <p>Your personal Japanese learning companion</p>
          <Link to="/notebooks" className="cta-button">
            Get Started
          </Link>
        </div>
      </header>

      <main>
        <section className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Create Your Digital Notebook</h3>
              <p>Design and customize your own Japanese learning notebook.</p>
            </div>
            <div className="feature-card">
              <h3>Write and Draw</h3>
              <p>
                Practice your Japanese writing skills with our digital paper.
              </p>
            </div>
            <div className="feature-card">
              <h3>Instant Translations</h3>
              <p>Type in English and see it instantly converted to Japanese.</p>
            </div>
            <div className="feature-card">
              <h3>Track Your Progress</h3>
              <p>
                Save your pages with dates and titles. Review your learning
                journey.
              </p>
            </div>
          </div>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose JP.Notebook?</h2>
          <div className="why-choose-us-content">
            <div className="zen-circle"></div>
            {/* <div className="demo-image">
              <img src="./img/img.png" alt="JP.Notebook Demo" />
            </div> */}

            <ul className="benefits-list">
              <li>Personalized learning experience</li>
              <li>Intuitive interface designed for language learners</li>
              <li>Combines digital convenience with traditional note-taking</li>
              <li>
                Practice writing, reading, and translation all in one place
              </li>
              <li>Cloud-based storage for access anywhere, anytime</li>
            </ul>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to start your Japanese learning journey?</h2>
          <Link to="/register" className="cta-button">
            Sign Up Now
          </Link>
        </section>
      </main>
    </div>
  );
}
