import React from 'react'
import './Navbar.css'

import logo from '../../images/logo_scuola_vettoriale.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="/autogestione" className="logo">
        <img src={logo} alt="" />
      </a>

      {/* <div className="navbar__links"></div> */}
      <div className="hamburger">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </div>
  )
}

export default Navbar