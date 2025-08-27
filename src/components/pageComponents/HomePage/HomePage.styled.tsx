import styled from "styled-components";

/* Container for the whole page */
export const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f3f4f6; /* light gray background */
`;

/* Main section */
export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center; /* horizontal center */
  align-items: center;     /* vertical center */
`;

/* Welcome text */
export const WelcomeText = styled.h1`
  font-size: 5rem;           /* very large */
  color: #3b82f6;           /* blue */
  text-align: center;
  margin: 0;
  font-weight: bold;
`;
