import React, { Component } from 'react';
import LoginDetails from './LoginDetails.jsx';
import SignupDetails from './SignupDetails.jsx';

class LoginBox extends Component{
    render(){
        return(
            <div className = "loginBox">
                <div className="logo">Logo Here</div>
                <button onClick = {()=>this.props.loginDetails()}>Log In</button>
                <button onClick = {()=>this.props.signupDetails()}>Sign-Up</button>
                
            </div>
        )
    }
}

export default LoginBox;