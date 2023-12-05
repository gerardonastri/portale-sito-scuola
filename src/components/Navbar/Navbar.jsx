import React, {useEffect, useRef, useState} from 'react'
import './Navbar.css'

import {useSelector} from 'react-redux'

import logo from '../../images/logo_scuola_vettoriale.svg'

const Navbar = ({type = "normal"}) => {


  const [isActive, setIsActive] = useState(false)
  const [showLinks, setShowLinks] = useState(false)

  const {user} = useSelector(state => state.currentUser)


  const changeBg = () => {
    if(window.scrollY >= 100){
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  window.addEventListener("scroll", changeBg)

  return (
    <div className={isActive || showLinks ? `navbar active ${type !== "normal" && "secondType"}` : `navbar ${type !== "normal" && "secondType"}`}>
      <a href="/autogestione" className="logo">
        <img src={logo} alt="" />
      </a>

      <div className={showLinks ? "navbar__links show" : "navbar__links"}>
        <a href="/">Home</a>
        <a href="/">Contact</a>
        <a href="/">About</a>
        {(user?.isAdmin || user?.isOrganizzatore) && (
          <a href="/manage">Corsi</a>
        )}
        {(user?.isAdmin) && (
          <a href="/admin">Admin</a>
        )}
      </div>
      <div className="hamburger" onClick={() => {setShowLinks(prev => !prev)}}>
        <div className={showLinks ? "bar active" : "bar"} />
        <div className={showLinks ? "bar active" : "bar"} />
        <div className={showLinks ? "bar active" : "bar"} />
      </div>
    </div>
  )
}

export default Navbar