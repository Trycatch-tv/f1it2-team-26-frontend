import React from 'react'
import './Navbar.css'

const Navbar = ({isBtnCreateVisible,isBtnEditVisible, changeShowForm}) => {
  return (
    <div className='navbar-container'>
    <h1 className='navbar-title'>
        Mob
    </h1>
    <div className='btn-container'>
        {isBtnCreateVisible && (
            <button className='btn-create' onClick={changeShowForm}>Create</button>
        )}
        {isBtnEditVisible && (
            <button className='btn-edit'>Edit</button>
        )}
    </div>
    </div>
  )
}

export default Navbar