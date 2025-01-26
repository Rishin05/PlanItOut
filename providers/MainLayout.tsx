"use client";

import Model from "@/app/Components/model/Model";
import ProfileModel from "@/app/Components/Profile/ProfileModel";
import { useTasks } from "@/context/taskContext";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const {isEditing, profileModel} = useTasks();
  return <div className=" main-layout flex-1 bg-[#E2BDC5] border-2 border-white rounded-[1.5rem] overflow-auto">
    { isEditing && <Model />}
    {profileModel && <ProfileModel />}
    {children}</div>;
}

export default MainLayout;
