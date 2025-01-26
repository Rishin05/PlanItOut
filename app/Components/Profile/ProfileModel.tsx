"use client";

import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import { badge, check, github, mail } from "@/utils/Icons";
import Image from "next/image";
import React from "react";

function ProfileModel() {
    const ref = React.useRef(null);
    const { closeModel } = useTasks();
    const { user, updateUser, handleUserInput, userState, changePassword } =
        useUserContext();

    useDetectOutside({
        ref,
        callback: () => {
            closeModel();
        },
    });

    const { name, email, photo } = user;

    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handlePassword = (type: string) => (e: any) => {
        if (type === "old") {
            setOldPassword(e.target.value);
        } else {
            setNewPassword(e.target.value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            // You can also upload the file to the server here
        }
    };

    const handleImageClick = () => {
        document.getElementById("fileInput")?.click();
    };

    return (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
            <div
                className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
                ref={ref}
            >
                <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md"></div>
                <div className="mt-4 relative flex justify-between">
                    <div className="relative inline-block" onClick={handleImageClick}>
                        <Image
                            src={photo}
                            alt="avatar"
                            width={80}
                            height={80}
                            className="rounded-full cursor-pointer"
                        />
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <div className="absolute bottom-0 right-1 shadow-sm">
                            <span className="text-lg text-blue-400">{badge}</span>
                            <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                                {check}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold">{name}</h1>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
                <form
                    action=""
                    className="mt-4 pt-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateUser(e, {
                            name: userState.name,
                            email: userState.email,
                            photo: selectedFile ? URL.createObjectURL(selectedFile) : photo,
                        });
                        closeModel();
                    }}
                >
                    <div className="pt-2 grid grid-cols-[150px_1fr]">
                        <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={name}
                            onChange={(e) => handleUserInput("name")(e)}
                            className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                        />
                    </div>

                    <div className="pt-4 grid grid-cols-[150px_1fr] border-t-2 border-t-[#323232]/10">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => handleUserInput("email")(e)}
                                className="w-full py-[0.4rem] pl-9 pr-2 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                            <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 text-[#323232]/50">
                                {mail}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="oldPassWord" className="text-sm font-medium">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                value={oldPassword}
                                onChange={handlePassword("old")}
                                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={handlePassword("new")}
                                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="py-3 px-4 bg-blue-500 text-white text-sm font-medium rounded-md
                            hover:bg-blue-400 transition-all duration-300"
                            onClick={() => {
                                changePassword(oldPassword, newPassword);
                                closeModel();
                            }}
                        >
                            Change Password
                        </button>
                    </div>

                    <div className="flex justify-end gap-4 border-t-2 border-t-[#323232]/10 pt-4">
                        <button
                            type="button"
                            className="py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                            hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300"
                            onClick={closeModel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-[#3aafae] text-white text-sm font-medium rounded-md
                            hover:bg-[#2e8d8c]/90 transition-all duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileModel;
