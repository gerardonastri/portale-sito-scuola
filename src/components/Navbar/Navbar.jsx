import React, {useEffect, useRef, useState} from 'react'
import './Navbar.css'

import {useDispatch, useSelector} from 'react-redux'

import logo from '../../images/logo_scuola_vettoriale.svg'

import { logout } from '../../redux/userRedux'

const Navbar = ({type = "normal"}) => {

  const dispatch = useDispatch()
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

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <div className={isActive || showLinks ? `navbar active ${type !== "normal" && "secondType"}` : `navbar ${type !== "normal" && "secondType"}`}>
      <a href="/autogestione" className="logo">
        <img src={logo} alt="" />
      </a>

      <div className={showLinks ? "navbar__links show" : "navbar__links"}>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/iscrizioni">Iscrizioni</a>
        {(user?.isAdmin || user?.organizzatore) && (
          <a href="/manage">Corsi</a>
        )}
        {(user?.isAdmin) && (
          <a href="/admin">Admin</a>
        )}
        <button onClick={handleLogout}>Logout</button>
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