'use client';

import { useEffect, useState } from "react";
import "./Loading.css";
import Marquee from "react-fast-marquee";

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => setLoaded(true), 400);
      setTimeout(() => {
        setIsLoaded(true);
        setClicked(true);
        setTimeout(() => setFadeOut(true), 800);
        setTimeout(() => setHidden(true), 1800);
      }, 1000);
    }
  }, [percent]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  if (hidden) return null;

  return (
    <div className={`loading-screen ${clicked ? 'pointer-events-none' : ''} ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-header">
        <a href="/#" className="loader-title">Portfolio</a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-marquee">
        <Marquee speed={100}>
          <span> A Student & Entrepreneur</span> <span>A Student & Entrepreneur</span>
          <span> A Student & Entrepreneur</span> <span>A Student & Entrepreneur</span>
        </Marquee>
      </div>
      <div
        className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
        onMouseMove={handleMouseMove}
      >
        <div className="loading-hover"></div>
        <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-content-in">
                Loading <span>{Math.min(percent, 100)}%</span>
              </div>
            </div>
            <div className="loading-box"></div>
          </div>
          <div className="loading-content2">
            <span>Welcome</span>
          </div>
        </div>
      </div>
    </div>
  );
}
