"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import IconGrid from "@/public/icons/IconGrid";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconCheck from "@/public/icons/IconCheck";
import IconStopwatch from "@/public/icons/IconStopwatch";
import IconDeleteAll from "@/public/icons/IconDeleteAll";

function MiniSidebar() {
  const pathname = usePathname();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#A7492A" : "#120C4B";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#F6F5EF]">
      <div className="flex items-center justify-center h-[5rem]">
        <Image src="/logo.png" width={40} height={40} alt="logo" />
      </div>
      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>

              <span className="u-triangle absolute top-0 translate-y-[50%] left-8 text-xs pointer-events-none text-white bg-[#A7492A] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-[1.5rem]">
          <button className="w-12 h-12 flex items-center justify-center bg-[#F6F5EF] rounded-full shadow-lg">
            <IconDeleteAll strokeColor="#120C4B" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
