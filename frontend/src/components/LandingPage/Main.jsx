import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/images/bg1.svg";
import bg2 from "../../assets/images/bg2.jpg";
import { features } from "../../constants/constant";
import "./Main.css";

const phrases = [
  "Bookmark Your Coding Problems in One Click",
  "Organize. Save. Revisit.",
  "ZCoder: Built for Coders, by Coders."
];

const Main = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const href = user ? "/bookmark" : "/login";

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const speed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      setTypedText((prev) =>
        isDeleting
          ? currentPhrase.slice(0, prev.length - 1)
          : currentPhrase.slice(0, prev.length + 1)
      );

      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentPhraseIndex]);

    const start = () => {
    navigate('/signin');  
  };
  return (
    <div className="hero-section">
      <h1 className="hero-heading">
        <span className="typed-text">{typedText}</span>
        <span className="cursor">|</span>
      </h1>

      <p className="hero-subtitle">
        Welcome to ZCoder, the ultimate hub for all your bookmarked coding problems! 
        Collect and manage your favorite challenges from various coding platforms in one place. 
        Start solving and keep track of your progress effortlessly!
      </p>

      <div className="hero-buttons">
        <button className="hero-button" onClick={start}>
          Start for Free
        </button>
      </div>

      <div className="hero-images">
        <img src={bg} alt="Background 1" className="hero-img" />
        <img src={bg2} alt="Background 2" className="hero-img" />
      </div>

      {/* Features Section */}
      <h2 className="section-heading">Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-box">
            <div className="feature-icon">{feature.icon}</div>
            <h5 className="feature-title">{feature.text}</h5>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
