import styled from "styled-components";

/* Container for full page */
export const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

/* Main content */
export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
`;

/* Welcome title */
export const WelcomeText = styled.h1`
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
