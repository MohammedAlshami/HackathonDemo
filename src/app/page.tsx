"use client";
import React from "react";
import Hero1 from "@/components/ui/landing/Hero1";
import Footer from "@/components/ui/landing/Footer";
import Navbar from "@/components/ui/landing/Navbar";
import About from "@/components/ui/landing/About";
import FAQ from "@/components/ui/landing/FAQ";
import Extra from "@/components/ui/landing/Extra";
const page = () => {
  return (
    <div className="space-y-32">
      <Navbar />
      <Hero1 />
      <About />
      <Extra />

      {/* <FAQ /> */}
      <Footer />
    </div>
  );
};

export default page;
