import React, { Component } from 'react';

class LoginDetails extends Component{
    render(){
        let usernameText = React.createRef();
        let passwordText = React.createRef();

        return(
            <div className = "loginDetails">
                <button onClick={()=>this.props.loginDetails()}>X</button>
                <form onSubmit={(event)=> this.props.submitLogin(usernameText, passwordText, event)} autoComplete='off'>
                    <div><input ref={usernameText} placeholder='username'></input></div>
                    <div><input ref={passwordText} type='password' placeholder='password'></input></div>
                    <div><button type='submit' value='Log In'>Log In</button></div>
                </form>
            </div>
        )
    }

}

export default LoginDetails;