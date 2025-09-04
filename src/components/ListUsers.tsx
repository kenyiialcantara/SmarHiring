"use client";
import { getUsers } from "@/app/services/Users";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { User } from "@/app/services/Types";
import { Input } from "./ui/input";

type Props = {
  setCurrentUserIdPostShow: Dispatch<SetStateAction<number | null>>;
  currentUserIdPostShow: number | null;
};
export default function ListUsers({
  setCurrentUserIdPostShow,
  currentUserIdPostShow,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [userFiltered, setUserFiltered] = useState<User[]>([]);

  const loadUsers = async () => {
    const response = await getUsers();
    return response;
  };

  useEffect(() => {
    loadUsers().then((data) => {
      setUsers(data);
    });

    return () => {
      console.log("Cleanup");
    };
  }, []);

  const handleFilterByUserName = (name: string) => {
    if (name === "") {
      setUsers(userFiltered);
      return;
    }
    if (userFiltered.length === 0) {
      setUserFiltered(users);
    }

    const filtered = userFiltered.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <div>
      <div>Filter by name</div>
      <Input onChange={(e) => handleFilterByUserName(e.target.value)} />

      <div className="mt-4 ">
        {users.map((user) => (
          <Card
            key={user.id}
            className="mb-4 p-4 w-96 hover:cursor-pointer hover:bg-gray-100"
            onClick={() => setCurrentUserIdPostShow(user.id)}
            style={{
              backgroundColor:
                user.id === currentUserIdPostShow ? "#e0e0e0" : "white",
            }}
          >
            <CardHeader>
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Phone: {user.phone}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
