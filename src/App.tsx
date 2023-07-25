import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Header from "./components/Header";
import Posts from "./components/Posts";
import { PostType } from "./types";
import api from "./api/baseQuery";
import { WEBSOCKET_URL } from "./consts";
import { addNewPost, updatePost } from "./utils";
import * as S from './style';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    api.get("/api/posts").then(({ data }) => {
      if (data && data.posts.length) setPosts(data.posts);
    });
  }, []);

  // WebSocket event handler
  const handleWebSocketMessage = (event: { data: string }) => {
    const data = JSON.parse(event.data);
    const { type, data: postsData } = data;

    switch (type) {
      case 'added':
        setPosts((state) => [...state, postsData]);
        break;
      case 'changed':
        setPosts((state) =>
          state.map((post) => (post.id === postsData.id ? postsData : post))
        );
        break;
      case 'deletedId':
        setPosts((state) => state.filter((post) => post.id !== postsData));
        break;
      default:
        break;
    }
  };

  // Function to send mock data every 10 seconds
  const sendMockData = () => {
    const addPost = addNewPost();
    const changedMessage = updatePost(addPost);
    const deletedId = posts[posts.length - 1]?.id; // Delete the last message's ID

    // Simulate server-side events by dispatching them with mock data
    handleWebSocketMessage({ data: JSON.stringify({ type: 'added', data: addPost }) });
    setTimeout(() => {
      handleWebSocketMessage({data: JSON.stringify({type: 'changed', data: changedMessage})});
    }, 5000);
    setTimeout(() => {
      handleWebSocketMessage({data: JSON.stringify({type: 'deletedId', data: deletedId })});
    }, 7000);
  };

  // Send mock data every 5 seconds
  useEffect(() => {
    const interval = setInterval(sendMockData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [posts]);

  const { readyState } = useWebSocket(WEBSOCKET_URL, {
    onMessage: handleWebSocketMessage,
  });

  return (
    <S.Wrapper>
      <Header header={'Welcome to the blog'} />
      <S.Content>
        {readyState === ReadyState.OPEN ? (
          <Posts posts={posts} />
        ) : (
          <div>Loading...</div>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default App;
