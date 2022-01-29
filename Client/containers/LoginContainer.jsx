import React, { Component } from 'react';
import LoginBox from '../components/LoginBox.jsx'
import LoginDetails from '../components/LoginDetails.jsx'
import SignupDetails from '../components/SignupDetails.jsx'

class LoginContainer extends Component{

    render(){
        return(
            <div className = "loginContainer">

                <LoginBox
                    loginDetails = {this.props.loginDetails}
                />

                {//display the loginDetails popup box 
                this.props.displayLoginDetails ? 
                <LoginDetails 
                    loginDetails = {this.props.loginDetails}
                    submitLogin = {this.props.submitLogin}
                /> 
                : null
                }

                {/* {//display the loginDetails popup box 
                this.props.displaySignupDetails ? 
                <SignupDetails
                    signupDetails = {this.props.signupDetails}
                    submitSignup = {this.props.submitSignup}
                /> 
                : null
                } */}


            </div>
        )

                        }
}


export default LoginContainer;