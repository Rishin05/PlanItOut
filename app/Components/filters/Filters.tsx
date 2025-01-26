import { useTasks } from "@/context/taskContext";
import React from "react";

function filters() {
  const { priority, setPriority } = useTasks();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const priorities = ["All", "High", "Medium", "Low"];
  return (
    <div className="relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F6F5EF] border-2 border-white rounded-md">
      <span
        className="absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300"
        style={{
          width: "calc(100% / 4 - 10px)",
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}
      ></span>
      {priorities.map((priority, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveIndex(index);
            setPriority(priority.toLowerCase());
          }}
          className={`${
            activeIndex === index ? "text-[#8F3D1D]" : "text-gray-500"
          } relative px-1 z-10 font-medium text-sm`}
        >
          {priority}
        </button>
      ))}
    </div>
  );
}

export default filters;
