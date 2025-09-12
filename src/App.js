// src/App.js
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "./components/sectionComponents/header.js"; // simple header
import SiteHeader from "./components/sectionComponents/SiteHeader.js"; // full site header
import Footer from "./components/sectionComponents/footer.js";

import HomePage from "./components/pageComponents/HomePage/home-page.js";
import LoginPage from "./components/pageComponents/loginPage/loginPage.js";
import RegisterPage from "./components/pageComponents/RegisterPage/RegisterPage.js";
import AboutPage from "./components/pageComponents/AboutPage/AboutPage.js";
import MyCulturePage from "./components/pageComponents/MyCulturePage/MyCulturePage.js";

import ProtectedRoute from "./components/ProtectedRoute.js";

import { AppWrapper } from "./components/pageComponents/AppWrapper.styled.js";

function Layout({ children, user, onLogout }) {
  const location = useLocation();
  const simpleHeaderPaths = ["/", "/login", "/register"];
  const useSimpleHeader = simpleHeaderPaths.includes(location.pathname);

  return (
    <>
      {useSimpleHeader ? (
        <Header />  // show for login/register/home
      ) : (
        <SiteHeader user={user} onLogout={onLogout} /> // show for main site pages
      )}
      <main className="AppBody">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/about" element={<AboutPage />} />

          {/* MyCulture accessible only if logged in */}
          <Route
            path="/myculture"
            element={
              <ProtectedRoute user={user}>
                <MyCulturePage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AppWrapper>
  );
}

// Wrap App with Router
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
