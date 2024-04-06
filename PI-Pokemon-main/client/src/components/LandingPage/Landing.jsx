import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to Pokedex</h1>
      <Link to="/home" className="btn-enter">Press Start</Link>
      <Link to="/about" className="about-link">About us</Link>
    </div>
  );
}

export default Landing;
 