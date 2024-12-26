import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateComponent from './components/PrivateComponent';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import ProfileSetUp from './pages/ProfileSetUp';
import Register from './pages/Register';
import About from './pages/About';
import Mentee from './pages/Mentee';
import Mentor from './pages/Mentor';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/mentees' element={<Mentee />} />
          <Route path='/mentors' element={<Mentor />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          <Route element={<PrivateComponent />}>
            <Route path="/profile" element={<ProfileSetUp />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
