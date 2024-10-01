import React from "react";
import { Link } from "react-router-dom";
import "../css/about.css"; // Import your About page styles

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About JP.NoteBook</h1>
        <p>
          Your interactive companion for mastering the Japanese language through
          text, drawing, and real-time translations. JP.NoteBook was created
          when I was about to start learning Japanese. I had an idea that would
          help people learn it, so I created this app to simplify and enhance
          the learning experience.
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            JP.NoteBook was created to provide a seamless and intuitive learning
            experience for anyone interested in the Japanese language. Whether
            you're just starting out or perfecting your kanji, our platform
            makes it easier for learners to practice writing, typing, and
            translating Japanese characters.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Interactive Notebook:</strong> Type and edit text in
              hiragana, katakana, and kanji. Switch between kana systems with a
              simple click and see real-time translations to English.
            </li>
            <li>
              <strong>Sketchpad:</strong> Practice drawing kanji with a mouse or
              stylus on our sketchpad. Perfect your strokes and learn the
              correct stroke order.
            </li>
            <li>
              <strong>Real-Time Input:</strong> Type in lowercase to instantly
              see hiragana, or use uppercase for katakana. View translations to
              English, romaji, and kana all in one place.
            </li>
            <li>
              <strong>Kanji Search:</strong> Easily find kanji by searching
              descriptions, meanings, and more.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why JP.NoteBook?</h2>
          <p>
            Learning Japanese can be challenging, especially with the various
            writing systems. We designed JP.NoteBook to be a digital solution
            that integrates multiple ways to practice—whether it's typing or
            handwriting, searching for kanji, or translating text. Our goal is
            to make learning engaging, fun, and flexible for everyone.
          </p>
        </section>

        <section className="about-section">
          <h2>Get Started</h2>
          <p>
            Join thousands of learners today! Whether you're a beginner or
            advancing your skills, JP.NoteBook is designed to make your journey
            smoother.
            <Link to="/register">
              <strong>Sign up</strong>
            </Link>
            and start learning now!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
