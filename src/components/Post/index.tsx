import React from "react";
import { PostType } from "../../types";
import * as S from './style';
import Author from "./Author";

type Props = {
  post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {

  return (
    <S.Content>
      <Author author={post.author} created={post.created} updated={post.updated} />
      {post.title && <S.Title>{post.title}</S.Title>}
      <S.MainText>{post.content}</S.MainText>
    </S.Content>
  );
}

export default Post;