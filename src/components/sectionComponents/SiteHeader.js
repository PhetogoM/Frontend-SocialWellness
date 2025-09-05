import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #5fae8a; /* calm green */
  color: white;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Left section: logo + site title */
const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* space between logo and text */
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

/* Nav links container */
const NavLinks = styled.nav`
  display: flex;
  gap: 0; /* tightly packed like Twitter */
  flex: 1;
  margin-left: 40px;
`;

/* Link styled like Twitter header */
const NavLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 15px;
  border-bottom: ${props => (props.active ? "3px solid white" : "3px solid transparent")};
  transition: border 0.2s;

  &:hover {
    border-bottom: 3px solid #d4f1e2;
  }
`;

/* Right buttons (profile, logout, etc.) */
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

/* Profile icon */
const ProfileButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
`;

const SiteHeader = () => {
  const location = useLocation(); // get current route

  const PAGES = [
    { path: "/myculture", label: "MyCulture" },
    { path: "/whatsdifference", label: "WhatsTheDifference" },
    { path: "/communicationskills", label: "Communication Skills" },
    { path: "/eisenhower", label: "Two-Week Planner" },
    { path: "/maps", label: "Google Maps" },
    { path: "/socialchat", label: "Social Chatboxes" },
    { path: "/weneed", label: "WeNeed" },
  ];

  return (
    <HeaderContainer>
      <LogoTitle>
        <Logo src="image/path-to-logo.png" alt="UniPath Logo" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>UniPath</h1>
      </LogoTitle>

      <NavLinks>
        {PAGES.map(p => (
          <NavLink
            key={p.path}
            to={p.path}
            active={location.pathname === p.path ? 1 : 0}
          >
            {p.label}
          </NavLink>
        ))}
      </NavLinks>

      <HeaderButtons>
        <ProfileButton>👤</ProfileButton>
        {/* You can expand profile dropdown or logout later */}
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default SiteHeader;
