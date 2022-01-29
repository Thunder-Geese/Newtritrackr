import React, { Component } from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import LoginContainer from './containers/LoginContainer.jsx'


class App extends Component{
    constructor(){
        super();
        //set default state for app load
        this.defaultState = {
            isLoggedIn: false,
            displayLoginDetails: false,
            displaySignupDetails: false,
        }
        this.state = this.defaultState;
        this.loginDetails = this.loginDetails.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.signupDetails = this.signupDetails.bind(this);
    }

    loginDetails(){
        //trigger the login popup box
        if (!this.state.displayLoginDetails){
            this.setState({displayLoginDetails: true});
        } else {
            this.setState({displayLoginDetails: false});
        }
    }

    signupDetails(){
        //trigger the signup popup box
        if (!this.state.displaySignupDetails){
            this.setState({displaySignupDetails: true});
        } else {
            this.setState({displaySignupDetails: false});
        }
    }

    submitLogin(usernameText, passwordText, event){
        event.preventDefault();
        const submittedInfo = {username: usernameText.current.value, 
                               password: passwordText.current.value}
            console.log(submittedInfo.username + ' ' + submittedInfo.password)

        //test case 
        if (submittedInfo.username === 'hello' && submittedInfo.password === 'world'){
            console.log('updating state')
            return this.setState({isLoggedIn: true})
        }
            //submit post request with submittedInfo
            //NOW,
            //when we receive a response back from our post request
            //we can update state here and render the page differently
            //check res.locals.validLogin, if true, update state, then based on state
            //render:
            //  a <DashboardContainer /> instead of a <LoginContainer />
            //if the username/password was correct
    }

    render(){
        //if this.state.isLoggedIn is false, render the LoginContainer
            //when 
            //{this.state.isLoggedIn ? <DashboardContainer /> : <LoginContainer />}

        return(
            <div>
                {this.state.isLoggedIn ? 
                <div>Good job you logged in!</div> 
                :
                <LoginContainer 
                    loginDetails = {this.loginDetails}
                    displayLoginDetails = {this.state.displayLoginDetails}
                    submitLogin = {this.submitLogin}
                    // signupDetails = {this.signupDetails}
                    // displaySignupDetails = {this.state.displaySignupDetails}
                    // submitSignup = {this.submitSignup}
                />

                }
            </div>
        )
    }
}

export default App;