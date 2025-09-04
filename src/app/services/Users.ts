import { PostUser, User } from "./Types";

const URL = "http://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  try {
    const response = await fetch(URL);
    const data = (await response.json()) as User[];
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getPostUser = async (id: number) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    const data = (await response.json()) as PostUser[];
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    const data = (await response.json()) as PostUser[];
    console.log("data service", data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
