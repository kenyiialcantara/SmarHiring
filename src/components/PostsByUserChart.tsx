"use client";

import { getPosts } from "@/app/services/Users";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend } from "./ui/chart";
import { Card, CardHeader } from "./ui/card";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
export default function PostsByUserChart() {
  const [posts, setPosts] = useState<any>(null);

  const [numberPostByUsers, setNumberPostByUsers] = useState<
    { idUser: number; count: number }[]
  >([]);

  const handleCalculateNumberPostByUsers = (posts: any[]) => {
    const countMap: { [key: number]: number } = {};
    posts.forEach((post) => {
      countMap[post.userId] = (countMap[post.userId] || 0) + 1;
    });
    const result = Object.entries(countMap).map(([idUser, count]) => ({
      idUser: Number(idUser),
      count,
    }));
    setNumberPostByUsers(result);
  };

  const loadPosts = async () => {
    const response = await getPosts();
    // setPosts(response);
    handleCalculateNumberPostByUsers(response);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    console.log("post 📮 ", posts);
  }, [posts]);

  return (
    <Card className=" w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Posts by User</h2>
        </div>
      </CardHeader>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={numberPostByUsers}
          width={500}
          height={300}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="idUser" />
          <YAxis />
          <CartesianGrid vertical={false} />
          <Bar dataKey="userId" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="count" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
