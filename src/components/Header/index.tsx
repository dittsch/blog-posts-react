import React from "react";

type Props = {
  header: string;
}

const Header: React.FC<Props> = ({ header }) => {

  return (
    <header>
      <h1>{header}</h1>
    </header>
  );
}

export default Header;