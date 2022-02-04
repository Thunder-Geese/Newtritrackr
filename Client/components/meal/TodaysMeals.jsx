import React, { Component } from 'react';

class TodaysMeals extends Component {

  componentDidMount() {
    this.props.getMealData();
  }

  render() {
    // let array = [];
    //look at the array of meals return from the server
    //check that the meal has today's date
    //if it does, push it into an array to display

    const displayMeals = [];
    for (let i = 0; i < this.props.mealArray.length; i++) {
      displayMeals.push(<div className='listText'>
        <li>{this.props.mealArray[i].meal_name}</li>
        <li>Protein: {this.props.mealArray[i].protein}g</li>
        <li>Fat: {this.props.mealArray[i].fat}g</li>
        <li>Carbs: {this.props.mealArray[i].carbs}g</li>
        <li>Calories: {this.props.mealArray[i].calories}kCal</li>
      </div>)
    }



    return (

      <div className='todaysMeals'>
        <div className='loginTextLarge'>Your meals for Today:</div>
        {displayMeals}
      </div>
    )
  }
}

export default TodaysMeals;