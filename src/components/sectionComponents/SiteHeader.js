import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

/* Header container */
const HeaderContainer = styled.header`
  background-color: #5fae8a;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* allow wrapping for smaller screens */
`;

/* Left section: logo + site title */
const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

/* Hamburger menu button */
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

/* Nav links container */
const NavLinks = styled.nav`
  display: flex;
  gap: 0;
  flex: 1;
  margin-left: 40px;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 10px;
  }
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

  @media (max-width: 768px) {
    padding: 10px;
    border-bottom: none;
    width: 100%;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

/* Right section: user info + logout */
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const ProfileName = styled.span`
  font-weight: bold;
`;

const UserRoleBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
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
  const [menuOpen, setMenuOpen] = useState(false);

  const ALL_PAGES = [
    { path: "/myculture", label: "My Culture" },
    { path: "/communicationskills", label: "Communication Skills" },
    { path: "/campusmap", label: "Campus Map" },
    { path: "/socialchatbox", label: "Social Chatbox" },
    { path: "/myculturemoderatorpage", label: "Moderator Panel", roles: ["admin"] },
    { path: "/weneed", label: "We Need" },
    { path: "/adminweneed", label: "We Need Submissions", roles: ["admin"] },
  ];

  const getVisiblePages = () => {
    if (!user) return ALL_PAGES.filter((page) => !page.roles);
    const userRole = user.role || "first_year";
    return ALL_PAGES.filter(
      (page) => !page.roles || page.roles.includes(userRole)
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <HeaderContainer>
      <LogoTitle>
        <Link to="/">
          <Logo src="image/path-to-logo.png" alt="UniPath Logo" />
        </Link>
        <h1 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>UniPath</h1>
      </LogoTitle>

      {/* Hamburger (mobile only) */}
      <Hamburger onClick={() => setMenuOpen((prev) => !prev)}>
        ☰
      </Hamburger>

      <NavLinks open={menuOpen}>
        {visiblePages.map((p) => (
          <NavLink
            key={p.path}
            to={p.path}
            active={location.pathname === p.path ? 1 : 0}
            onClick={() => setMenuOpen(false)} // close menu after click
          >
            {p.label}
          </NavLink>
        ))}
      </NavLinks>

      <HeaderButtons>
        {user && (
          <>
            <ProfileName>👤 {user.name || user.email}</ProfileName>
            <UserRoleBadge>{user.role}</UserRoleBadge>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </>
        )}
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default SiteHeader;