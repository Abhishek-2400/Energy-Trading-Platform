"use client";
import React from "react";
import "./cards.css";

export default function Cards({ image, head, text }) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt="solar" />
            </div>
            <div className="card-text">
                <h2>{head}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
}