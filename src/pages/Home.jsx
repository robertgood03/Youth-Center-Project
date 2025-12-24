import React from 'react'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to the Youth Center</h1>
        <p>Empowering young people through programs, activities, and community</p>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>Programs</h3>
          <p>Explore our diverse range of educational and recreational programs</p>
        </div>
        <div className="feature-card">
          <h3>Events</h3>
          <p>Stay updated with upcoming events and activities</p>
        </div>
        <div className="feature-card">
          <h3>Community</h3>
          <p>Join our growing community of young leaders</p>
        </div>
      </section>
    </div>
  )
}

export default Home
