import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/sectionComponents/header.js";
import Footer from "./components/sectionComponents/footer.js";
import HomePage from "./components/pageComponents/HomePage/home-page.js";
import LoginPage from "./components/pageComponents/loginPage/loginPage.js";
import RegisterPage from "./components/pageComponents/RegisterPage/RegisterPage.js";
import AboutPage from "./components/pageComponents/AboutPage/AboutPage.js"
import FAQsPage from "./components/pageComponents/FAQsPage/FAQsPage.js";

import { AppWrapper } from "./components/pageComponents/AppWrapper.styled.js";

function App() {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/FAQs" element={<FAQsPage />} />
          </Routes>
        </main>
        <Footer />
      </AppWrapper>
    </Router>
  );
 } 
 
 export default App;