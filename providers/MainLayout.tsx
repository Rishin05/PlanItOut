"use client";

import Model from "@/app/Components/model/Model";
import { useTasks } from "@/context/taskContext";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const {isEditing} = useTasks();
  return <div className=" main-layout flex-1 bg-[#E2BDC5] border-2 border-white rounded-[1.5rem] overflow-auto">
    { isEditing && <Model />}
    {children}</div>;
}

export default MainLayout;
