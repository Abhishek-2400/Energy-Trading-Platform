"use client";
import "./home.css";
import React from "react";
import Navbar from "../../components/Navbar";
import TypingEffect from 'react-typing-effect';

export default function Home() {
  return (
    <div className="home-container">
      <video autoPlay loop muted id="background-video">
        <source src='/home.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar />
      <div className="homehead">
        <h1>Energy

          <TypingEffect
            text={['Hive']}
            speed={200}      // Speed at which the text is typed (in milliseconds)
            eraseSpeed={150}  // Speed at which the text is erased (in milliseconds)
            typingDelay={100}  // Delay before typing starts (in milliseconds)
            eraseDelay={100} // Delay before erasing starts (in milliseconds)
          />

        </h1>
        <p>Indias First Peer to Peer Energy Trading Platform</p>
      </div>
    </div>
  );
}
