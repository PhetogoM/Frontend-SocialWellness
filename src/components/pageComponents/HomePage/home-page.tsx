import React, { FC } from "react";
import { HomepageContainer, Main, WelcomeText, Footer } from "./HomePage.styled";
import Header from "../../sectionComponents/Header"; // Use the new header

const HomePage: FC = () => {
  return (
    <HomepageContainer>
      {/* Main header */}
      <Header />

      {/* Main welcome content */}
      <Main>
        <WelcomeText>Welcome to Unipath</WelcomeText>
      </Main>

      {/* Footer */}
      <Footer>
        &copy; {new Date().getFullYear()} Unipath. All Rights Reserved.
      </Footer>
    </HomepageContainer>
  );
};

export default HomePage;
