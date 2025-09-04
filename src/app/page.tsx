"use client";
import { useState } from "react";
import { getUsers } from "./services/Users";

import ListUsers from "@/components/ListUsers";
import PostUser from "@/components/PostUser";
import PostByUser from "@/components/PostsByUserChart";
import PostsByUserChart from "@/components/PostsByUserChart";
import ListUsersOtherOptions from "@/components/ListUsersOtherOption";

export default function Home() {
  const [currentUserIdPostShow, setCurrentUserIdPostShow] = useState<
    number | null
  >(null);

  return (
    <div className="font-sans  py-20  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold shadow w-full p-4 rounded mb-10 bg-purple-600 text-white">
        User List Json place holder
      </h1>
      <div className="w-full">
        <ListUsersOtherOptions
          setCurrentUserIdPostShow={setCurrentUserIdPostShow}
          currentUserIdPostShow={currentUserIdPostShow}
        />
      </div>

      {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <span className="font-semibold  text-lg">Users</span>
          <ListUsers
            setCurrentUserIdPostShow={setCurrentUserIdPostShow}
            currentUserIdPostShow={currentUserIdPostShow}
          />
         
        </div>

        <div>
          <span className="font-semibold  text-lg">Posts</span>
          {currentUserIdPostShow && <PostUser idUser={currentUserIdPostShow} />}
        </div>
      </div> */}

      <div className="w-full">
        <PostsByUserChart />
      </div>
      <div className="py-20">
        <span className="text-sm text-gray-500">
          Created by Your Name - Kenyi Alcantara
          <a href="https://github.com/yourusername" target="_blank">
            Your GitHub
          </a>
        </span>
      </div>
    </div>
  );
}
