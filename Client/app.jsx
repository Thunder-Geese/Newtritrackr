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
            isLoggedIn: false,
            username: null,
            userId: null,
            displayLoginDetails: false,
            displaySignupDetails: false,
            displayAddMealDetails: false,
            displayMealNamePopup: false,
            loginFailed: false,
            mealName: null,
            ingredientList: [],
            mealArray: [{meal_name: 'No meal data.',
                        protein: 0,
                        carbs: 0,
                        calories: 0,
                        fat: 0       
                    }],
        }

        this.state = this.defaultState;
        this.loginDetails = this.loginDetails.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
        this.signupDetails = this.signupDetails.bind(this);
        this.addMealDetails = this.addMealDetails.bind(this);
        this.mealNamePopup = this.mealNamePopup.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.getMealData = this.getMealData.bind(this);
        this.addMeal = this.addMeal.bind(this);
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
            this.setState({displayAddMealDetails: false, displayMealNamePopup: false});
        }
    }

    mealNamePopup(){
        if (!this.state.displayMealNamePopup){
            this.setState({displayMealNamePopup: true});
        } else {
            this.setState({displayMealNamePopup: false});
        }
    }

    addIngredient(ingredientText, event){
        event.preventDefault();
        let newIngredients = this.state.ingredientList;
        newIngredients.push(ingredientText.current.value);
        ingredientText.current.value = '';
        this.setState({ingredientList: newIngredients})
    }
    
    addMeal(mealName, event) {
        event.preventDefault();

        let ingredientsArray = this.state.ingredientList;
        const submittedInfo = {meal_name: mealName.current.value, ingredients: ingredientsArray, user_id: this.state.userId}
        fetch('/meal/add', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(submittedInfo)
        })
        .then(data => data.json())
        .then(data =>{
            return this.setState({displayMealNamePopup: false, displayAddMealDetails: false, mealArray: data, ingredientList: []})
        })
        
        
    }
    
    
    getMealData(){
        const submittedInfo = {user_id: this.state.userId}
            
            fetch('/meal', {
                 method: 'POST',
                 headers: {
                    'Content-type': 'application/json'
                 },
                 body: JSON.stringify(submittedInfo)
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({mealArray: data})
                })
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
                    console.log(data.info.userID)
                    return this.setState({isLoggedIn: true, loginFailed: false, username: submittedInfo.username, userId: data.info.userID})
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
            if (data.info.validLogin){
                return this.setState({isLoggedIn: true, loginFailed: false, username: submittedInfo.username, userId: data.info.userID})
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
                    userId={this.state.userId}
                    getMealData={this.getMealData}
                    addMealDetails={this.addMealDetails}
                    mealNamePopup={this.mealNamePopup}
                    displayMealNamePopup={this.state.displayMealNamePopup}
                    displayAddMealDetails={this.state.displayAddMealDetails}
                    ingredientList={this.state.ingredientList}
                    addIngredient={this.addIngredient}
                    mealArray={this.state.mealArray}
                    addMeal={this.addMeal}
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