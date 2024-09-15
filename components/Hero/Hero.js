"use client";
import React from "react";
import "./Hero.css";

import Link from "next/link";
import TypingEffect from 'react-typing-effect';

export default function Hero() {
    return (
        <div className="home-container">

            <video autoPlay loop muted id="background-video">
                <source src='/home.mp4' type="video/mp4" />
                Your browser does not support the video tag.
            </video>

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
                <Link href='/marketplace'><button className="home-button">Trade Energy</button></Link>
            </div>


        </div>
    );
}
