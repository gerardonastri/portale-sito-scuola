import React, {useEffect, useRef, useState} from 'react'
import './Navbar.css'

import logo from '../../images/logo_scuola_vettoriale.svg'

const Navbar = ({type = "normal"}) => {


  const [isActive, setIsActive] = useState(false)


  const changeBg = () => {
    if(window.scrollY >= 100){
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  window.addEventListener("scroll", changeBg)

  return (
    <div className={isActive ? `navbar active ${type !== "normal" && "secondType"}` : `navbar ${type !== "normal" && "secondType"}`}>
      <a href="/autogestione" className="logo">
        <img src={logo} alt="" />
      </a>

      <div className="navbar__links">
        <a href="/">Home</a>
        <a href="/">Contact</a>
        <a href="/">About</a>
        <a href="/">Blog</a>
      </div>
      <div className="hamburger">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </div>
  )
}

export default Navbar