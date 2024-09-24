import React from "react";
import { Link } from "react-router-dom";
import "../css/notfound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not">
          <h1 className="japanese-text">４０４</h1>
          <p className="japanese-text">ページが見つかりません</p>
          <p className="english-text">Page not found</p>
          <div className="zen-circle"></div>
        </div>

        {/* <div className="returnhome">
          <p className="haiku">
            Lost in cyberspace
            <br />
            A digital leaf adrift
            <br />
            Click home to return
          </p>
          <Link to="/" className="home-button">
            ホームに戻る
            <br />
            <span className="english-text">Return Home</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
