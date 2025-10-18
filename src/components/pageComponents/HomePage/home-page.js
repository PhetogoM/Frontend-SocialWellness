import React from "react";
import { Helmet } from "react-helmet-async";
import { PageContainer, HeadingContainer, MainTitle, SubTitle } from "./HomePage.styled.js";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>UniPath | Your Pathway to Success</title>
        <meta
          name="description"
          content="UniPath helps students plan their academic journey and discover the best routes to career success."
        />
        <meta
          name="keywords"
          content="unipath, university, education, student success, academic planning, learning, career guidance"
        />
        <meta property="og:title" content="UniPath | Your Pathway to Success" />
        <meta
          property="og:description"
          content="Discover how UniPath can guide your academic journey and lead you to success."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/assets/preview.png" />
      </Helmet>

      <PageContainer>
        <HeadingContainer>
          <MainTitle>Welcome to UniPath</MainTitle>
          <SubTitle>Your pathway to success</SubTitle>
        </HeadingContainer>
      </PageContainer>
    </>
  );
};

export default HomePage;
