import React from 'react'

function Events() {
  const events = [
    { id: 1, title: 'Winter Festival', date: '2025-12-28', description: 'Annual winter celebration with games and activities' },
    { id: 2, title: 'New Year Kickoff', date: '2026-01-05', description: 'Start the new year with goal setting workshops' },
    { id: 3, title: 'Basketball Tournament', date: '2026-01-15', description: 'Inter-community basketball competition' },
    { id: 4, title: 'Art Exhibition', date: '2026-01-25', description: 'Showcase of youth artwork' },
  ]

  return (
    <div className="events">
      <h1>Upcoming Events</h1>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-date">{new Date(event.date).toLocaleDateString()}</div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
