import React, { Component } from 'react';
import LoginDetails from './LoginDetails.jsx';
import SignupDetails from './SignupDetails.jsx';


class LoginBox extends Component {

  render() {
    return (
      <div className="loginBox">
        <div className="logo"><img className='logoImg' src="image.png" /></div>
        <div className='loginButtonBox'>
          <div className='loginText'>Welcome back!</div>
          <button onClick={() => this.props.loginDetails()} className='buttonLoginPage'>Log In</button>
          <div className='loginText'>Need an account?</div>
          <button onClick={()=> this.props.signupDetails() } className='buttonLoginPage'>Sign Up</button>
        </div>
      </div>
    )
  }
}

export default LoginBox;
