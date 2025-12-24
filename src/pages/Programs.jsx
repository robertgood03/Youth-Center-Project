import React from 'react'

function Programs() {
  const programs = [
    { id: 1, name: 'After School Tutoring', description: 'Academic support for students', schedule: 'Mon-Fri, 3-6 PM' },
    { id: 2, name: 'Sports League', description: 'Basketball, soccer, and more', schedule: 'Saturdays, 9 AM-12 PM' },
    { id: 3, name: 'Arts & Crafts', description: 'Creative expression through art', schedule: 'Wednesdays, 4-6 PM' },
    { id: 4, name: 'Leadership Workshop', description: 'Building future leaders', schedule: 'Fridays, 5-7 PM' },
  ]

  return (
    <div className="programs">
      <h1>Our Programs</h1>
      <div className="programs-grid">
        {programs.map(program => (
          <div key={program.id} className="program-card">
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <span className="schedule">{program.schedule}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Programs
