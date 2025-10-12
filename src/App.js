// src/App.js
import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/sectionComponents/header.js";
import SiteHeader from "./components/sectionComponents/SiteHeader.js";
import Footer from "./components/sectionComponents/footer.js";
import HomePage from "./components/pageComponents/HomePage/home-page.js";
import LoginPage from "./components/pageComponents/AuthPage/LoginPage.js";
import RegisterPage from "./components/pageComponents/AuthPage/RegisterPage.js";
import AboutPage from "./components/pageComponents/AboutPage/AboutPage.js";
import WeNeedPage from "./components/pageComponents/WeNeedPage/WeNeedPage.js";
import AdminWeNeedPage from "./components/pageComponents/AdminWeNeed/AdminWeNeedPage.js";
import CommunicationSkillsPage from './components/pageComponents/CommunicationSkillsPage/CommunicationSkillsPage.js';
import SocialChatbox from './components/pageComponents/SocialChatboxesPage/SocialChatboxPage.js';
import MyCulturePageUser from './components/pageComponents/MyCulturePage/MyCulturePage.js';
import CampusMapPage from './components/pageComponents/CampusMapPage/CampusMapPage.js';

import { AppWrapper } from "./components/pageComponents/AppWrapper.styled.js";
import { HelmetProvider } from "react-helmet-async";

function Layout({ children, user, onLogout }) {
  const location = useLocation();
  const simpleHeaderPaths = ["/", "/login", "/register"];
  const useSimpleHeader = simpleHeaderPaths.includes(location.pathname);
  const backgroundClass = simpleHeaderPaths.includes(location.pathname)
    ? "with-background"
    : "no-background";

  return (
    <>
      {useSimpleHeader ? (
        <Header />
      ) : (
        <SiteHeader user={user} onLogout={onLogout} />
      )}
      <main className={`AppBody ${backgroundClass}`}>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppWrapper>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/communicationskills" element={<CommunicationSkillsPage />} />
          <Route path="/socialchatbox" element={<SocialChatbox setUser={setUser}/>} />
          <Route path="/myculture" element={<MyCulturePageUser setUser={setUser} />} />
          <Route path="/campusmap" element={<CampusMapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/weneed" element={<WeNeedPage />} />
          <Route path="/adminweneed" element={<AdminWeNeedPage />} />
        </Routes>
      </Layout>
    </AppWrapper>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  );
}
