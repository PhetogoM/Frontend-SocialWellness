import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #5fae8a; /* light blue */
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Center navigation */
const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex: 1;
`;

/* Styled hyperlink links using React Router Link */
const NavLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

/* Right buttons */
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

/* Styled button links */
const HeaderButton = styled(Link)`
  background-color: white;
  color: #5fae8a;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background-color: #e0f2fe;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Unipath: Social Wellness</h1>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/FAQs">FAQs</NavLink>
      </NavLinks>
      <HeaderButtons>
        <HeaderButton to="/login">Login</HeaderButton>
        <HeaderButton to="/register">Register</HeaderButton>
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default Header;
