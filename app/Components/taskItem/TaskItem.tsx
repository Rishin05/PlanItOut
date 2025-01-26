import { useTasks } from "@/context/taskContext";
import { item } from "@/utils/animations";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import { motion } from "framer-motion";
import React from "react";
interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-[#559E83]";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const {getTask, openModelForEdit, deleteTask, modelMode} = useTasks();

  return (
    <motion.div className="h-[16rem] px-4 py-3 flex flex-col gap-4 bg-[#F6F5EF] rounded-md shadow-lg"
    variants={item}>
      <div>
        <h4 className="text-2xl font-bold">{task.title}</h4>
        <p className="text-sm">{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
        </p>
        <div>
          <div className="flex items-center gap-4 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-[#FCCF33]" : "text-gray-400"
              }`}
            >
              {star}
            </button>
            <button className="text-[#2C2C2C]"
            onClick={() => {
              getTask(task._id);
              openModelForEdit(task);
            }}
            >{edit}</button>
            <button className="text-[#2C2C2C]">{trash}</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
