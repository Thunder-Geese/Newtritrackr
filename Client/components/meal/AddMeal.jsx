import React, { Component } from 'react';
import AddMealDetails from './AddMealDetails.jsx'

class AddMeal extends Component {

  render() {
    return (
      <div className='addMeal'>
        <div>Welcome back {this.props.username}!</div>
        <button className='buttonLoginPage' onClick={() => this.props.addMealDetails()}>Add a New Meal</button>
        {/* {
          this.props.displayAddMealDetails ?
            <AddMealDetails
              ingredientList={this.props.ingredientList}
              addIngredient={this.props.addIngredient}
              addMealDetails={this.props.addMealDetails}
              mealNamePopup={this.props.mealNamePopup}
              displayMealNamePopup={this.props.displayMealNamePopup}
              addMeal={this.props.addMeal}
            />
            : null
        } */}
      </div>
    )
  }
}

export default AddMeal;