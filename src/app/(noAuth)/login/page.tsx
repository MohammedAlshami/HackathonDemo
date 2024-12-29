import React from "react";

const Page = () => {
  return (
    <div className="">
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/loginbg.svg')" }}
      >
        <div className="flex flex-col gap-4 items-center justify-center h-[40rem]">
          <img src="/DRANGUE_Logo.png" alt="" className="w-96" />
          <h2 className="text-5xl text-teal-500 font-bold">Login</h2>
          <div className="w-full max-w-lg flex flex-col gap-4 px-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-2 border-teal-500 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-2 border-teal-500 rounded-lg"
            />
            <a
              className="w-full bg-teal-500 text-white p-2 rounded-lg flex justify-center items-center font-bold"
              href="/crop/home"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
