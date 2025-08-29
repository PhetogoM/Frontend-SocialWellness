import styled from "styled-components";

// Container for the whole page
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* adjust as needed */
  background: url('/image/hero-bg.png') no-repeat center center;
  background-size: cover;
`;

// Rounded heading container with overlay
export const HeadingContainer = styled.div`
  background-color: rgba(0,0,0,0.5); /* semi-transparent overlay */
  padding: 40px 60px;
  border-radius: 20px;
  text-align: center;
  color: white;
`;

// Main heading
export const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 15px 0;
`;

// Subtitle
export const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
`;
