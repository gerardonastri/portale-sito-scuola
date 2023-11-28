import React from 'react'
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import {useDispatch} from 'react-redux'
import { loginSuccess, logout } from '../../redux/userRedux';
import {axiosReq} from '../../utils/apiCalls'

import logo from "../../images/logo_scuola_vettoriale.svg"

const Login = () => {

  const dispatch = useDispatch()


  const handleLogin = async (user) => {
    try {
      const res = await axiosReq.post("/auth/login", {
        name: user.name,
        email: user.email
      })
      dispatch(loginSuccess(res.data))
      window.location.replace("/")
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  }

  return (
    <div className="login">
      <div className="wrapper">
        <h1>Accesso</h1>
        <img src={logo} alt="" />
        <div className="login__container">
          <GoogleLogin
            onSuccess={credentialResponse => {
              const decoded = jwtDecode(credentialResponse.credential);
              handleLogin(decoded)
            }}
            onError={(error) => {
              console.log(error);
            }}
          />
        </div>
        <div className="login__text">
          <h3>Nota bene:</h3>
          <p>l'email che inserisci deve essere quella istituzionale con dominio "@iismargheritahackbaronissi.edu.it"</p>
        </div>
      </div>
    </div>
  )
}

export default Login