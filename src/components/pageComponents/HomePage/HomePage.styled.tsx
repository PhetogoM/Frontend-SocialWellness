import styled from "styled-components";

// Wrapper for full page
export const HomePageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb; // light gray
`;

// Header nav
export const Header = styled.nav`
  background: #4f46e5; // indigo-600
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

// Header links as rounded buttons
export const NavButton = styled.a`
  background-color: #6366f1; // indigo-500
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s all;

  &:hover {
    background-color: #4f46e5;
  }
`;

// Bubble card for welcome message
export const WelcomeBubble = styled.div`
  background: white;
  padding: 2rem 3rem;
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
  margin: 2rem auto;
`;

// Footer (optional)
export const Footer = styled.footer`
  margin-top: auto;
  background: #e5e7eb; // gray-200
  padding: 1rem 2rem;
  text-align: center;
`;
