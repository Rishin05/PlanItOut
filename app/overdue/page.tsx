"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/utils/types";
import { filteredTasks, overdueTasks } from "@/utils/utilities";
import Filters from "../Components/filters/Filters";
import TaskItem from "../Components/taskItem/TaskItem";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { openModelForAdd, priority , tasks, setPriority} = useTasks();

  const overdue = overdueTasks(tasks);
  
  const filtered = filteredTasks(overdue, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">OverDue Tasks</h1>
        <Filters />
      </div>

      <motion.div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
      variants={container}
      initial="hidden"
      animate="visible">
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
        hover:border-none hover:text-gray-600 hover:bg-[#EEE4E1] transition duration-200 ease-in-out" onClick={openModelForAdd}
        variants={item}
        >Add New Task</motion.button>
      </motion.div>
    </main>
  );
}
