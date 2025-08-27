import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


// Importing your components
import Home from "./components/pageComponents/HomePage/home-page";
import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';
import Login from './components/pageComponents/loginPage/loginPage';
import Register from './components/pageComponents/RegisterPage/RegisterPage';

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
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
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
