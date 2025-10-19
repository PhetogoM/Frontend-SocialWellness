import React, { useState, useEffect, useCallback } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import "./App.css";

// Section Components
import Header from "./components/sectionComponents/header.js";
import SiteHeader from "./components/sectionComponents/SiteHeader.js";
import Footer from "./components/sectionComponents/footer.js";

// Authentication pages
import HomePage from "./components/pageComponents/HomePage/home-page.js";
import LoginPage from "./components/pageComponents/AuthPage/LoginPage.js";
import RegisterPage from "./components/pageComponents/AuthPage/RegisterPage.js";

// Page components
import AboutPage from "./components/pageComponents/AboutPage/AboutPage.js";
import WeNeedPage from "./components/pageComponents/WeNeedPage/WeNeedPage.js";
import AdminWeNeedPage from "./components/pageComponents/AdminWeNeed/AdminWeNeedPage.js";
import CommunicationSkillsPage from './components/pageComponents/CommunicationSkillsPage/CommunicationSkillsPage.js';
import MyCulturePageUser from './components/pageComponents/MyCulturePage/MyCulturePage.js';
import MyCultureModeratorPage from "./components/pageComponents/MyCultureModeratorPage/MyCultureModeratorPage.js";
import CampusMapPage from './components/pageComponents/CampusMapPage/CampusMapPage.js';
import SocialChatBox from "./components/pageComponents/SocialChatboxPage/SocialChatboxPage.js";

import { AppWrapper } from "./components/pageComponents/AppWrapper.styled.js";
import { HelmetProvider } from "react-helmet-async";

// Import authAPI
import { authAPI } from "./components/apiComponents/authApi.js";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Only Route Component
const PublicOnlyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Homepage directing
function Layout({ children, user, onLogout }) {
  const location = useLocation();

  const isLoggedIn = Boolean(user);
  
  // FIXED: Only show SiteHeader when user is logged in AND not on login/register pages
  const showSimpleHeader = !isLoggedIn || location.pathname === "/login" || location.pathname === "/register";

  const backgroundClass =
    location.pathname === "/" || !user ? "with-background" : "light-scale-gray-background";

  return (
    <>
      {showSimpleHeader ? (
        <Header />
      ) : (
        <SiteHeader user={user} onLogout={onLogout} />
      )}
      <main className={`AppBody ${backgroundClass}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  // Enhanced auth check with token refresh - wrapped in useCallback
  const checkAuth = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      
      if (!storedUser || !accessToken) {
        setLoading(false);
        return;
      }

      // Verify the token is still valid by making a simple API call
      try {
        const userData = await authAPI.getUser();
        setUser(userData);
      } catch (error) {
        if (error.response?.status === 401 && refreshToken) {
          // Token expired, try to refresh
          try {
            await authAPI.refreshToken();
            // If refresh successful, get user data again
            const userData = await authAPI.getUser();
            setUser(userData);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            handleLogout();
          }
        } else {
          // Other error or no refresh token available
          handleLogout();
        }
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <AppWrapper>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Loading...</div>
        </div>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Public only routes */}
          <Route 
            path="/login" 
            element={
              <PublicOnlyRoute>
                <LoginPage setUser={setUser} />
              </PublicOnlyRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicOnlyRoute>
                <RegisterPage setUser={setUser} />
              </PublicOnlyRoute>
            } 
          />
          
          {/* PUBLIC routes - accessible to everyone (logged in or out) */}
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected authenticated routes - only logged in users can access */}
          <Route 
            path="/communicationskills" 
            element={
              <ProtectedRoute>
                <CommunicationSkillsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/socialchatbox" 
            element={
              <ProtectedRoute>
                <SocialChatBox setUser={setUser} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/myculture" 
            element={
              <ProtectedRoute>
                <MyCulturePageUser setUser={setUser} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/campusmap" 
            element={
              <ProtectedRoute>
                <CampusMapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/weneed" 
            element={
              <ProtectedRoute>
                <WeNeedPage />
              </ProtectedRoute>
            } 
          />
          
          {/* ADMIN ONLY routes - only users with role="admin" can access */}
          <Route 
            path="/myculturemoderatorpage" 
            element={
              <ProtectedRoute requiredRoles={["admin"]}>
                <MyCultureModeratorPage setUser={setUser} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminweneed" 
            element={
              <ProtectedRoute requiredRoles={["admin"]}>
                <AdminWeNeedPage />
              </ProtectedRoute>
            } 
          />
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