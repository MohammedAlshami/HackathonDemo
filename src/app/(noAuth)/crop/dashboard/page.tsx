import { BellDot } from "lucide-react";
import React from "react";
import { LineChartCallbackExample } from "@/components/charts/LineChartCallbackExample";
import { DonutChartCallbackExample } from "@/components/charts/DonutChartCallbackExample";
import { AreaChartHero } from "@/components/charts/graph";
import BubbleChart from "@/components/charts/BubbleChart";
import YieldedBlocks from "@/components/charts/YieldedBlocks";
import { BarChartHero } from "@/components/charts/BarChartHero";
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
    <div className="">
      {/* <BreadCrumb /> */}
      {/* <div className="w-full flex flex-row justify-between gap-24">
        <AreaChartHero />
       
      </div> */}
      <div className="p-6 pb-24 lg:p-12 flex flex-col gap-12">
        <div className="flex flex-col  md:flex-row justify-between gap-24">
          <div className="w-full">
            <div className="border-2 border-black-600/60 p-4 rounded-lg">
              <YieldedBlocks />
            </div>
          </div>
          <div className="w-full sm:w-4/12">
            <div className="border-2 border-black-600/60 p-4 rounded-lg h-full w-full">
              <DonutChartCallbackExample />
            </div>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row justify-between gap-12">
          <div className="w-full">
            <div className="border-2 border-black-600/60 p-4 rounded-lg">
              <LineChartCallbackExample />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-[122rem]  sm:h-[40rem] md:mx-4  md:h-[37rem] lg:h-[68rem]  w-full  bg-cover bg-center bg-no-repeat bg-[url('/xs_dashboard.svg')] sm:bg-[url('/sm_dashboard.svg')] md:bg-[url('/dashboard.svg')] "></div> */}
    </div>
  );
};

export default Page;
