import React, { Component } from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import LoginContainer from './containers/LoginContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';


class App extends Component{
    constructor(){
        super();
        //set default state for app load

        //isLoggedIn: displays the dashboard instead of login, if true
        //displayLoginDetails: toggles rendering of the login popup box
        //displaySignupDetails: toggles rendering of the signup form box
        //loginFailed: displays 'error: failed to log in' if true

        this.defaultState = {
            isLoggedIn: true,
            username: null,
            displayLoginDetails: false,
            displaySignupDetails: false,
            loginFailed: false,
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
            this.setState({displayLoginDetails: false, loginFailed: false});
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

        //test case for user log in
        if (submittedInfo.username === 'hello' && submittedInfo.password === 'world'){
            console.log('updating state')
            return this.setState({isLoggedIn: true, loginFailed: false, username: submittedInfo.username})
        } else {
            return this.setState({loginFailed: true})
        }

            // //Checking to see if username is in the database
            // fetch('http://localhost:3000/user',{
            //     method:'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(submittedInfo)
                
            // }
            // .then()//if response from server is true...
            // .catch((error) => {
            //     console.log('log-in-error:', error);
            // }))
            
            //NOW,
            //when we receive a response back from our post request
            //we can update state here and render the page differently
            //check res.locals.validLogin, if true, update state, then based on state
            //render:
            //  a <DashboardContainer /> instead of a <LoginContainer />
            //if the username/password was correct
    }

    submitSignup(usernameText, passwordText, ageText, heightText, sexText, weightText, event){
        event.preventDefault();
        //MACRO CALCULATIONS DEPENDING ON USER'S FORM INFO

          // BMR Male = 66 + (6.3 x body weight in lbs.) + (12.9 x height in inches) - (6.8 x age in years)
          // BMR Female = 655 + (4.3 x weight in lbs.) + (4.7 x height in inches) - (4.7 x age in years)

          //***Calorie-Calculation = BMR x 1.55 ***/ (AVG ACTIVITY)

          //***Carbohydrates       =  Calorie / 4   ***/
          //***Protein             =  Calorie / 4   ***/
          //***Fats                =  Calorie / 9   ***/

        const submittedInfo = {username: usernameText.current.value, 
                               password: passwordText.current.value,
                               age: ageText.current.value,
                               weight: weightText.current.value,
                               height: heightText.current.value,
                               sex: sexText.current.value}

            console.log(submittedInfo.username + ' ' + submittedInfo.password + ' ' + submittedInfo.age + ' ' + 
                submittedInfo.weight + ' ' + submittedInfo.height+ ' ' + submittedInfo.sex)

        //include goal-macros?    
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedInfo),
        })
        .then((data)=>{

        })
    }

    render(){
        // this.state.isLoggedIn is false, render the LoginContainer
            //dashcontainer will have props of users-data

       
        return(
            <div>
                {this.state.isLoggedIn ? 
                <DashboardContainer 
                    username = {this.state.username}
                />//if true, dashboard
                :
                <LoginContainer                   
                    loginDetails = {this.loginDetails}
                    displayLoginDetails = {this.state.displayLoginDetails}
                    submitLogin = {this.submitLogin}
                    loginFailed = {this.state.loginFailed}
                    signupDetails = {this.signupDetails}
                    displaySignupDetails = {this.state.displaySignupDetails}
                    submitSignup = {this.submitSignup}
                />

                }
            </div>
        )
    }
}

export default App;