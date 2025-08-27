import React, { FC } from "react";
import {
  HomepageContainer,
  Header,
  HeaderButtons,
  HeaderButton,
  Main,
  WelcomeText,
  Footer
} from "./HomePage.styled.tsx";

const HomePage: FC = () => {
  return (
    <HomepageContainer>
      <Header>
        <h1>Unipath: Social Wellness</h1>
        <HeaderButtons>
          <HeaderButton to="/">Home</HeaderButton>
          <HeaderButton to="/login">Login</HeaderButton>
          <HeaderButton to="/register">Register</HeaderButton>
        </HeaderButtons>
      </Header>

      <Main>
        <WelcomeText>Welcome to Unipath</WelcomeText>
      </Main>

      <Footer>&copy; {new Date().getFullYear()} Unipath. All Rights Reserved.</Footer>
    </HomepageContainer>
  );
};

export default HomePage;
