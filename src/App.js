import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Programming from './pages/Programming';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Covid from './pages/Covid';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/covid" element={<Covid />} />
      </Routes>
    </Router>
  );
}

export default App;
