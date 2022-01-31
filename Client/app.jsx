import React, { Component } from 'react';
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
            displayAddMealDetails: false,
            loginFailed: false,
        }

        this.state = this.defaultState;
        this.loginDetails = this.loginDetails.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
        this.signupDetails = this.signupDetails.bind(this);
        this.addMealDetails = this.addMealDetails.bind(this);
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

    addMealDetails(){
        if (!this.state.displayAddMealDetails){
            this.setState({displayAddMealDetails: true});
        } else {
            this.setState({displayAddMealDetails: false});
        }
    }

    submitLogin(usernameText, passwordText, event){
        event.preventDefault();
        const submittedInfo = {username: usernameText.current.value, 
                               password: passwordText.current.value}
            fetch('/user', {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(submittedInfo)
            })
            .then(data => data.json())
            .then(data =>{
                if (data.info.validLogin){
                    return this.setState({isLoggedIn: true, loginFailed: false, username: submittedInfo.username})
                } else {
                    return this.setState({loginFailed: true})
                }
                
            })
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
        fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedInfo),
        })
        .then(data=>data.json())
        .then(data=>{
            if (data.info.validSignup){
                return this.setState({isLoggedIn: true, loginFailed: false, username: submittedInfo.username})
            } else {
                return this.setState({isLoggedIn: false})
            }
        })
    }

    render(){

        return(
            <div>
                {this.state.isLoggedIn ? 
                <DashboardContainer 
                    username={this.state.username}
                    addMealDetails={this.addMealDetails}
                    displayAddMealDetails={this.state.displayAddMealDetails}
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