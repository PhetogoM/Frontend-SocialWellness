import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Importing components
import Header from "./components/sectionComponents/header.tsx";
import Footer from "./components/sectionComponents/footer.tsx";
import HomePage from "./components/pageComponents/HomePage/home-page.tsx";
import LoginPage from "./components/pageComponents/loginPage/loginPage.tsx";
import RegisterPage from "./components/pageComponents/RegisterPage/RegisterPage.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
