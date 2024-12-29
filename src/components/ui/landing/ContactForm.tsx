import React from "react";

const ContactForm = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-12 pt-24 pb-4">
      <div className=" h-1/2 sm:h-full flex flex-col lg:flex-row justify-center gap-64 items-center gap-12 w-full text-center">
        <h2 className="text-teal-600 font-bold text-4xl sm:text-5xl lg:text-6xl text-center lg:w-4/12">
          Contact Us
        </h2>
        <div className="h-full text-white bg-teal-600 rounded-3xl w-full lg:w-4/12  flex flex-col gap-2 sm:gap-8 items-center justify-center p-4">
          <img
            src="/drangue_light_logo.svg"
            alt="Beplus Logo"
            className="w-32 h-32 lg:w-64 lg:h-64 object-contain"
          />
          <h2 className="font-bold text-2xl lg:text-6xl">Drangue.ai</h2>
          <p className="text-md lg:text-xl">GeoAI Solutions</p>
          <p className="text-md lg:text-xl">info@drangue.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
