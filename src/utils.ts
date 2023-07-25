import { PostType } from "./types";

const NEW_POST = {
  author: {
    name: "Katerina Doe",
  },
  title: "That's the new post",
  content: "This is the new post's content"
}

export const addNewPost = () => {
  return {
    id: Math.floor(Math.random() * 10000),
    created: Date.now(), // Use a timestamp as the ID for simplicity
    ...NEW_POST,
  };
};

export const updatePost = (post: PostType) => {
  return {
    ...post,
    update: Date.now(), // Use a timestamp as the ID for simplicity
    content: 'Wow! Something new here!',
  };
}

