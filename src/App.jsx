import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Members from './pages/Members'
import Events from './pages/Events'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
