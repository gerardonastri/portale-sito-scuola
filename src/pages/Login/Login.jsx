import React from 'react'
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import {useDispatch} from 'react-redux'
import { loginSuccess, logout } from '../../redux/userRedux';
import {axiosReq} from '../../utils/apiCalls'


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
    <GoogleLogin
      onSuccess={credentialResponse => {
        const decoded = jwtDecode(credentialResponse.credential);
        handleLogin(decoded)
      }}
      onError={(error) => {
        console.log(error);
      }}
    />
  )
}

export default Login