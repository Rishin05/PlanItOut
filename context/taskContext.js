import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const TasksProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000/api/v1";

  const userId = useUserContext().user._id;
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});

  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTask, setActiveTask] = React.useState(null);
  const [modelMode, setModelMode] = React.useState("");
  const [priority, setPriority] = React.useState("all");
  const [profileModel, setProfileModel] = React.useState(false);

  const openModelForAdd = () => {
    setModelMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModelForEdit = (task) => {
    setModelMode("edit");
    setIsEditing(true);
    setTask(task);
    setActiveTask(task);
  };

  const openProfileModel = () => {
    setProfileModel(true);
  }

  const closeModel = () => {
    setIsEditing(false);
    setProfileModel(false);
    setModelMode("");
    setActiveTask(null);
    setTask({});
  }

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks", error);
    }
    setLoading(false);
  };

  const getTask = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${id}`);
      setTask(response.data);
    } catch (error) {
      console.log("Error fetching task", error);
    }
    setLoading(false);
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/task/create`, task);
      toast.success("Task created successfully");
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.log("Error creating task", error);
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${serverUrl}/task/${task._id}`, task);
      // Update the task in the tasks array
      const newTasks = tasks.map((t) => {
        return t._id === response.data._id ? response.data : t;
      });
      toast.success("Task updated successfully");
      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task", error);
    }
    setLoading(false);
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);
      // Remove the task from the tasks array
      const newTasks = tasks.filter((t) => t._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      console.log("Error deleting task", error);
    }
    setLoading(false);
  };

  const handleInput = (name) => (e) => {
    if(name === "setTask"){
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  }

  const completedTasks = tasks.filter((task) => task.completed);

  const pendingTasks = tasks.filter((task) => !task.completed);


  useEffect(() => {
    getTasks();
  }, [userId]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModelForAdd,
        openModelForEdit,
        activeTask,
        closeModel,
        modelMode,
        completedTasks,
        pendingTasks,
        openProfileModel,
        profileModel
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TaskContext);
};
