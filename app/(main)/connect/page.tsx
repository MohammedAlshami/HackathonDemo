"use client";
import { BatteryCharging, BatteryChargingIcon, Calendar } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Step1 = ({ setStep }) => {
  return (
    <div
      className="cursor-pointer text-xl bg-teal-500 w-full max-w-md h-fit flex flex-col gap-2 justify-center items-center p-2 rounded-lg text-white"
      onClick={() => setStep(2)}
    >
      <a className="font-bold">Discover Devices</a>
    </div>
  );
};

const Step2 = ({ setStep }) => {
  return (
    <div
      className="cursor-pointer text-xl font-bold border-4 border-teal-500 bg-white w-full max-w-md h-fit flex flex-row gap-2  items-center p-2 rounded-2xl text-white"
      onClick={() => setStep(3)}
    >
      <img src="/cameraStick.png" alt="" className="bg-transparent h-20" />
      <div className="flex flex-col gap-2">
        <h2 className=" text-black">Esos231</h2>
        <div className="flex gap-2 text-green-400">
          <BatteryCharging className=" size-8 rotate-90" />
          <h2>80%</h2>
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ setStep }) => {
const router = useRouter();
  const [connecting, setConnecting] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-xl bg-teal-500 w-full max-w-md h-fit flex flex-col gap-2 justify-center items-center p-2 rounded-lg text-white">
      {connecting ? (
        <p className="font-bold">Connecting...</p>
      ) : (
        <>
          <p className="font-bold">Device has been connected successfully!</p>
          <button
            className="mt-4 w-full bg-white text-teal-500 p-2 rounded-lg"
            onClick={() => router.push("/detect")}
          >
            Start Detecting 
          </button>
        </>
      )}
    </div>
  );
};

const Page = () => {
  const [step, setStep] = useState(1);

  const renderStepContent = () => {
    if (step === 1) {
      return <Step1 setStep={setStep} />;
    } else if (step === 2) {
      return <Step2 setStep={setStep} />;
    } else if (step === 3) {
      return <Step3 setStep={setStep} />;
    } else {
      return null;
    }
  };

  return (
    <div className="pt-4">
      <div
        className="h-svh w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/loginbg.svg')" }}
      >
        <div className="flex flex-col gap-4 items-center justify-center h-[40rem]">
          <img src="/holdingstickprob.svg" alt="" className="w-64 mr-32" />
          <h2 className="text-2xl font-bold text-teal-500">
            Connect Your Device
          </h2>
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
