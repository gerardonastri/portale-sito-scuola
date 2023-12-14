import React, {useState} from 'react'
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import {useDispatch} from 'react-redux'
import { loginSuccess, logout } from '../../redux/userRedux';
import {axiosReq} from '../../utils/apiCalls'

import logo from "../../images/logo_scuola_vettoriale.svg"
import Spinner from '../../components/Spinner/Spinner'

const Login = () => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)


  const handleLogin = async (user) => {
    setIsLoading(true)
    try {
      const res = await axiosReq.post("/auth/login", {
        name: user.name,
        email: user.email
      })
      dispatch(loginSuccess(res.data))
      window.location.replace("/")
      setIsLoading(false)
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
        <Spinner isActive={isLoading} />
        <div className="login__text">
          <h3>Nota bene:</h3>
          <p>l'email che inserisci deve essere quella istituzionale con dominio "@iismargheritahackbaronissi.edu.it"</p>
        </div>
      </div>
    </div>
  )
}

export default Login