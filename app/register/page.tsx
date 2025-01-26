"use client";

import React, { useEffect, useState } from "react";
import RegisterForm from "../Components/auth/RegisterForm/RegisterForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function Page() {
    const [isClient, setIsClient] = useState(false);
    const {user} = useUserContext();
    const router = useRouter();
  
    useEffect(() => {
      setIsClient(true);
      if(user && user._id) {
        router.push("/");
      }
    }, [user, router]);
  
    if(!isClient || (user && user._id)) {
      return null;
    }

    return (
        <div className="auth-page w-full h-full flex justify-center items-center">
            <RegisterForm />
        </div>
    );
}

export default Page;