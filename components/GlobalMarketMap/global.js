"use client";
import React from "react";
import Link from "next/link";
import "./global.css";

export default function Globe() {
    return (
        <><div className="about-head">
            <h1>Global Energy Market Map</h1>
        </div>
            <div className="aboutus">

                <div className="about-video-cont">
                    <video autoPlay loop muted id="about-video">
                        <source src='/india.mp4' type="video/mp4" />
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

                        <Link href='/worldmap'><button>Global Energy Market</button></Link>
                    </p>
                </div>
            </div>
        </>
    );
}
