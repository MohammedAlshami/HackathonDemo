import React from "react";

interface Bubble {
  label: string;
  value: number; // Percentage or relative size
  color: string; // Circle color
}

const bubbles: Bubble[] = [
  { label: "Unripe", value: 80, color: "#6F6AF8" },
  { label: "Ripe", value: 60, color: "#39C0ED" },
  { label: "Over-Ripe", value: 40, color: "#F7A94A" },
];

const BubbleChart: React.FC = () => {
  // Scale factor to adjust bubble sizes
  const sizeFactor = 5;

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute flex items-center justify-center rounded-full text-white font-bold text-center"
          style={{
            width: `${bubble.value * sizeFactor}px`,
            height: `${bubble.value * sizeFactor}px`,
            backgroundColor: bubble.color,
            top: `${50 + index * 20}px`,
            left: `${50 + index * 50}px`,
          }}
        >
          <div>
            <p className="text-2xl">{bubble.value}%</p>
            <p className="text-sm">{bubble.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BubbleChart;
