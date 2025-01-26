"use client";

import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { overdueTasks } from "@/utils/utilities";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  const {tasks, completedTasks, pendingTasks} = useTasks();
  const overdue = overdueTasks(tasks);

  return (
    <div className="m-6">
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E2BDC5]/40 rounded-[0.8rem]
      hover:bg-[#E2BDC5]/70 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
      >
        <div>
          <Image
            src={user?.photo}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="flex flex-col text-xl">
            <span className="font-medium">Hello,</span>
            <span className="font-bold">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="`mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-500">
            <p>Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] rounded-[5px] bg-[#A7492A]"></span>
              <span className="font-medium text-4xl text-[#333]">{tasks.length}</span>
            </p>
          </div>
          <div className="text-gray-500">
            <p>In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] rounded-[5px] bg-[#13E06B]"></span>
              <span className="font-medium text-4xl text-[#333]">{pendingTasks.length}</span>
            </p>
          </div>
          <div className="text-gray-500">
            <p>Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] rounded-[5px] bg-[#2F3CE2]"></span>
              <span className="font-medium text-4xl text-[#333]">{completedTasks.length}</span>
            </p>
          </div>
          <div className="text-gray-500">
            <p>Overdue Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] rounded-[5px] bg-[#FF004F]"></span>
              <span className="font-medium text-4xl text-[#333]">{overdue.length}</span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-8 font-medium">Activity</h3>
    </div>
  );
}

export default Profile;
