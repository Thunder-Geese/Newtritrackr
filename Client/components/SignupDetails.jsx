import React, { Component } from 'react';

class SignupDetails extends Component{
    render(){
        let usernameText = React.createRef();
        let passwordText = React.createRef();
        let ageText = React.createRef();
        let heightText = React.createRef();
        let sexText = React.createRef();
        let weightText = React.createRef();
        
            return(
              <div className = "signupDetails">
                <button onClick={()=>this.props.signupDetails()}>X</button>
                <form onSubmit={(event)=> this.props.submitSignup(usernameText, passwordText, ageText, heightText, sexText, weightText, event)} autoComplete='off'>
                    <div><input ref={usernameText} type='username' placeholder='username:'></input></div>
                    <div><input ref={passwordText} type='password' placeholder='password:'></input></div>
                    <div><input ref={ageText} type='age' placeholder='age:'></input></div>
                    <div><input ref={heightText} type='height' placeholder='height:'></input></div>
                    <div><input ref={sexText} type='sex' placeholder='sex:'></input></div>
                    <div><input ref={weightText} type='weight' placeholder='weight:'></input></div>
                    <div><button type='submit' value='Log In'>Create Account</button></div>
                </form>
              </div>
            )
    }
}

export default SignupDetails;