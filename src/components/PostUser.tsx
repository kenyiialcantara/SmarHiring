"use client";
import { PostUser as Post } from "@/app/services/Types";
import { getPostUser } from "@/app/services/Users";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";

type Props = {
  idUser: number;
};
export default function PostUser({ idUser }: Props) {
  const [loading, setLoading] = useState(false);

  const [userPost, setUserPost] = useState<Post[]>([]);
  const loadPostUser = async (id: number) => {
    setLoading(true);
    const response = await getPostUser(id);
    setUserPost(response);
    setLoading(false);
  };
  useEffect(() => {
    loadPostUser(idUser);
  }, [idUser]);

  useEffect(() => {
    console.log("userPost", userPost);
  }, [userPost]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {userPost.length > 0 ? (
        userPost.map((post) => (
          <Card key={post.id} className="mb-4 p-4 w-96">
            <h3 className="font-semibold text-md mb-2">{post.title}</h3>
            <p className="text-sm text-gray-700">{post.body}</p>
          </Card>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
