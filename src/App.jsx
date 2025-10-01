import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import MyCulturePage from './pages/CulturePage';

// Importing your components
//import Home from "./components/pageComponents/home-page";
import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';
import CulturePage from './components/sectionComponents/CulturePage';
 

function App() {
  return (
      <Router>

        <div className="App">
          <div className="header">
            <Header />
          </div>

          <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/culture" element={<CulturePage />} />
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
