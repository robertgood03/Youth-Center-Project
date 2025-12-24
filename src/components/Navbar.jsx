import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Youth Center</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/members">Members</Link></li>
        <li><Link to="/events">Events</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
