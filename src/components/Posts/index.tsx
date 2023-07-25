import React from "react";
import { PostType } from "../../types";
import Post from "../Post";
import * as S from "./style";

type Props = {
  posts: PostType[];
}

const Posts: React.FC<Props> = ({posts}) => {

  if (!posts.length) {
    return (
      <S.PostsContainer>
        Nothing to show for now, please come back soon!
      </S.PostsContainer>
    )
  }

  return (
    <S.PostsContainer>
      {posts.map((post) => {
        return (
          <Post key={post.id} post={post}/>
        );
      })}
    </S.PostsContainer>
  );
}

export default Posts;