"use client";
import React from "react";
import Hero1 from "@/components/ui/landing/Hero1";
import Footer from "@/components/ui/landing/Footer";
import Navbar from "@/components/ui/landing/Navbar";
import About from "@/components/ui/landing/About";
import FAQ from "@/components/ui/landing/FAQ";
import Extra from "@/components/ui/landing/Extra";
import ContactForm from "@/components/ui/landing/ContactForm";
import Hero2 from "@/components/ui/landing/Hero2";
import Features1 from "@/components/ui/landing/Features1";
import CTA1 from "@/components/ui/landing/CTA1";
import LogoCloud from "@/components/ui/landing/LogoCloud";
import Stats from "@/components/ui/landing/Stats";
const page = () => {
  return (
    <div className="space-y-32 scroll-smooth bg-white ">
      <Navbar />
      <div className="">
        <Hero2 />
        <LogoCloud />
        <div id="about">
          <About />
        </div>
        <div id="features">
          <Features1 />
        </div>
        <div id="stats">
          <Stats />
        </div>
      </div>

      {/* <div id="FAQ">
        <FAQ />
      </div> */}
      <div id="contact">
        <CTA1 />
      </div>
    </div>
  );
};

export default page;
