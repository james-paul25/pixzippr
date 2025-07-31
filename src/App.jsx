import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Upload from './pages/Upload';
import FeedbackWidget from './components/ui/FeedbackWidget';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
        <FeedbackWidget />
      </main>

      <Footer />
    </div>
  );
}

export default App;
