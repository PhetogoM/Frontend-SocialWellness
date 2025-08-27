import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #60a5fa; /* light blue */
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Button container */
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

/* Styled button links */
const HeaderButton = styled(Link)`
  background-color: white;
  color: #3b82f6;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background-color: #e0f2fe;
  }
`;

const Header: FC = () => {
  return (
    <HeaderContainer>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Unipath: Social Wellness</h1>
      <HeaderButtons>
        <HeaderButton to="/">Home</HeaderButton>
        <HeaderButton to="/login">Login</HeaderButton>
        <HeaderButton to="/register">Register</HeaderButton>
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default Header;
