import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Importing your components
import Home from "./components/pageComponents/HomePage/home-page.tsx";
import Header from './components/sectionComponents/header.tsx';
import Footer from './components/sectionComponents/footer.tsx';
import Login from './components/pageComponents/loginPage/loginPage.tsx';
import Register from './components/pageComponents/RegisterPage/RegisterPage.tsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
