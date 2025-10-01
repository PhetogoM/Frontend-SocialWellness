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

// Section components
import Header from "./components/sectionComponents/header.js";
import SiteHeader from "./components/sectionComponents/SiteHeader.js";
import Footer from "./components/sectionComponents/footer.js";

// Page components
import HomePage from "./components/pageComponents/HomePage/home-page.js";
import LoginPage from "./components/pageComponents/AuthPage/LoginPage.js";  
import RegisterPage from "./components/pageComponents/AuthPage/RegisterPage.js";
import AboutPage from "./components/pageComponents/AboutPage/AboutPage.js";
import MyCulturePage from "./components/pageComponents/MyCulturePage/MyCulturePage.js";
import MyCulturePageStaff from "./components/pageComponents/MyCulturePage/MyCulturePageStaff.js";
import CampusMapPage from "./components/pageComponents/CampusMapPage/CampusMapPage.js";
import CommunicationSkillsPage from "./components/pageComponents/CommunicationSkillsPage/CommunicationSkillsPage.js"; 

//import ProtectedRoute from "./components/ProtectedRoute.js";
import { AppWrapper } from "./components/pageComponents/AppWrapper.styled.js";

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

      // userData.is_staff = true; // Uncomment to test staff view
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

  const isStaffUser =
    user && (user.role === "staff" || user.is_staff || user.isModerator);

  return (
    <AppWrapper>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />}/>
          <Route path="/communicationskills" element={<CommunicationSkillsPage  />}/>
          <Route path="/about" element={<AboutPage />} /> {/*for testing purposes to skip login part*/}

          {/* MyCulture page (staff vs student) */}
          <Route
            path="/myculture"
            element={
              isStaffUser ? (
                <MyCulturePageStaff user={user} />
              ) : (
                <MyCulturePage user={user} />
              )
            }
          />

          {/* ✅ New Campus Map page */}
          <Route path="/campusmap" element={<CampusMapPage />} />
        </Routes>
      </Layout>
    </AppWrapper>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
