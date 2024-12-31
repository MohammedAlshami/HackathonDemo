"use client";
import React, { useEffect, useState } from "react";
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
import { useTranslations } from "next-intl";

function Page({ lang }: { lang: any }) {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname; // e.g., sub.example.com
    const parts = hostname.split(".");

    // Assuming the structure is subdomain.domain.tld
    if (parts.length > 2) {
      setSubdomain(parts[0]); // First part is the subdomain
    } else {
      setSubdomain("palm"); // No subdomain found
    }
  }, []);
  console.log("Solution Type");
  // const solution = process.env.solutionType;
  // const solution = process.env.SUBDOMAIN_NAME;
  const hero = useTranslations(subdomain + "." + "landing.hero");
  const logoCloud = useTranslations(subdomain + "." + "landing.logoCloud");
  const about = useTranslations(subdomain + "." + "landing.about");
  const navLinks = useTranslations(subdomain + "." + "landing.navLinks");
  console.log("subdomain Type", subdomain);

  const navLinksArray = [
    { label: navLinks("home"), href: "/" },
    { label: navLinks("about"), href: "#about" },
    { label: navLinks("features"), href: "#features" },
    { label: navLinks("FAQ"), href: "#FAQ" },
    { label: navLinks("contact"), href: "#contact" },
  ];
  return (
    <div className="space-y-32 scroll-smooth bg-white ">
      <Navbar navLinks={navLinksArray} />
      <h1></h1>

      <div className="">
        <Hero2
          mainTitle={hero("title")}
          mainTitleColored={hero("coloredTitle")}
          subTitle={hero("subTitle")}
        />
        <LogoCloud title={logoCloud("title")} />
        <div id="about">
          <About title={about("title")} description={about("description")} />
        </div>
        <div id="features">
          <Features1 />
        </div>
        <div id="stats">
          <Stats />
        </div>
      </div>
      <div id="contact">
        <CTA1 />
      </div>
      {/* 
  

   
       */}
    </div>
  );
}

export default Page;
