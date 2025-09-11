import React from "react";
import { PageContainer, HeadingContainer, MainTitle, SubTitle } from "./HomePage.styled.js";

const HomePage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <MainTitle>Welcome to UniPath</MainTitle>
        <SubTitle>Your pathway to success</SubTitle>
      </HeadingContainer>
    </PageContainer>
  );
};

export default HomePage;
