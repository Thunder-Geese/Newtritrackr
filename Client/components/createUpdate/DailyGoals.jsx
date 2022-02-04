import React, { Component } from 'react';
import AddMealDetails from '../meal/AddMealDetails.jsx';

class DailyGoals extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='dailyGoals'>
        <h2>Meal Information</h2>
        <p>for creating new meals/editing saved meals</p>
        {
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
        }
      </div>
    )
  }
}

export default DailyGoals