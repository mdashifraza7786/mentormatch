import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Matchmake from './pages/Matchmake';
import ProfileSetUp from './pages/ProfileSetUp';
import Register from './pages/Register';
import UserDiscovery from './pages/UserDiscovery';
import About from './pages/About';
import Mentee from './pages/Mentee';
import Mentor from './pages/Mentor';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/match" element={<Matchmake />} /> */}
          <Route path='/mentees' element={<Mentee/>}/>
          <Route path='/mentors' element={<Mentor/>}/>
          <Route path="/profile" element={<ProfileSetUp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdiscovery" element={<UserDiscovery />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
