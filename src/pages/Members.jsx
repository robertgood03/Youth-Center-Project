import React, { useState } from 'react'

function Members() {
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', age: 14, program: 'Sports League' },
    { id: 2, name: 'Jane Smith', age: 12, program: 'Arts & Crafts' },
    { id: 3, name: 'Mike Johnson', age: 16, program: 'Leadership Workshop' },
  ])

  return (
    <div className="members">
      <h1>Members</h1>
      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Program</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.age}</td>
                <td>{member.program}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Members
