import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/sectionComponents/header.js";
import SiteHeader from "./components/sectionComponents/SiteHeader.js";
import Footer from "./components/sectionComponents/footer.js";
import HomePage from "./components/pageComponents/HomePage/home-page.js";
import LoginPage from "./components/pageComponents/loginPage/loginPage.js";
import RegisterPage from "./components/pageComponents/RegisterPage/RegisterPage.js";
import AboutPage from "./components/pageComponents/AboutPage/AboutPage.js";
import FAQsPage from "./components/pageComponents/FAQsPage/FAQsPage.js";
import MyCulturePage from "./components/pageComponents/MyCulturePage/MyCulturePage.js";

import { AppWrapper } from "./components/pageComponents/AppWrapper.styled.js";

function Layout({ children }) {
  const location = useLocation();
  const noSiteHeaderPaths = ["/", "/login", "/register"];

  const isSimpleHeader = noSiteHeaderPaths.includes(location.pathname);

  return (
    <>
      {isSimpleHeader ? <Header /> : <SiteHeader />}
      <main className="AppBody">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/FAQs" element={<FAQsPage />} />
            <Route path="/myculture" element={<MyCulturePage />} />
            {/* add more future pages here */}
          </Routes>
        </Layout>
      </AppWrapper>
    </Router>
  );
}

export default App;
