"use client";

import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUserContext();
    const { pendingTasks, openModelForAdd} = useTasks();

  const { name } = user;

  const userId = user._id;

  return (
    <header className="px-6 my-4 w-full flex itmes-center justify-between bg-[#F6F5EF]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to PlanItOut"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have {""}
              <span className="font-bold text-[#A7492A]">{pendingTasks.length}</span> active tasks
            </>
          ) : (
            "Please login to see your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-[#A7492A] text-white rounded-[50px] shadow-lg hover:bg-[#8F3D1D] hover:text-white transition-all duration-200 ease-in-out"
          onClick={openModelForAdd}
        >
          Create a new Task
        </button>
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/Rishin05"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] flex items-center justify-center border-[#ffffff] rounded-full shadow-lg text-lg border-2"
          >
            {github}
          </Link>
          <Link
            href="https://github.com/Rishin05"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] flex items-center justify-center border-[#ffffff] rounded-full shadow-lg text-lg border-2"
          >
            {moon}
          </Link>
          <Link
            href="https://github.com/Rishin05"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] flex items-center justify-center border-[#ffffff] rounded-full shadow-lg text-lg border-2"
          >
            {profile}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
