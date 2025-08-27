import styled from "styled-components";
import { Link } from "react-router-dom";

/* Container for full page */
export const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

/* Header */
export const Header = styled.header`
  background-color: #60a5fa; /* light blue */
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const HeaderButton = styled(Link)`
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

/* Main content */
export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
`;

export const WelcomeText = styled.h2`
  font-size: 4rem;
  color: #3b82f6;
  text-align: center;
  margin: 0;
`;

/* Footer */
export const Footer = styled.footer`
  background-color: #93c5fd; /* medium blue */
  color: white;
  text-align: center;
  padding: 20px;
`;
