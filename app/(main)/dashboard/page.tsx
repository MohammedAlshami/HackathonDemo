import React from "react";

const Page = () => {
  return (
    <div className="pt-4">
      <div
        className="h-[55rem]	 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/dashboard.png')" }}
      >
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl">Welcome to My Page</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
