"use client";
import "./home.css";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import About from "../../components/About/about";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/footer";
import Service from "../../components/Services/service";
export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <About />
      <Service />
      <Footer />
    </div>
  );
}
