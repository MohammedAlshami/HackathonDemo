import { Palmtree } from "lucide-react";
import React from "react";

interface YieldItemProps {
    number: number;
    ammount: string;
}
const YieldItem = ({ number, ammount }: YieldItemProps) => {
    return (
        <div className="flex justify-between py-2">
            <div className="flex gap-4 items-center">
                <div className="p-2 border-2 border-black/10 w-fit rounded-full">
                    <Palmtree className="fill-teal-500 text-teal-500" />
                </div>
                <h2>Block {number}</h2>
            </div>
            <h2 className="text-gray-500"> {ammount}</h2>
        </div>
    );
};
const YieldedBlocks = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div>
                <h2 className="font-bold">Most Yielded Block</h2>
                <p className="text-gray-500">Adipiscing elit, sed do eiusmod tempor </p>
            </div>

            <div className="flex flex-col gap-4 divide-y">
                <YieldItem number={1} ammount="MYR 45,000" />
                <YieldItem number={2} ammount="MYR 30,000" />
                <YieldItem number={3} ammount="MYR 25,000" />
                <YieldItem number={4} ammount="MYR 20,000" />
            </div>
        </div>
    );
};

export default YieldedBlocks;
