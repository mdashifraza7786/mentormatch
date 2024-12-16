import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Matchmake from './pages/Matchmake';
import ProfileSetUp from './pages/ProfileSetUp';
import Register from './pages/Register';
import UserDiscovery from './pages/UserDiscovery';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/match" element={<Matchmake />} />
          <Route path="/profile" element={<ProfileSetUp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdiscovery" element={<UserDiscovery />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
