import { BellDot } from "lucide-react";
import React from "react";
const BreadCrumb = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-teal-500/10 p-2 rounded-xl m-2">
        <div>
          <h2 className="font-bold text-teal-800">Dashboard</h2>
      
        </div>
        <div className="flex gap-4">
          <div className="bg-white flex items-center  p-2 px-3 border-2 border-black/08 w-fit rounded-full">
            <BellDot className="fill-gray-500 text-gray-500" />
          </div>
          <div className="bg-white flex items-center gap-4 p-2 border-2 border-black/08 w-fit rounded-full">
            <img
              src="bg.png"
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
            <h2 className="text-gray-500 text-sm">John Doe</h2>
          </div>
        </div>
      </div>
    </>
  );
};
const Page = () => {
  return (
    <div className="pt-4">
      <BreadCrumb />

      <div className="h-[122rem]  sm:h-[40rem] md:mx-4  md:h-[37rem] lg:h-[68rem]  w-full  bg-cover bg-center bg-no-repeat bg-[url('/xs_dashboard.svg')] sm:bg-[url('/sm_dashboard.svg')] md:bg-[url('/dashboard.svg')] ">
        
      </div>
    </div>
  );
};

export default Page;
