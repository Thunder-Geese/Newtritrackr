import React, { Component } from "react";

class SignupDetails extends Component {
  render() {
    let usernameText = React.createRef();
    let passwordText = React.createRef();
    let ageText = React.createRef();
    let heightText = React.createRef();
    let sexText = React.createRef();
    let weightText = React.createRef();

    return (
      <div className='loginWrapper'>
        <div className='transparentBg'></div>
        <div className='signupDetails'>
          <button
            onClick={() => this.props.signupDetails()}
            className='closeDetails'
          >
            X
          </button>
          <div className='inputWrapper'>
            <div className='loginTextLarge'>Create Your Account:</div>
            <form
              onSubmit={(event) =>
                this.props.submitSignup(
                  usernameText,
                  passwordText,
                  ageText,
                  heightText,
                  sexText,
                  weightText,
                  event
                )
              }
              autoComplete='off'
            >
              <div className='loginText'>Please input a username.</div>
              <input
                ref={usernameText}
                type='username'
                placeholder='username'
                className='loginInput'
              ></input>
              <div className='loginText'>Please input a password.</div>
              <input
                ref={passwordText}
                type='password'
                placeholder='password'
                className='loginInput'
              ></input>
              <div className='loginText'>Please input your age.</div>
              <input
                ref={ageText}
                type='age'
                placeholder='age in years'
                className='loginInput'
              ></input>
              <div className='loginText'>
                Please input your height in inches.
              </div>
              <input
                ref={heightText}
                type='height'
                placeholder='height in inches'
                className='loginInput'
              ></input>
              <div className='loginText'>
                Please input your weight in pounds.
              </div>
              <input
                ref={weightText}
                type='weight'
                placeholder='weight in lb'
                className='loginInput'
              ></input>
              <div className='loginText'>Please input your sex.</div>
              <input
                ref={sexText}
                type='sex'
                placeholder='M or F'
                className='loginInput'
              ></input>
              <button type='submit' value='Log In' className='buttonLoginPage'>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupDetails;
