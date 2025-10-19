import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #5fae8a;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* allows wrapping on smaller screens */
  position: relative;
`;

/* Left side: Logo + title */
const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;

  @media (min-width: 769px) {
    width: 64px;
    height: 64px;
  }
`;

/* Hamburger button for mobile */
const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

/* Center navigation */
const NavLinks = styled.nav`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    display: ${(props) => (props.open ? "flex" : "none")};
    background-color: #5fae8a;
    padding: 10px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
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
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
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

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <LogoTitle>
        <NavLink to="/">
          <Logo src="image/path-to-logo.png" alt="UniPath Logo" />
        </NavLink>
        <h1 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>UniPath: Social Wellness</h1>
      </LogoTitle>

      {/* Hamburger button visible on small screens */}
      <Hamburger onClick={() => setMenuOpen((prev) => !prev)}>☰</Hamburger>

      <NavLinks open={menuOpen}>
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