import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PageViewTracker from "./analytics/PageViewTracker";

// Importing your components
import Home from "./components/pageComponents/home-page";
import Header from "./components/sectionComponents/header";
import Footer from "./components/sectionComponents/footer";

function App() {
  return (
    <Router>
      {/* Mount once so GA fires a page_view whenever the route changes */}
      <PageViewTracker />

      <div className="App">
        <div className="header">
          <Header />
        </div>

        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* add more routes as needed, e.g.:
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            */}
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
