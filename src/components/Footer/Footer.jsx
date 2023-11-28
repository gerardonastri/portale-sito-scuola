import React from 'react'
import './Footer.css'

import logo from '../../images/logo_scuola_vettoriale.svg'

import {FaInstagram} from 'react-icons/fa'
import {FaFacebookF} from 'react-icons/fa'
import {FaXTwitter} from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__up">
        <div className="wrapper">
          <div className="footer__item">
            <img src={logo} alt="" />
          </div>

          <div className="footer__item">
            <h3>info</h3>
            <div className="footer__item-links">
              <a href="/">Chi siamo?</a>
              <a href="/">about us</a>
              <a href="/">la scuola</a>
            </div>
          </div>

          <div className="footer__item">
            <h3>contatti</h3>
            <div className="footer__item-links">
              <a href="mailto:gerardonastri.dev@gmail.com">gerardonastri.dev@gmail.com</a>
              <a href="mailto:derosasaba06@gmail.com">derosasaba06@gmail.com</a>
            </div>
          </div>

          <div className="footer__item">
            <h3>social</h3>
            <div className="footer__item-social">
              <a href="/"><FaInstagram /></a>
              <a href="/"><FaFacebookF /></a>
              <a href="/"><FaXTwitter /></a>
            </div>  
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="wrapper">
          <p><b>developed by:</b> gerardo nastri</p>
          <p><b>designed by:</b> sabatino de rosa</p>
        </div>
      </div>
    </div>
  )
}

export default Footer