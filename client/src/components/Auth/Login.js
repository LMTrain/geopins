import React from "react";
import { GoogleLogin } from 'react-google-login';
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = googleUser => {
    // console.log({ googleUser})
    const idToken = googleUser.getAuthResponse().id_token;
    console.log({ idToken })
  }
  return <GoogleLogin 
  clientId="60379064216-odedg154ipn4rpsns5usfbl8obnpop5g.apps.googleusercontent.com"
  onSuccess={onSuccess}
  isSignedIn={true}
  />
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
