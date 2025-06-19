import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Input from "./pages/input";

// Layout dengan Navbar
const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Semua page dengan Navbar */}
        <Route path="/" element={<LayoutWithNavbar><Homepage /></LayoutWithNavbar>} />
        <Route path="/input" element={<LayoutWithNavbar><Input /></LayoutWithNavbar>} />
      </Routes>
    </Router>
  );
};

export default App;
