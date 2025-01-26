"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import Filters from "../Components/filters/Filters";
import TaskItem from "../Components/taskItem/TaskItem";
import { useEffect } from "react";

export default function Home() {
  useRedirect("/login");

  const { openModelForAdd, priority , completedTasks, setPriority} = useTasks();
  
  const filtered = filteredTasks(completedTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Completed Tasks</h1>
        <Filters />
      </div>

      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
        hover:border-none hover:text-gray-600 hover:bg-[#EEE4E1] transition duration-200 ease-in-out" onClick={openModelForAdd}
        >Add New Task</button>
      </div>
    </main>
  );
}
