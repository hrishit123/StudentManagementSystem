import React from 'react'

const AdminNavBar = () => {
  return (
    <div className='navbar'>
        <a href='/adminStatus' className='navbar-links'>Student Records</a>
       <a href='/registerStudent' className='navbar-links'>Register New Student</a>
    </div>
  )
}

export default AdminNavBar