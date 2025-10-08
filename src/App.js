import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/pageComponents/HomePage/home-page";
import Header from "./components/sectionComponents/header";
import Footer from "./components/sectionComponents/footer";
import WeNeedPage from "./components/pageComponents/WeNeedPage/WeNeedPage";
import AdminWeNeedPage from "./components/pageComponents/AdminWeNeed/AdminWeNeedPage";
import AboutPage from "./components/pageComponents/AboutPage/AboutPage";
import FAQsPage from "./components/pageComponents/FAQsPage/FAQsPage";


function App() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isStaffUser =
    !!user &&
    (user.role === "staff" ||
      user.role === "admin" ||
      user.is_staff === true ||
      user.isModerator === true);

  const NotAuthorizedPlaceholder = () => (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: 8 }}>Admins only</h2>
      <p>
        You don’t have access to this page yet. Please contact an admin or try again
        with a staff account.
      </p>
      <p style={{ marginTop: 16 }}>
        {/* TODO: replace this with a redirect or a dedicated “Not authorized” page later */}
      </p>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <div className="header">
          <Header />
        </div>

        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/weneed" element={<WeNeedPage />} />
            <Route
              path="/admin/weneed"
              element={isStaffUser ? <AdminWeNeedPage /> : <NotAuthorizedPlaceholder />}
            />
            <Route path="/faqs" element={<FAQsPage />} />
          </Routes>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
