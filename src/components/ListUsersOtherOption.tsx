"use client";
import { getUsers } from "@/app/services/Users";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { User } from "@/app/services/Types";
import PostByUser from "./PostUser";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

type Props = {
  setCurrentUserIdPostShow: Dispatch<SetStateAction<number | null>>;
  currentUserIdPostShow: number | null;
};
export default function ListUsersOtherOptions({
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
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {users.map((user) => {
            return (
              <AccordionItem value={`item-${user.id}`} key={user.id}>
                <AccordionTrigger
                  onClick={() => setCurrentUserIdPostShow(user.id)}
                >
                  <Card
                    key={user.id}
                    className="mb-4 p-4 w-full hover:cursor-pointer hover:bg-gray-100"
                    style={{
                      backgroundColor:
                        user.id === currentUserIdPostShow ? "#e0e0e0" : "white",
                    }}
                  >
                    <CardHeader>
                      <h2 className="text-lg font-semibold">{user.name}</h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Email: {user.email}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-600">
                        Phone: {user.phone}
                      </p>
                    </CardFooter>
                  </Card>
                </AccordionTrigger>
                <AccordionContent>
                  <PostByUser idUser={user.id} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
