"use client";
import React from "react";
import "./about.css";

export default function About() {
    return (
        <>
            <div className="about-head">
                <h1>About Us</h1>
            </div>
            <div className="aboutus">

                <div className="about-video-cont">
                    <video autoPlay loop muted id="about-video">
                        <source src='/about.mp4' type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="about-text-cont">
                    <p>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.

                        <br></br>
                        <br></br>

                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>
        </>
    );
}
