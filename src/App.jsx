
import { GoogleLogin } from '@react-oauth/google';
import {useEffect} from 'react'
import { jwtDecode } from "jwt-decode";

const clientId = "1087249134170-gnjvrh4am3fv61d3o329iostlvcj04b1.apps.googleusercontent.com"

function App() {

  // useEffect(() => {
  //   function start(){
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   }

  //   gapi.load("client:auth2", start)
  // })

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default App;
