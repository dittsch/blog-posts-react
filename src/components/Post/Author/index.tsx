import React from "react";
import {Avatar} from "antd";
import { AuthorType } from "../../../types";
import * as S from './style';

type Props = {
  author: AuthorType;
  created: number;
  updated?: number;
}

const Author: React.FC<Props> = ({ author, created, updated }) => {
  const showDate = new Intl.DateTimeFormat('no-NO', {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(updated || created);

  return (
    <S.Wrapper>
      <Avatar src={author.avatar} shape={'circle'}>{author.name[0]}</Avatar>
      <S.NameWrapper>
        <div>{author.name}</div>
        <div>{showDate}</div>
      </S.NameWrapper>
    </S.Wrapper>
  );
}

export default Author;