import React, { Component } from 'react';
import AddMealDetails from './AddMealDetails.jsx'

class AddMeal extends Component{

    render(){
        return(
            <div className='addMeal'>
                <div>Welcome back, {this.props.username}!</div>
                <button className='buttonLoginPage' onClick={()=> this.props.addMealDetails()}>Add a New Meal</button>
                {
                this.props.displayAddMealDetails ? 
                <AddMealDetails
                    addMealDetails={this.props.addMealDetails}
                /> 
                : null
    }
            </div>
        )
    }
}

export default AddMeal;