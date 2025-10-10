import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #5fae8a; /* calm green */
  color: white;
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Left section: logo + site title */
const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`;

/* Nav links container */
const NavLinks = styled.nav`
  display: flex;
  gap: 0;
  flex: 1;
  margin-left: 40px;
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 15px;
  border-bottom: ${(props) =>
    props.active ? "3px solid white" : "3px solid transparent"};
  transition: border 0.2s;

  &:hover {
    border-bottom: 3px solid #d4f1e2;
  }
`;

/* Right section: user info + logout */
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ProfileName = styled.span`
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SiteHeader = ({ user, onLogout }) => {
  const location = useLocation();

  const PAGES = [
    { path: "/about", label: "About" },
    { path: "/myculture", label: "My Culture" },
    { path: "/communicationskills", label: "Communication Skills" },
    { path: "/campusmap", label: "Campus Map" },   
    { path: "/socialchatbox", label: "Social Chatbox" }, 
    
    { path: "/weneed", label: "We Need" },
    { path: "/moderator", label: "Moderator Panel" }, 
    { path: "/adminweneed", label: "We Need Submissions" },
  ];

  return (
    <HeaderContainer>
      <LogoTitle>
        <Link to="/">
          <Logo src="image/path-to-logo.png" alt="UniPath Logo" />
        </Link>
        <h1 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>UniPath</h1>
      </LogoTitle>

      <NavLinks>
        {PAGES.map((p) => (
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
        {user && <ProfileName>👤 {user.first_name || user.email}</ProfileName>}
        {user && <LogoutButton onClick={onLogout}>Logout</LogoutButton>}
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default SiteHeader;
