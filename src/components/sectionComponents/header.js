import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #5fae8a; /* light blue */
  color: white;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Left side: Logo + title */
const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* spacing between logo and title */
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`;

/* Center navigation */
const NavLinks = styled.nav`
  position: absolute;   
  left: 50%;
  gap: 20px;
  transform: translateX(-50%);
  display: flex;
`;

/* Styled hyperlink links using React Router Link */
const NavLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;

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
      <LogoTitle>
        <NavLink to="/">
          <Logo src="image/path-to-logo.png" alt="UniPath Logo" />
        </NavLink>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>UniPath: Social Wellness</h1>
      </LogoTitle>

      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </NavLinks>

      <HeaderButtons>
        <HeaderButton to="/login">Login</HeaderButton>
        <HeaderButton to="/register">Register</HeaderButton>
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default Header;