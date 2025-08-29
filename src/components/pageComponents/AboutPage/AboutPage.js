import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
  color: #333;
`;

const AboutPage = () => {
  return (
    <PageContainer>
      Here is the About page
    </PageContainer>
  );
};

export default AboutPage;
