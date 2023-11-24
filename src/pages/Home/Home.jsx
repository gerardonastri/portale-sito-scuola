import React from 'react'
import './Home.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const clientId = "52946809134-dqfc0cvfd2ik9dvo74ik1pe4i2j870cn.apps.googleusercontent.com"

const Home = () => {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
      }}
      onError={(error) => {
        console.log(error);
      }}
    />
  )
}

export default Home