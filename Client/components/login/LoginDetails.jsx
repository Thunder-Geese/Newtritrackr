import React, { Component } from 'react';

class LoginDetails extends Component {
  render() {
    let usernameText = React.createRef();
    let passwordText = React.createRef();

    return (
      <div className='loginWrapper'>
        <div className='transparentBg'></div>
        <div className='loginDetails'>
          <button onClick={() => this.props.loginDetails()} className='closeDetails'>X</button>
          <div className='inputWrapper'>
            <div className='loginTextLarge'>Please Log In:</div>
            <div className='whiteSpace'></div><div className='whiteSpace'></div>
            <form onSubmit={(event) => this.props.submitLogin(usernameText, passwordText, event)} autoComplete='off' className='loginForm'>
              <input ref={usernameText} placeholder='username' className='loginInput'></input>
              <input ref={passwordText} type='password' placeholder='password' className='loginInput'></input>
              {this.props.loginFailed ? <div className='loginFailed'>Error: incorrect username or password.</div> : <div className='whiteSpace'></div>}
              <button type='submit' value='Log In' className='buttonLoginPage'>Log In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default LoginDetails;