// HomePage.tsx
import React, { FC } from "react";
import { HomepageContainer, Main, WelcomeText } from "./HomePage.styled.tsx";

const HomePage: FC = () => {
  return (
    <HomepageContainer>
      <Main>
        <WelcomeText>Welcome to Unipath</WelcomeText>
      </Main>
    </HomepageContainer>
  );
};

export default HomePage;
